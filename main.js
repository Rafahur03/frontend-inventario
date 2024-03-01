const dotenvExpand = require("dotenv-expand");
const dotenv = require("dotenv");
const path = require("path");

// if (process.resourcesPath) {
//     dotenvExpand.expand(dotenv.config({ path: path.join(process.resourcesPath, ".env") }));
// }

dotenv.config()
const { app, BrowserWindow, screen, ipcMain } = require('electron')

const { iniciarSesion,
    crearNuevoUsuario,
    guardarEdicionUsuario,
    consultarUsuario,
    cambiarFirma,
    guardarProveedorUsuario,
    eliminarProveedorUsuario,
    cambiarClave
} = require('./src/controlers/usuarios/usuario.js')

const {
    consultarListadoActivos,
    actualizarDatosActivos,
    consultarActivo,
    guardarImagenActivo,
    eliminarImagenActivo,
    eliminarDocumento,
    descargarDocumento,
    guardarDocumento,
    descargarHojaDeVida,
    eliminarActivo,
    crearActivo,
    consultarDatosActivoSolicitud,
    consultarDatosActivoReportePrev,
    consultarActivoCambiarClasificacion,
    modificarClasificacion,
    consultarlistadoActivoFiltrado

} = require('./src/controlers/activos/activos.js')

const { consultarListadoSolicitudes,
    crearSolicitud,
    consultarSolicitud,
    editarSolicitud,
    eliminarSolicitud,
    descargarSolicitud,
    guardarImagenSolicitud,
    eliminarImagenSolicitud,
    consultarSolicitudReporte
} = require('./src/controlers/solicitudes/solicitudes.js')

const { consultarListadoReportes,
    descargarListaMtto,
    crearNuevoReporte,
    consultarReporte,
    eliminarReporte,
    eliminarImagenReporte,
    guardarImagenReporte,
    editarReporte,
    descargarReporte,
    descargarReporteExterno,
    guardarSoporteExtReporte,
    eliminarSoporteExtReporte,
    guardarReportePrev
} = require('./src/controlers/reportes/reporte.js')

const {
    eliminarComponente,
    guardarComponente,
} = require('./src/controlers/componentes/componentes.js')

const { consultarTablasConfig,
    consultarListasCofigActivos,
    consultarTodasTablasConfig,
    crearConfig,
    actualizarConfig
} = require('./src/controlers/tablasConfig/tablasConfig.js')

const { descargaCronograma,
    informelistadoAct,
    informelistadoActCost,
    descargarIfoActCosteado,
    informelistadoReportes,
    informelistadoSolicitudes,
    informeMovimientoInsumos
} = require('./src/controlers/informes/informes.js')

const {consultarListadoInsumos,
    consultarUnInsumo,
    movimientoInsumo,
    actualizarInsumosBodega,
    eliminarFactInsumo,
    guardarFactInsumo,
    descargarFactInsumo,
    eliminarImagInsumo,
    guardarImagInsumo} = require('./src/controlers/insumos/insumos.js')

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win

