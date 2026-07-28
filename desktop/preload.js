const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  signInWithGoogle: () => ipcRenderer.invoke('sign-in-with-google'),
  saveAuthToken: (token) => ipcRenderer.send('save-auth-token', token)
});
