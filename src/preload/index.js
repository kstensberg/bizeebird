const{ contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('contextBridge',{
    openWindow:(url)=> ipcRenderer.send('open-window', url),
    database: {
        getAllCustomers: () => ipcRenderer.invoke('getAllCustomers'),
        searchCustomers: (searchString) => ipcRenderer.invoke('searchCustomers', searchString),
        getAllHistory: () => ipcRenderer.invoke('getAllHistory'),
        searchHistory: (searchString) => ipcRenderer.invoke('searchHistory', searchString),
        getUpcomingDropoffs: () => ipcRenderer.invoke('getUpcomingDropoffs'),
        getUpcomingPickups: () => ipcRenderer.invoke('getUpcomingPickups'),
    }
});
