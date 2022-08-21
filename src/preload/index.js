const{ contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('contextBridge',{
    openWindow:(url)=> ipcRenderer.send('open-window', url),
    database: {
        getAllCustomers: () => ipcRenderer.invoke('getAllCustomers'),
        getUpcomingDropoffs: () => ipcRenderer.invoke('getUpcomingDropoffs'),
        getUpcomingPickups: () => ipcRenderer.invoke('getUpcomingPickups'),
    }
});
