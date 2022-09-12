'use strict';

const{ contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('contextBridge', {
    openNewAppointment: () => ipcRenderer.invoke('openNewAppointment'),
    openNewCustomer: () => ipcRenderer.invoke('openNewCustomer'),
    attachEvent: (channel, handler) => {
        ipcRenderer.on(channel, (event) => {
            handler();
        });
    },
    database: {
        getAllCustomers: () => ipcRenderer.invoke('getAllCustomers'),
        searchCustomers: (searchString) => ipcRenderer.invoke('searchCustomers', searchString),
        getAllHistory: () => ipcRenderer.invoke('getAllHistory'),
        searchHistory: (searchString) => ipcRenderer.invoke('searchHistory', searchString),
        getUpcomingDropoffs: () => ipcRenderer.invoke('getUpcomingDropoffs'),
        getUpcomingPickups: () => ipcRenderer.invoke('getUpcomingPickups'),
        getCustomerBirds: (customerId) => ipcRenderer.invoke('getCustomerBirds', customerId),
        saveAppointment: (appointment) => ipcRenderer.invoke('saveAppointment', appointment),
        saveCustomer: (customer) => ipcRenderer.invoke('saveCustomer', customer),
    }
});
