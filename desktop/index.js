const { app, BrowserWindow, Notification, ipcMain, shell, Tray, Menu } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

const FIREBASE_DB_URL = 'https://backbench-ef95e-default-rtdb.asia-southeast1.firebasedatabase.app';
const TARGET_URL = 'https://backbench.ddns.net';
const FIREBASE_API_KEY = "AIzaSyAYnd63Dwmhq0F-AWlWo1nTmoYX9TPO9DM";

const authFilePath = path.join(app.getPath('userData'), 'auth.json');
let cachedIdToken = null;
let tokenExpirationTime = 0;

let mainWindow;
let tray = null;
let lastTimestamps = { post: 0, poll: 0, petition: 0 };

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Backbench',
    icon: path.join(__dirname, '../icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Hide the menu bar for a more app-like feel
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(TARGET_URL);

  // Prevent app from quitting when window is closed, hide to tray instead
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

ipcMain.handle('sign-in-with-google', async () => {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const reqUrl = new URL(req.url, `http://${req.headers.host}`);
        if (reqUrl.pathname === '/auth') {
          const idToken = reqUrl.searchParams.get('idToken');
          const accessToken = reqUrl.searchParams.get('accessToken');
          
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<html><body><h2>Authentication successful! You can close this tab and return to Backbench.</h2><script>window.close();</script></body></html>');
          
          server.close();
          resolve({ idToken, accessToken });
        } else {
          res.writeHead(404);
          res.end();
        }
      } catch (err) {
        res.writeHead(500);
        res.end();
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      const callbackUrl = `http://127.0.0.1:${port}/auth`;
      const authUrl = `${TARGET_URL}/native-auth.html?callback=${encodeURIComponent(callbackUrl)}`;
      shell.openExternal(authUrl);
    });

    // Timeout after 5 minutes
    setTimeout(() => {
      if (server.listening) {
        server.close();
        reject(new Error('Authentication timed out.'));
      }
    }, 5 * 60 * 1000);
  });
});

ipcMain.on('save-auth-token', (event, token) => {
  try {
    fs.writeFileSync(authFilePath, JSON.stringify({ refreshToken: token }), 'utf-8');
  } catch (err) {
    console.error('Failed to save auth token:', err);
  }
});

app.whenReady().then(() => {
  // Set App User Model ID so Windows 10/11 Notifications show up natively!
  app.setAppUserModelId('org.flexstudios.backbench');

  // Set autostart
  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true
  });

  createWindow();
  
  // Set up Tray
  const iconPath = path.join(__dirname, '../icon.png');
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Backbench', click: () => mainWindow.show() },
    { label: 'Quit', click: () => { app.isQuiting = true; app.quit(); } }
  ]);
  tray.setToolTip('Backbench');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => mainWindow.show());
  
  // Set up background polling every 45 seconds (45000 ms)
  setInterval(pollForUpdates, 45000);
  
  // Do an initial poll to set the baseline timestamp
  pollForUpdates(true);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Don't quit, wait for explicit tray quit
});

async function pollForUpdates(isInitial = false) {
  try {
    let refreshToken = null;
    try {
      if (fs.existsSync(authFilePath)) {
        const data = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));
        refreshToken = data.refreshToken;
      }
    } catch (e) {
      console.error('Error reading auth token:', e);
    }

    if (!refreshToken) {
      console.log('No refresh token found. Polling without auth.');
    } else {
      // Exchange refresh token for fresh ID token if missing or expired (buffer 5 mins)
      if (!cachedIdToken || Date.now() > tokenExpirationTime - 300000) {
        const tokenRes = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `grant_type=refresh_token&refresh_token=${refreshToken}`
        });
        const tokenData = await tokenRes.json();
        if (tokenData.id_token) {
          cachedIdToken = tokenData.id_token;
          tokenExpirationTime = Date.now() + (parseInt(tokenData.expires_in) * 1000);
        }
      }
    }

    const authQuery = cachedIdToken ? `&auth=${cachedIdToken}` : '';

    const endpoints = [
      { name: 'post', url: `${FIREBASE_DB_URL}/posts.json?orderBy="timestamp"&limitToLast=1${authQuery}` },
      { name: 'poll', url: `${FIREBASE_DB_URL}/polls.json?orderBy="timestamp"&limitToLast=1${authQuery}` },
      { name: 'petition', url: `${FIREBASE_DB_URL}/petitions.json?orderBy="timestamp"&limitToLast=1${authQuery}` }
    ];

    let newContentFound = false;
    let latestType = '';

    for (const ep of endpoints) {
      const response = await fetch(ep.url);
      const data = await response.json();
      
      if (data) {
        const keys = Object.keys(data);
        if (keys.length > 0) {
          const latestItem = data[keys[0]];
          const itemTime = new Date(latestItem.timestamp).getTime();
          
          if (isInitial) {
            lastTimestamps[ep.name] = Math.max(lastTimestamps[ep.name] || 0, itemTime);
          } else {
            if (lastTimestamps[ep.name] > 0 && itemTime > lastTimestamps[ep.name]) {
              lastTimestamps[ep.name] = itemTime;
              newContentFound = true;
              latestType = ep.name;
            } else if (lastTimestamps[ep.name] === 0) {
               lastTimestamps[ep.name] = itemTime;
            }
          }
        }
      }
    }

    if (!isInitial && newContentFound) {
      new Notification({
        title: 'Backbench Updates',
        body: `A new ${latestType} was just shared on campus!`,
      }).show();
    }
  } catch (error) {
    console.error('Error polling Firebase:', error);
  }
}
