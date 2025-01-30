const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	send: (channel, data) => ipcRenderer.send(channel, data),
	receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

// Tittle Bar functionality
contextBridge.exposeInMainWorld('winAPI', {
	minimize: () => ipcRenderer.send('minimize-window'),
	maximize: () => ipcRenderer.send('maximize-window'),
	close: () => ipcRenderer.send('close-window')
});

// Database functionality
contextBridge.exposeInMainWorld('dbAPI', {
	get: (id) => ipcRenderer.invoke('get-traffic-light', id),
	getAll: () => ipcRenderer.invoke('get-all-traffic-lights'),
	add: (name, location) => ipcRenderer.invoke('add-traffic-light', { name, location }),
	delete: (id) => ipcRenderer.invoke('delete-traffic-light', id),
});
