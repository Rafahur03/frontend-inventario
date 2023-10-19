const { ipcRenderer } = require('electron')
import { modalEleccion, modalMensaje } from "../modalEleccion.js"
import { cargarDocumento } from "./cargarDocumento.js"

const eliminarDocumento =  async e => {
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR DOCUMENTO DE ACTIVO', mensaje: 'Esta seguro de eliminar el documento seleccionado, esta accion no se puede deshacer' })
    if (!eleccion) return

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const activo = boton.getAttribute('activo')
    const documento = boton.getAttribute('tipo')
    const data = {
        activo,
        documento
    }
    const eliminado = ipcRenderer.sendSync('eliminarDocumento', data);
    if(eliminado.msg) return modalMensaje({titulo:'error', mensaje:eliminado.msg})
    const nodopadre = boton.parentNode.parentNode
    nodopadre.classList.add('d-none')
    const contendorpdf = nodopadre.querySelector('embed')
    contendorpdf.src = ''
    const nodoseleccionar = nodopadre.nextSibling.nextSibling
    const inputdocumento = nodoseleccionar.querySelector('input')
    inputdocumento.setAttribute('activo', activo)
    inputdocumento.onchange = (e) => cargarDocumento(e)
    nodoseleccionar.classList.remove('d-none')
    modalMensaje({titulo:'EXITO', mensaje:eliminado.exito})

}

export {eliminarDocumento}  