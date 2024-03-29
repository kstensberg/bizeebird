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
    const dupeCheck = require('./db-management/Search/dupeCheckName');
    const result = await dupeCheck(db, searchString);
    if (result == undefined) {
        return [];
    }
    return [{
        customerId: result.customerId,
        name: result.name
    }];
});

ipcMain.handle('searchCustomersByEmail', async function(event, searchString) {
    const dupeCheck = require('./db-management/Search/dupeCheckEmail');
    const result = await dupeCheck(db, searchString);
    if (result == undefined) {
        return [];
    }
    return [{
        customerId: result.customerId,
        name: result.name
    }];
});

ipcMain.handle('searchCustomersByPhone', async function(event, searchString) {
    const dupeCheck = require('./db-management/Search/dupeCheckPhone');
    const result = await dupeCheck(db, searchString);
    if (result == undefined) {
        return [];
    }
    return [{
        customerId: result.customerId,
        name: result.name
    }];
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

ipcMain.handle('getAppointment', async function(event, appointmentId) {
    const getAppointment = require('./db-management/Get/getSingleAppointment');
    return getAppointment(db, appointmentId);
});


ipcMain.handle('saveAppointment', async function(event, appointment) {
    const saveAppointment = require('./db-management/Create/createAllAppointment');
    await saveAppointment(db, appointment);

    triggerEventOnAllWindows('appointmentSaved');
});

ipcMain.handle('getAppointmentBird', async function(event, customerId) {
    const getAppointmentBird = require('./db-management/Get/getAppointmentBird');
    return getAppointmentBird(db, customerId);
});
