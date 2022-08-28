'use strict';

const { ipcMain } = require('electron');
const searchCustomers = require('./db-management/Customers/queries/searchCustomers');
const getAllHistory = require('./db-management/Appointments/queries/getAllAppointments');
const searchHistory = require('./db-management/Appointments/queries/searchHistory');

ipcMain.handle('getAllCustomers', require('./db-management/Customers/queries/getAllCustomers'));

ipcMain.handle('searchCustomers', async function(event, searchString) {
    return searchCustomers(searchString);
});

ipcMain.handle('getAllHistory', async function() {
    return getAllHistory();
});

ipcMain.handle('searchHistory', async function(event, searchString) {
    return searchHistory(searchString);
});

ipcMain.handle('getUpcomingDropoffs', async function() {
    return [{
        Date: '08/20/22',
        Name: 'Kevin Stensberg',
        BirdName: 'River',
        BirdBreed: 'Dog',
        CageNeeded: true
    }];
});

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
