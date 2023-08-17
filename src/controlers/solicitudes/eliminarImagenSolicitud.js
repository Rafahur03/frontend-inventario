const { ipcRenderer } = require('electron')
import { eliminarImagen } from "../helpers/eliminarImagenGrid.js"
import { modalEleccion, modalMensaje } from "../helpers/modalEleccion.js"
const eliminarImagenSolicitud = async (e, nodo) => {
    e.preventDefault()

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR IMAGEN SOLICITUD', mensaje: `Esta seguro(a) de eliminar la imagen, esta accion es irreversible` })

    const solicitud = boton.getAttribute('solicitud')
    const codigo = nodo.querySelector('.idActivo').value
    const imagen = boton.getAttribute('imagen')
    const idSolicitud = nodo.querySelector('.idSolicitud').value.split('-')[1]

    if (!eleccion) return

    const data = {
        solicitud,
        codigo,
        imagen,
        idSolicitud
    }

    const eliminar = ipcRenderer.sendSync('eliminarImagenSolicitud', data);

    if (eliminar.msg) return  modalMensaje({titulo:'ERROR', mensaje:eliminar.msg})

    eliminarImagen(e, nodo)

    modalMensaje({titulo:'EXITO', mensaje:eliminar.exito})
}

export {
    eliminarImagenSolicitud
}