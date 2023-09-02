const { ipcRenderer } = require('electron')
import { eliminarImagenReporte } from "../helpers/eliminarImagenGrid.js"
import { modalEleccion, modalMensaje } from "../helpers/modalEleccion.js"
const eliminarImgReporte = async (e, nodo) => {
    e.preventDefault()

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR IMAGEN REPORTE', mensaje: `Esta seguro(a) de eliminar la imagen, esta accion es irreversible` })

    const reporte = boton.getAttribute('reporte')
    const imagen = boton.getAttribute('imagen')
    const codigo = nodo.querySelector('.idActivo').value
    const idSolicitud = nodo.querySelector('.idSolicitud').value.split('-')[1]

    if (!eleccion) return

    const data = {
        reporte,
        codigo,
        idSolicitud,
        imagen
    }

    const eliminar = ipcRenderer.sendSync('eliminarImagenReporte', data);

    if (eliminar.msg) return  modalMensaje({titulo:'ERROR', mensaje:eliminar.msg})

    eliminarImagenReporte(e, nodo)

    modalMensaje({titulo:'EXITO', mensaje:eliminar.exito})
}

export {
    eliminarImgReporte
}