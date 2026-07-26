const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  signInWithGoogle: () => ipcRenderer.invoke('sign-in-with-google')
});
