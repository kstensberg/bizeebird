'use strict';

const { ipcMain } = require('electron');

ipcMain.handle('getAllCustomers', require('./db-management/Customers/queries/getAllCustomers'));

ipcMain.handle('searchCustomers', async function(event, searchString) {    
    return [{
        Name: searchString,
        PhoneNumber: '(206) 552-3618',
        Email: 'me@me.com',
        BoardingRate: 12.45,
        Notes: 'notes'
    }];
});

ipcMain.handle('getAllHistory', async function() {
    return [{
        Name: 'test',
        BoardingRate: 12.34,
        BirdName: 'River',
        Dates: '12/34/22', 
        Status: 'Approved',
        Wings: true,
        Nails: true,
        CageNeeded: true
    }];
});

ipcMain.handle('searchHistory', async function(event, searchString) {    
    return [{
        Name: searchString,
        BoardingRate: 12.34,
        BirdName: 'River',
        Dates: '12/34/22', 
        Status: 'Approved',
        Wings: true,
        Nails: true,
        CageNeeded: true
    }];
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

//getUpcomingPickups
