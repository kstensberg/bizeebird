'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('./ipc.js');

const createMainWindow = () => {
    return createWindow('src/renderer/index.html', 800, 600);
}

const createWindow = (loadFile, width, height) => {
    const mainWindow = new BrowserWindow({
        width: width,
        height: height,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload/index.js')
        }
    });

    mainWindow.loadFile(loadFile);

    // Open the DevTools.
    if (process.env['DEBUG'] !== undefined){
        mainWindow.webContents.openDevTools();
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
