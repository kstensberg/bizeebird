'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('./ipc.js');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload/index.js')
        }
    });

    mainWindow.loadFile('src/renderer/index.html');

    // Open the DevTools.
    if (process.env['DEBUG'] !== undefined){
        mainWindow.webContents.openDevTools();
    }
};

ipcMain.handle('openNewAppointment', function() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload/index.js')
        }
    });

    mainWindow.loadFile('src/renderer/newappointment.html');

    // Open the DevTools.
    if (process.env['DEBUG'] !== undefined){
        mainWindow.webContents.openDevTools();
    }
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
