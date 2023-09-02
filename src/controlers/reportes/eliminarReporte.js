
const { ipcRenderer } = require('electron')
import { modalEleccion, modalMensaje } from "../helpers/modalEleccion.js"
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js"
const eliminarReporte = async (e, seccion) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const reporte = boton.getAttribute('reporte')
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR REPORTE', mensaje: `Esta seguro(a) de eliminar EL reporte numero ${reporte} esta accion es irreversible` })

    if (!eleccion) return


    const codigo = seccion.querySelector('.idActivo').value
    const idSolicitud = seccion.querySelector('.idSolicitud').value.split('-')[1]

    const data = {
        reporte,
        codigo,
        idSolicitud
    }

    const eliminar = ipcRenderer.sendSync('eliminarReporte', data);

    if (eliminar.msg) return modalMensaje({ titulo: 'ERROR', mensaje: eliminar.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: eliminar.exito })

    cargarTapContenido('verReportes')
}

export {
    eliminarReporte
}