const { app, BrowserWindow, screen, ipcMain } = require('electron')
const path = require('path')

require ( 'electron-reload' ) ( __dirname ,  { 
    electron : path . join ( __dirname ,  'node_modules' ,  '.bin' ,  'electron' ) 
  } )

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = () => {
    const win = new BrowserWindow({
        width: screen.getPrimaryDisplay().size.width,
        height: screen.getPrimaryDisplay().size.height,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          }

    })

    win.loadFile('src/view/index.html')

}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// salir de la aplicacion
ipcMain.on('salir', (e) => {
    app.quit()
})

