import './styles/index.css';
import { initRouter } from './utils/router.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.js';
import { setCookie, deleteCookie, getCookie } from './helpers/cookie.js';

let isAuthInitialized = false;

// addJavascriptInterface() is only guaranteed visible to JS after onPageFinished;
// on session-restore, onAuthStateChanged can fire before Android has attached the
// bridge, so retry briefly instead of silently dropping the call.
function callAndroidBridge(methodName, ...args) {
  const attempt = (retriesLeft) => {
    const bridge = window.AndroidInterface;
    if (bridge && typeof bridge[methodName] === 'function') {
      console.log(`[BB-BRIDGE] calling AndroidInterface.${methodName}() (retriesLeft=${retriesLeft})`);
      bridge[methodName](...args);
      return;
    }
    if (retriesLeft <= 0) {
      console.warn(`[BB-BRIDGE-GIVEUP] AndroidInterface.${methodName} never became available`);
      return;
    }
    setTimeout(() => attempt(retriesLeft - 1), 300);
  };
  attempt(10); // up to ~3s of retrying
}

function initApp() {
  const appElement = document.querySelector('#app');

  // Render initial splash loader while session token is verified from cookies/IndexedDB
  appElement.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; width: 100%;">
      <img src="/favicon.png" style="width: 56px; height: 56px; border-radius: 16px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); object-fit: cover;" class="pulse-badge" alt="Logo" />
      <p style="margin-top: 16px; color: var(--text-secondary); font-size: 14px; font-weight: 600;">Restoring session...</p>
    </div>
  `;

  // Set up auth state listener
  onAuthStateChanged(auth, async (user) => {
    console.log('[BB-C1] onAuthStateChanged fired, user=', user ? user.uid : null);
    if (user) {
      try {
        const token = await user.getIdToken();
        console.log('[BB-C2] getIdToken() resolved, length=', token ? token.length : 0);
        const refreshToken = user.refreshToken || (user.stsTokenManager && user.stsTokenManager.refreshToken);
        console.log('[BB-C3] refreshToken resolved, present=', !!refreshToken, 'length=', refreshToken ? refreshToken.length : 0);

        // Persist token & uid in browser cookies (30 days)
        setCookie('backbench_token', token, 30);
        setCookie('backbench_uid', user.uid, 30);
        console.log('[BB-C4] cookies set (backbench_token, backbench_uid)');

        // Bridge Auth to Native Background Services
        console.log('[BB-C5] window.AndroidInterface present=', !!window.AndroidInterface, 'window.electronAPI present=', !!window.electronAPI);
        if (refreshToken) {
          callAndroidBridge('saveAuthToken', refreshToken);
          if (window.electronAPI && typeof window.electronAPI.saveAuthToken === 'function') {
            console.log('[BB-C8] calling electronAPI.saveAuthToken()');
            window.electronAPI.saveAuthToken(refreshToken);
          }
        } else {
          console.warn('[BB-C3-FAIL] refreshToken is falsy - cannot bridge auth to native background services at all');
        }
        callAndroidBridge('saveUserId', user.uid);
      } catch (err) {
        console.error('[BB-C-ERR] Error retrieving ID token:', err);
      }
    } else {
      console.log('[BB-C11] user is null (signed out) - clearing cookies and native uid');
      deleteCookie('backbench_token');
      deleteCookie('backbench_uid');
      if (window.AndroidInterface && typeof window.AndroidInterface.clearUserId === 'function') {
        window.AndroidInterface.clearUserId();
      }
    }

    if (!isAuthInitialized) {
      isAuthInitialized = true;
      // Initialize router AFTER auth restoration is complete
      initRouter(appElement);
    } else {
      // Redirect unauthenticated users away from protected pages
      if (!user && window.location.hash !== '#/login' && window.location.hash !== '#/signup') {
        window.location.hash = '#/login';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);