app.whenReady().then(() => {
    win = new BrowserWindow({
        width: screen.getPrimaryDisplay().size.width,
        height: screen.getPrimaryDisplay().size.height,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.setMenuBarVisibility(false)
    win.loadFile('src/view/inicio.html')
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// salir de la aplicacion
ipcMain.on('salir', (e) => {
    app.quit()
})


///// usuarios ///////////////////////////////
// Iniciar sesion 
let dataUsuarioSesion = null
ipcMain.on('iniciarSesion', async (e, datosInicioSesion) => {
    try {
        dataUsuarioSesion = await iniciarSesion(datosInicioSesion)

        if (dataUsuarioSesion.msg) {
            win.webContents.send('error', dataUsuarioSesion)
            return
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

        win.webContents.send('errorOtro', 'error')

    }

})

ipcMain.on('crearNuevoUsuario', async (e, data) => {
    const token = dataUsuarioSesion.token
    data.datosExtendidos = true
    const guardar = await crearNuevoUsuario(data, token)
    e.returnValue = guardar;
})

ipcMain.on('guardarEdicionUsuarioExt', async (e, data) => {
    const token = dataUsuarioSesion.token
    data.datosExtendidos = true
    const guardar = await guardarEdicionUsuario(data, token)
    e.returnValue = guardar;
})

ipcMain.on('guardarEdicionUsuario', async (e, data) => {
    const token = dataUsuarioSesion.token
    const guardar = await guardarEdicionUsuario(data, token)
    e.returnValue = guardar;
})

ipcMain.on('cambiarFirma', async (e, data) => {
    const token = dataUsuarioSesion.token
    const guardar = await cambiarFirma(data, token)
    e.returnValue = guardar;
})

ipcMain.on('guardarProveedorUsuario', async (e, data) => {
    const token = dataUsuarioSesion.token
    const guardar = await guardarProveedorUsuario(data, token)
    e.returnValue = guardar;
})

ipcMain.on('eliminarProveedorUsuario', async (e, data) => {
    const token = dataUsuarioSesion.token
    const guardar = await eliminarProveedorUsuario(data, token)
    e.returnValue = guardar;
})

ipcMain.on('cambiarContraseña', async (e, data) => {
    data.usuario = dataUsuarioSesion.data.id
    const token = dataUsuarioSesion.token
    const guardar = await cambiarClave(data, token)
    e.returnValue = guardar;
})

ipcMain.on('consultarUsuario', async (e, id) => {

    const data = {
        id,
        idSesion: dataUsuarioSesion.data.id
    }
    const token = dataUsuarioSesion.token
    const guardar = await consultarUsuario(data, token)
    e.returnValue = guardar;
})

/////////////////activos ///////////////////////////////

// consultar el listado de activos
ipcMain.on('listadoActivo', async (e) => {
    const token = dataUsuarioSesion.token
    const listado = await consultarListadoActivos(token)
    e.returnValue = listado;
})

ipcMain.on('listadoActivoFiltrado', async (e, data) => {
    const token = dataUsuarioSesion.token
    const listado = await consultarlistadoActivoFiltrado(data, token)
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

ipcMain.on('consultarActivoCambiarClasificacion', async (e, id) => {
    const token = dataUsuarioSesion.token
    const datos = await consultarActivoCambiarClasificacion(id, token)
    e.returnValue = datos;
})

ipcMain.on('CambiarClasificacion', async (e, data) => {
    const token = dataUsuarioSesion.token
    const datos = await modificarClasificacion(data, token)
    e.returnValue = datos;
})


//eliminar un docuemnto del activo--------------------------------------------
ipcMain.on('eliminarDocumento', async (e, data) => {
    const token = dataUsuarioSesion.token
    const documentoEliminado = await eliminarDocumento(data, token)
    e.returnValue = documentoEliminado;
})

ipcMain.on('guardarDocumento', async (e, data) => {
    const token = dataUsuarioSesion.token
    const documentoGuardado = await guardarDocumento(data, token)
    e.returnValue = documentoGuardado;
})

ipcMain.on('consultarListasCofigActivos', async (e) => {
    const token = dataUsuarioSesion.token
    const listados = await consultarListasCofigActivos(token)
    e.returnValue = listados;
})

ipcMain.on('crearActivo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const guardar = await crearActivo(data, token)
    e.returnValue = guardar;
})

ipcMain.on('consultarDatosActivoSolicitud', async (e, id) => {
    const token = dataUsuarioSesion.token
    const activo = await consultarDatosActivoSolicitud(id, token)
    e.returnValue = activo;
})

ipcMain.on('consultarDatosActivoReportePrev', async (e, id) => {
    const token = dataUsuarioSesion.token
    const activo = await consultarDatosActivoReportePrev(id, token)
    e.returnValue = activo;
})

/////////////////////////////////solicitudes////////////////////////////

// consultar el listado de solicitud
ipcMain.on('listadoSolicitud', async (e, data) => {
    const token = dataUsuarioSesion.token
    const listado = await consultarListadoSolicitudes(data, token)
    e.returnValue = listado;
})

// crear solicitud
ipcMain.on('crearSolicitud', async (e, data) => {
    const token = dataUsuarioSesion.token
    const solicitud = await crearSolicitud(data, token)
    e.returnValue = solicitud;
})

ipcMain.on('consultarSolicitud', async (e, id) => {
    const token = dataUsuarioSesion.token
    const solicitud = await consultarSolicitud(id, token)
    e.returnValue = solicitud;
})

ipcMain.on('editarSolicitud', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await editarSolicitud(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('consultarSolicitudReporte', async (e, id) => {
    const token = dataUsuarioSesion.token
    const respuesta = await consultarSolicitudReporte(id, token)
    e.returnValue = respuesta;
})

ipcMain.on('eliminarSolicitud', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await eliminarSolicitud(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('descargarSolicitud', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await descargarSolicitud(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('guardarImagenSolicitud', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await guardarImagenSolicitud(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('eliminarImagenSolicitud', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await eliminarImagenSolicitud(data, token)
    e.returnValue = respuesta;
})

//////////////////////////////// reportes////////////////////////////////

// listado reportes

ipcMain.on('listadoReportes', async (e, data) => {
    const token = dataUsuarioSesion.token
    const listado = await consultarListadoReportes(data, token)
    e.returnValue = listado;
})

ipcMain.on('nuevoReporte', async (e, data) => {
    const token = dataUsuarioSesion.token
    const reporte = await crearNuevoReporte(data, token)
    e.returnValue = reporte;
})

ipcMain.on('guardarReportePrev', async (e, data) => {
    const token = dataUsuarioSesion.token
    const reporte = await guardarReportePrev(data, token)
    e.returnValue = reporte;
})

ipcMain.on('descargarListaMtto', async (e, data) => {
    const token = dataUsuarioSesion.token
    const documento = await descargarListaMtto(data, token)
    e.returnValue = documento;
})

ipcMain.on('consultarReporte', async (e, id) => {
    const token = dataUsuarioSesion.token
    const respuesta = await consultarReporte(id, token)
    e.returnValue = respuesta;
})

ipcMain.on('eliminarReporte', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await eliminarReporte(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('descargarReporte', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await descargarReporte(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('descargarReporteExterno', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await descargarReporteExterno(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('editarReporte', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await editarReporte(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('eliminarImagenReporte', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await eliminarImagenReporte(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('guardarImagenReporte', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await guardarImagenReporte(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('guardarSoporteExtReporte', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await guardarSoporteExtReporte(data, token)
    e.returnValue = respuesta;
})

ipcMain.on('eliminarSoporteExtReporte', async (e, data) => {
    const token = dataUsuarioSesion.token
    const respuesta = await eliminarSoporteExtReporte(data, token)
    e.returnValue = respuesta;
})


///////////////////////////componentes//////////////////////////////////////////

ipcMain.on('eliminarComponente', async (e, data) => {
    const token = dataUsuarioSesion.token
    const resultado = await eliminarComponente(data, token)
    e.returnValue = resultado;
})

ipcMain.on('guardarComponente', async (e, data) => {
    const token = dataUsuarioSesion.token

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

ipcMain.on('consultarTablasCofig', async (e) => {
    const token = dataUsuarioSesion.token
    const resultado = await consultarTodasTablasConfig(token)
    e.returnValue = resultado;
})

// configuraciones //////////////////-----------------------------------

ipcMain.on('nuevaConfig', async (e, data) => {
    const token = dataUsuarioSesion.token

    const resultado = await crearConfig(data, token)
    e.returnValue = resultado;
})

ipcMain.on('editarConfig', async (e, data) => {
    const token = dataUsuarioSesion.token

    const resultado = await actualizarConfig(data, token)
    e.returnValue = resultado;
})


// informes /////////////////////////////////////////

ipcMain.on('descargaCronograma', async (e, data) => {
    const token = dataUsuarioSesion.token

    const resultado = await descargaCronograma(data, token)
    e.returnValue = resultado;
})

ipcMain.on('informelistadoAct', async (e, data) => {
    const token = dataUsuarioSesion.token

    const resultado = await informelistadoAct(data, token)
    e.returnValue = resultado;
})


ipcMain.on('informelistadoActCost', async (e, data) => {
    const token = dataUsuarioSesion.token

    const resultado = await informelistadoActCost(data, token)
    e.returnValue = resultado;
})

ipcMain.on('descargarIfoActCosteado', async (e, data) => {
    const token = dataUsuarioSesion.token

    const resultado = await descargarIfoActCosteado(data, token)
    e.returnValue = resultado;
})

ipcMain.on('descargarIfolistadoreportes', async (e, data) => {
    const token = dataUsuarioSesion.token

    const resultado = await informelistadoReportes(data, token)
    e.returnValue = resultado;
})

ipcMain.on('descargarIfolistadoSolicitudes', async (e, data) => {
    const token = dataUsuarioSesion.token

    const resultado = await informelistadoSolicitudes(data, token)
    e.returnValue = resultado;
})

ipcMain.on('descargarMovimientoInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const insumo = await informeMovimientoInsumos(data, token)
    e.returnValue = insumo;
})

// insumos -------------------------------------
ipcMain.on('listadoInsumos', async (e) => {
    const token = dataUsuarioSesion.token

    const resultado = await consultarListadoInsumos(token)
    e.returnValue = resultado;
})

ipcMain.on('consultarUnInsumo', async (e, id) => {
    const token = dataUsuarioSesion.token
    const insumo = await consultarUnInsumo(id, token)
    e.returnValue = insumo;
})

ipcMain.on('actualizarInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const insumo = await actualizarInsumosBodega(data, token)
    e.returnValue = insumo;
})

ipcMain.on('salidaInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    data.tipo = 2
    const insumo = await movimientoInsumo(data, token)
    e.returnValue = insumo;
})

ipcMain.on('entradaInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    data.tipo = 1
    const insumo = await movimientoInsumo(data, token)
    e.returnValue = insumo;
})

ipcMain.on('arqueoInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    data.tipo = 3
    const insumo = await movimientoInsumo(data, token)
    e.returnValue = insumo;
})

ipcMain.on('eliminarFacturaInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const insumo = await eliminarFactInsumo(data, token)
    e.returnValue = insumo;
})

ipcMain.on('guardarDocumentoInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const insumo = await guardarFactInsumo(data, token)
    e.returnValue = insumo;
})

ipcMain.on('descargarFacturaInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const insumo = await descargarFactInsumo(data, token)
    e.returnValue = insumo;
})

ipcMain.on('elimnarImagenInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const insumo = await eliminarImagInsumo(data, token)
    e.returnValue = insumo;
})

    
ipcMain.on('guardarimagenInsumo', async (e, data) => {
    const token = dataUsuarioSesion.token
    const insumo = await guardarImagInsumo(data, token)
    e.returnValue = insumo;
})

