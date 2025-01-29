const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const db = require('./sqlite.js');

let win;

app.on('ready', () => {
	win = new BrowserWindow({
		width: 1300,
		height: 700,
		frame: false,  // Removes the default title bar
		icon: path.join(__dirname, 'view', 'src', 'assets', 'logo.ico'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'), // Optional if using preload scripts
			contextIsolation: true, // Recommended for security
			nodeIntegration: false, // Avoid nodeIntegration for security
			enableRemoteModule: false, // Avoid remote for security
			sandbox: true,
			// devTools: false, // Disable DevTools in production
		},
	});

	// Tittle Bar functionality
	ipcMain.on('minimize-window', () => {
		win.minimize();
	});

	ipcMain.on('maximize-window', () => {
		win.isMaximized() ? win.unmaximize() : win.maximize();
	});

	ipcMain.on('close-window', () => {
		win.close();
	});


	// TODO: remove the ctrl+R to reload app

	// TODO: uncomment this for production
	// app.on('browser-window-blur', () => {
	// 	globalShortcut.unregisterAll();
	// });

	// TODO: uncomment this to load production files instead
	// mainWindow.loadFile(path.join(__dirname, 'view/dist/index.html'));

	// TODO: remove this for production
	// Load Vue's development server in development
	win.loadURL('http://localhost:8080');

});

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

// Database functionality
ipcMain.handle('get-traffic-light', async (event, id) => {
	return db.getTrafficLight(id);
});

ipcMain.handle('get-all-traffic-lights', async () => {
	return db.getAllTrafficLights();
});

ipcMain.handle('add-traffic-light', async (event, { name, location }) => {
	return db.addTrafficLight(name, location);
});

 ipcMain.handle('delete-traffic-light', async (event, id) => {
	return db.deleteTrafficLight(id);
});
