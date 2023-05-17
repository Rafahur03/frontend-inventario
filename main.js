const { app, BrowserWindow, screen, ipcMain } = require('electron')
const path = require('path')

const { iniciarSesion } = require('./src/controlers/usuarios/usuario.js')
const { consultarListadoActivos, consultarActivo } = require('./src/controlers/activos/activos.js')
const { consultarListadoSolicitudes }= require('./src/controlers/solicitudes/solicitudes.js')
const { consultarListadoReportes }= require('./src/controlers/reportes/reporte.js')

require('dotenv').config()
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win

app.whenReady().then(() => {
    win = new BrowserWindow({
        width: screen.getPrimaryDisplay().size.width,
        height: screen.getPrimaryDisplay().size.height,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('src/view/inicio.html')
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// salir de la aplicacion
ipcMain.on('salir', (e) => {
    app.quit()
})

// Iniciar sesion 
let dataUsuarioSesion
ipcMain.on('iniciarSesion', async (e, datosInicioSesion) => {
    try {
        dataUsuarioSesion = await iniciarSesion(datosInicioSesion)
        if (dataUsuarioSesion.msg) {
            win.webContents('error', dataUsuarioSesion)
        }
        win.loadFile('src/view/index.html')

        const sesion = {
            data: {
                nombre: dataUsuarioSesion.data.nombre,
                permisos: dataUsuarioSesion.data.permisos
            },
            motivacion: dataUsuarioSesion.frase

        }
        win.webContents.on('dom-ready', () => {
            win.webContents.send('sesion', sesion)
        })


    } catch (error) {
        console.log(error)

    }

})

// consultar el listado de activos
ipcMain.on('listadoActivo', async (e) => {
    const token = dataUsuarioSesion.token
    const listado = await consultarListadoActivos(token)
    e.returnValue = listado;
})

ipcMain.on('consultarActivo', async (e, id) => {
    const token = dataUsuarioSesion.token
    const activo = await consultarActivo(id, token)
    if(!activo.msg){
        activo.editar=false
    }
    if(dataUsuarioSesion.data.permisos.indexOf(3) !== -1) {
        activo.editar=true
    }      
    e.returnValue = activo;
})


// consultar el listado de activos
ipcMain.on('listadoSolicitud', async (e) => {
    const token = dataUsuarioSesion.token
    const listado =  await consultarListadoSolicitudes(token)
    e.returnValue = listado;
  })

  ipcMain.on('listadoReportes', async (e) => {
    const token = dataUsuarioSesion.token
    const listado =  await consultarListadoReportes(token)
    e.returnValue = listado;
  })