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
    return {
        customerId: 1234,
        boardingRate: 10,
        email: 'test@test.com',
        name: 'Test Customer Name',
        notes: 'test customer notes',
        phoneNumbers: [
            '555-555-5555',
            '666-666-6666'
        ],
        birds: [{
            birdId: 123, 
            name: 'test bird name',
            breed: 'test brid breed',
            color: 'test bird color',
            age: 12,
            gender: 'female'
        }]
    }
});

ipcMain.handle('getAllCustomers', async function(event) {
    const getAllCustomers = require('./db-management/Get/getAllCustomers');
    return getAllCustomers(db);
});

ipcMain.handle('searchCustomers', async function(event, searchString) {
    const searchCustomers = require('./db-management/Search/searchCustomers');
    return searchCustomers(db, searchString);
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
    return saveAppointment(db, appointment);
});
