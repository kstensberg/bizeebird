'use strict';

const{ contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('contextBridge', {
    openAppointmentDialog: (appointmentId) => ipcRenderer.invoke('openAppointmentDialog', appointmentId),
    openCustomerDialog: (customerId) => ipcRenderer.invoke('openCustomerDialog', customerId),
    attachEvent: (channel, handler) => {
        ipcRenderer.on(channel, (event, data) => {
            handler(event, data);
        });
    },
    database: {
        getCustomer: (customerId) => ipcRenderer.invoke('getCustomer', customerId),
        getAllCustomers: () => ipcRenderer.invoke('getAllCustomers'),
        searchCustomers: (searchString) => ipcRenderer.invoke('searchCustomers', searchString),
        searchCustomersByName: (searchString) => ipcRenderer.invoke('searchCustomersByName', searchString),
        searchCustomersByEmail: (searchString) => ipcRenderer.invoke('searchCustomersByEmail', searchString),
        searchCustomersByPhone: (searchString) => ipcRenderer.invoke('searchCustomersByPhone', searchString),
        getAllHistory: () => ipcRenderer.invoke('getAllHistory'),
        searchHistory: (searchString) => ipcRenderer.invoke('searchHistory', searchString),
        getUpcomingDropoffs: () => ipcRenderer.invoke('getUpcomingDropoffs'),
        getUpcomingPickups: () => ipcRenderer.invoke('getUpcomingPickups'),
        getCustomerBirds: (customerId) => ipcRenderer.invoke('getCustomerBirds', customerId),
        getAppointment: (appointmentId) => ipcRenderer.invoke('getAppointment', appointmentId),
        saveAppointment: (appointment) => ipcRenderer.invoke('saveAppointment', appointment),
        saveCustomer: (customer) => ipcRenderer.invoke('saveCustomer', customer),
    }
});
