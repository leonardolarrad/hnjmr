const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  // IPC events
  toggleTheme: () => ipcRenderer.invoke('ipc:toggle-theme'),
  maximize:    () => ipcRenderer.invoke('ipc:maximize'),
  minimize:    () => ipcRenderer.invoke('ipc:minimize'),
  restore:     () => ipcRenderer.invoke('ipc:restore'),
  close:       () => ipcRenderer.invoke('ipc:close'),

  handleMaximizeChanged: (callback) => ipcRenderer.on('maximize-changed', callback),
  handleToggleTheme: (callback) => ipcRenderer.on('toggle-theme', callback),

  requestInsta: (html) => ipcRenderer.send('request-insta', html),
  handleInsta: (callback) => ipcRenderer.on('insta', callback),
});
