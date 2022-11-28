'use strict';

function triggerEventOnAllWindows(event) {
    var windows = BrowserWindow.getAllWindows();

    for (const window of windows) {
        window.webContents.send(event);
    }
}

const { BrowserWindow, ipcMain } = require('electron');

const db = require('./db-management/dbConfig');

ipcMain.handle('getCustomer', async function(event, customerId) {
    const getCustomer = require('./db-management/Get/getSingleCustomer');
    return getCustomer(db, customerId);
});

ipcMain.handle('getAllCustomers', async function(event) {
    const getAllCustomers = require('./db-management/Get/getAllCustomers');
    return getAllCustomers(db);
});

ipcMain.handle('searchCustomers', async function(event, searchString) {
    const searchCustomers = require('./db-management/Search/searchCustomers');
    return searchCustomers(db, searchString);
});

ipcMain.handle('searchCustomersByName', async function(event, searchString) {
    //TODO

    if (searchString == 'test123') {
        return [{
            customerId: 123
        }];
    }

    return [];
});

ipcMain.handle('getAllHistory', async function(event) {
    const getAllAppointments = require('./db-management/Get/getAllAppointments');
    return getAllAppointments(db);
});

ipcMain.handle('searchHistory', async function(event, searchString) {
    const searchHistory = require('./db-management/Search/searchHistory');
    return searchHistory(db, searchString);
});

ipcMain.handle('getUpcomingDropoffs', async function(event) {
    const getUpcomingDropoffs = require('./db-management/Get/getUpcomingDropoffs');
    return getUpcomingDropoffs(db);
});

ipcMain.handle('getUpcomingPickups', async function(event) {
    const getUpcomingPickups = require('./db-management/Get/getUpcomingPickups');
    return getUpcomingPickups(db);
});

ipcMain.handle('getCustomerBirds', async function(event, searchString) {
    const getCustomerBirds = require('./db-management/Get/getCustomerBirds');
    return getCustomerBirds(db, searchString);
});

ipcMain.handle('saveCustomer', async function(event, customer) {
    const saveCustomer = require('./db-management/Create/createAllCustomer');
    await saveCustomer(db, customer);

    triggerEventOnAllWindows('customerSaved');

});


ipcMain.handle('saveAppointment', async function(event, appointment) {
    const saveAppointment = require('./db-management/Create/createAllAppointment');
    await saveAppointment(db, appointment);

    triggerEventOnAllWindows('appointmentSaved');
});
