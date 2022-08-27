const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('theme', {
  switch: () => ipcRenderer.invoke('theme:switch'),
});

contextBridge.exposeInMainWorld('win', {
  maximize: () => ipcRenderer.invoke('win:maximize'),
  minimize: () => ipcRenderer.invoke('win:minimize'),
  restore: () => ipcRenderer.invoke('win:restore'),
  close: () => ipcRenderer.invoke('win:close'),
});