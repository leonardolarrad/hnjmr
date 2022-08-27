const path = require('path');

const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    autoHideMenuBar: true,
    frame: false,
  });

  // Set light theme by default
  nativeTheme.themeSource = 'light'

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  };

  ipcMain.handle('ipc:toggle-theme', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
      win.webContents.send('toggle-theme', 'light');
    } else {
      nativeTheme.themeSource = 'dark';
      win.webContents.send('toggle-theme', 'dark');
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('ipc:minimize', () => {
    win.minimize()
  });

  ipcMain.handle('ipc:maximize', () => {
    win.maximize()
  });

  ipcMain.handle('ipc:restore', () => {
    win.restore()
  });

  ipcMain.handle('ipc:close', () => {
    win.close()
  });

  win.addListener('maximize', () => {
    win.webContents.send('maximize-changed', true)
  });

  win.addListener('unmaximize', () => {
    win.webContents.send('maximize-changed', false)
  });
  
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  win.maximize();
  win.show();
}
    

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});