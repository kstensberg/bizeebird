'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('./src/ipc.js');

const createMainWindow = () => {
    return createWindow('src/renderer/index.html', 800, 600);
};

const createWindow = (loadFile, width, height, minWidth = 0, minHeight = 0) => {
    const window = new BrowserWindow({
        width: width,
        height: height,
        autoHideMenuBar: true,
        minHeight: minHeight,
        minWidth: minWidth,
        icon: 'assets/bizeebird.ico',
        webPreferences: {
            devTools: !app.isPackaged,
            preload: path.join(__dirname, 'src/preload.js'),
        },
    });

    window.loadFile(loadFile);

    // Open the DevTools.
    if (process.env['DEBUG'] !== undefined) {
        window.webContents.openDevTools();
    }

    return window;
};

ipcMain.handle('openAppointmentDialog', function(event, appointmentId) {
    const window = createWindow('src/renderer/appointmentdialog.html', 830, 700, 830, 100);

    if (appointmentId) {
        window.once('ready-to-show', () => {
            window.webContents.send('loadAppointment', appointmentId);
        });
    }
});

ipcMain.handle('openCustomerDialog', function(event, customerId) {
    const window = createWindow('src/renderer/customerdialog.html', 1200, 830, 1000, 830);

    if (customerId) {
        window.once('ready-to-show', () => {
            window.webContents.send('loadCustomer', customerId);
        });
    }
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
