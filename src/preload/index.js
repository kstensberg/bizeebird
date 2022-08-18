const{ contextBridge, ipcRenderer }=require('electron')

contextBridge.exposeInMainWorld('contextBridge',{
openWindow:(url)=> ipcRenderer.send('open-window', url)
})