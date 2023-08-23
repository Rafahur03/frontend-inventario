
const { ipcRenderer } = require('electron')
import { modalEleccion, modalMensaje } from "../helpers/modalEleccion.js"
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js"
const eliminarSolicitud = async (e, seccion) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const eleccion = await modalEleccion({ titulo: 'ELIMINAR SOLICITUD', mensaje: `Esta seguro(a) de eliminar la solicitud numero ${solicitud} esta accion es irreversible` })

    if (!eleccion) return

    const solicitud = boton.getAttribute('solicitud')
    const codigo = seccion.querySelector('.idActivo').value
    const idSolicitud = seccion.querySelector('.idSolicitud').value.split('-')[1]

    const data = {
        solicitud,
        codigo,
        idSolicitud
    }

    const eliminar = ipcRenderer.sendSync('eliminarSolicitud', data);

    if (eliminar.msg) return modalMensaje({ titulo: 'ERROR', mensaje: eliminar.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: eliminar.exito })

    cargarTapContenido('listadoSolicitud')
}

export {
    eliminarSolicitud
}