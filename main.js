const { app, BrowserWindow, screen, ipcMain } = require('electron')
const path = require('path')

const { iniciarSesion } = require('./src/controlers/usuarios/usuario.js')
const {
    consultarListadoActivos,
    actualizarDatosActivos,
    consultarActivo,
    guardarImagenActivo,
    eliminarImagenActivo,
    eliminarDocumento,
    descargarDocumento,
    gudardarDocumento,
    descargarHojaDeVida,
    eliminarActivo,
} = require('./src/controlers/activos/activos.js')

const { consultarListadoSolicitudes } = require('./src/controlers/solicitudes/solicitudes.js')
const { consultarListadoReportes, descargarListaMtto } = require('./src/controlers/reportes/reporte.js')
const {
    eliminarComponente,
    guardarComponente,
} = require('./src/controlers/componentes/componentes.js')

const { consultarTablasConfig, consultarListasCofigActivos} = require('./src/controlers/tablasConfig/tablasConfig.js')
const { validarDatosComponente } = require('./src/controlers/componentes/validarComponentes.js')

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

/////////////////activos ///////////////////////////////

// consultar el listado de activos
ipcMain.on('listadoActivo', async (e) => {
    const token = dataUsuarioSesion.token
    const listado = await consultarListadoActivos(token)
    e.returnValue = listado;
})

ipcMain.on('actualizarDatosActivos', async (e, data) => {
    const token = dataUsuarioSesion.token
    const actualizar = await actualizarDatosActivos(data, token)
    e.returnValue = actualizar;
})

// consultar un activo
ipcMain.on('consultarActivo', async (e, id) => {
    const token = dataUsuarioSesion.token
    const activo = await consultarActivo(id, token)
    if (!activo.msg) {
        activo.editar = false
    }
    if (dataUsuarioSesion.data.permisos.indexOf(3) !== -1) {
        activo.editar = true
    }
    e.returnValue = activo;
})

// guardar una imagen del activo
ipcMain.on('imagenActivo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const imagen = await guardarImagenActivo(data, token)
    e.returnValue = imagen;
})

//eliminar una imagen del activo
ipcMain.on('elimnarImagenActivo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const imagen = await eliminarImagenActivo(data, token)
    e.returnValue = imagen;
})
//descargar un documento del activo
ipcMain.on('descargaDocumento', async (e, data) => {
    const token = dataUsuarioSesion.token
    const documento = await descargarDocumento(data, token)
    e.returnValue = documento;
})

ipcMain.on('descargarHojaDeVida', async (e, data) => {
    const token = dataUsuarioSesion.token
    const documento = await descargarHojaDeVida(data, token)
    e.returnValue = documento;
})

ipcMain.on('eliminarActivo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const eliminar = await eliminarActivo(data, token)
    e.returnValue = eliminar;
})

//eliminar un docuemnto del activo
ipcMain.on('eliminarDocumento', async (e, data) => {
    const token = dataUsuarioSesion.token
    const documentoEliminado = await eliminarDocumento(data, token)
    e.returnValue = documentoEliminado;
})

ipcMain.on('gudardarDocumento', async (e, data) => {
    const token = dataUsuarioSesion.token
    const documentoGuardado = await gudardarDocumento(data, token)
    e.returnValue = documentoGuardado;
})

ipcMain.on('consultarListasCofigActivos', async (e) => {
    const token = dataUsuarioSesion.token
    const listados = await consultarListasCofigActivos(token)
    e.returnValue = listados;
})

/////////////////////////////////solicitudes////////////////////////////

// consultar el listado de solicitud
ipcMain.on('listadoSolicitud', async (e) => {
    const token = dataUsuarioSesion.token
    const listado = await consultarListadoSolicitudes(token)
    e.returnValue = listado;
})

//////////////////////////////// reportes////////////////////////////////

// litado reportes

ipcMain.on('listadoReportes', async (e) => {
    const token = dataUsuarioSesion.token
    const listado = await consultarListadoReportes(token)
    e.returnValue = listado;
})

ipcMain.on('descargarListaMtto', async (e, data) => {
    const token = dataUsuarioSesion.token
    const documento = await descargarListaMtto(data, token)
    e.returnValue = documento;
})


///////////////////////////componentes//////////////////////////////////////////

ipcMain.on('eliminarComponente', async (e, data) => {
    const token = dataUsuarioSesion.token
    const resultado = await eliminarComponente(data, token)
    e.returnValue = resultado;
})

ipcMain.on('guardarComponente', async (e, data) => {
    const token = dataUsuarioSesion.token
    const validacion = validarDatosComponente(data)

    if(validacion.msg){
        e.returnValue = validacion
        return
    }
    const resultado = await guardarComponente(data, token)
    e.returnValue = resultado;
})

/////////////////////////////// tablas datalist ///////////////////////////////////
ipcMain.on('datalist', async (e, id) => {

    const tablasConfig = {
        'areas': 1,
        'marca': 2,
        'tipoActivo': 3,
        'listaComponentes': 4,
        'frecuenciaMtto': 5,
        'procesos': 6,
        'clasificacionActivos': 7,
        'proveedores': 8
    }
    const token = dataUsuarioSesion.token
    const resultado = await consultarTablasConfig(tablasConfig[id], token)
    e.returnValue = resultado;
})

