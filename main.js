const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

let win;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1300,
        height: 700,
        frame: false,  // Removes the default title bar
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Optional if using preload scripts
            contextIsolation: true, // Recommended for security
            nodeIntegration: false, // Avoid nodeIntegration for security
            enableRemoteModule: false, // Avoid remote for security
            sandbox: true,
            devTools: false, // Disable DevTools in production
        },
    });
    
    ipcMain.on('minimize-window', () => {
        win.minimize();
    });
    
    ipcMain.on('maximize-window', () => {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    });
    
    ipcMain.on('close-window', () => {
        win.close();
    });
    
    // Uncomment this for production
    app.on('browser-window-blur', () => {
        globalShortcut.unregisterAll();
    });

    // Uncomment this to load production files instead
    // mainWindow.loadFile(path.join(__dirname, 'view/dist/index.html'));

    // Load Vue's development server in development
    win.loadURL('http://localhost:8080');

});

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
