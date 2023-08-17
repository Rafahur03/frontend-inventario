const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'

const guardarEditarSolicitud = (e, seccion) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const solicitud = boton.getAttribute('solicitud')
    const descripcion = seccion.querySelector('.descripcionSolicitud').value
    if (descripcion.length == 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'la descripcion no puede estar vacia' })
    if (descripcion.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'la descripcion no puede estar vacia' })
    const codigo = seccion.querySelector('.idActivo').value
    const idSolicitud = seccion.querySelector('.idSolicitud').value.split('-')[1]
    const data = {
        solicitud,
        descripcion,
        codigo,
        idSolicitud

    }

    const respuesta = ipcRenderer.sendSync('editarSolicitud', data);
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

export {
    guardarEditarSolicitud
}