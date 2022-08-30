'use strict';

const { ipcMain } = require('electron');
const searchCustomers = require('./db-management/Customers/queries/searchCustomers');
const searchHistory = require('./db-management/Appointments/queries/searchHistory');

ipcMain.handle('getAllCustomers', require('./db-management/Customers/queries/getAllCustomers'));

ipcMain.handle('searchCustomers', async function(event, searchString) {
    return searchCustomers(searchString);
});

ipcMain.handle('getAllHistory', require('./db-management/Appointments/queries/getAllAppointments'));

ipcMain.handle('searchHistory', async function(event, searchString) {
    return searchHistory(searchString);
});

ipcMain.handle('getUpcomingDropoffs', require('./db-management/Appointments/queries/getUpcomingDropoffs'));

ipcMain.handle('getUpcomingPickups', async function() {
    return [{
        Date: '08/20/22',
        Customer: 'Kevin Stensberg',
        BirdName: 'River',
        BirdBreed: 'Dog',
        Wings: true,
        Nails: true,
        Rate: 15.00,
        Notes: 'Notes here'
    }];
});
