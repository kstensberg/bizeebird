'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('./src/ipc.js');

const createMainWindow = () => {
    return createWindow('src/renderer/index.html', 800, 600);
};

const createWindow = (loadFile, width, height) => {
    const window = new BrowserWindow({
        width: width,
        height: height,
        autoHideMenuBar: true,
        icon: 'assets/bizeebird.ico',
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js')
        }
    });

    window.loadFile(loadFile);

    // Open the DevTools.
    if (process.env['DEBUG'] !== undefined) {
        window.webContents.openDevTools();
    }
};

ipcMain.handle('openNewAppointment', function() {
    return createWindow('src/renderer/newappointment.html', 800, 600);
});

ipcMain.handle('openNewCustomer', function() {
    return createWindow('src/renderer/newcustomer.html', 800, 600);
});

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
