'use strict';

const { ipcMain } = require('electron');

ipcMain.handle('getAllCustomers', require('./db-management/Customers/queries/getAllCustomers'));
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

//getUpcomingPickups
