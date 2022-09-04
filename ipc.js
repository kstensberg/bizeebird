'use strict';

const { ipcMain } = require('electron');

const db = require('./db-management/dbConfig');

ipcMain.handle('getAllCustomers', async function(event) {
    const getAllCustomers = require('./db-management/Customers/queries/getAllCustomers');
    return getAllCustomers(db);
});

ipcMain.handle('searchCustomers', async function(event, searchString) {
    const searchCustomers = require('./db-management/Customers/queries/searchCustomers');
    return searchCustomers(db, searchString);
});

ipcMain.handle('getAllHistory', async function(event) {
    const getAllAppointments = require('./db-management/Appointments/queries/getAllAppointments');
    return getAllAppointments(db);
});

ipcMain.handle('searchHistory', async function(event, searchString) {
    const searchHistory = require('./db-management/Appointments/queries/searchHistory');
    return searchHistory(db, searchString);
});

ipcMain.handle('getUpcomingDropoffs', async function(event) {
    const getUpcomingDropoffs = require('./db-management/Appointments/queries/getUpcomingDropoffs');
    return getUpcomingDropoffs(db);
});

ipcMain.handle('getUpcomingPickups', async function(event) {
    const getUpcomingPickups = require('./db-management/Appointments/queries/getUpcomingPickups');
    return getUpcomingPickups(db);
});

ipcMain.handle('getCustomerBirds', async function(event, searchString) {
    const getCustomerBirds = require('./db-management/Birds/queries/getCustomerBirds');
    return getCustomerBirds(db, searchString);
});
