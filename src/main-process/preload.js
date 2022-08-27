const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  // IPC events
  toggleTheme: () => ipcRenderer.invoke('ipc:toggle-theme'),
  maximize:    () => ipcRenderer.invoke('ipc:maximize'),
  minimize:    () => ipcRenderer.invoke('ipc:minimize'),
  restore:     () => ipcRenderer.invoke('ipc:restore'),
  close:       () => ipcRenderer.invoke('ipc:close'),

  // IPC from main to renderer
  handleMaximizeChanged: (callback) => ipcRenderer.on('maximize-changed', callback),
  handleToggleTheme: (callback) => ipcRenderer.on('toggle-theme', callback),
});
