const { ipcRenderer } = require('electron')
import { cargarReportePdf } from "./cargarReportePdf.js"
import { modalEleccion, modalMensaje } from "../helpers/modalEleccion.js"
const eliminarSoporteExtReporte = async (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR IMAGEN REPORTE', mensaje: `Esta seguro(a) de eliminar el soporte externo, esta accion es irreversible` })

    const reporte = boton.getAttribute('reporte')
    const codigo = nodo.querySelector('.idActivo').value
    const idSolicitud = nodo.querySelector('.idSolicitud').value.split('-')[1]

    if (!eleccion) return

    const data = {
        reporte,
        codigo,
        idSolicitud
    }

    const eliminar = ipcRenderer.sendSync('eliminarSoporteExtReporte', data);

    if (eliminar.msg) return  modalMensaje({titulo:'ERROR', mensaje:eliminar.msg})
    
    const contenedorpdf = nodo.querySelector('.contendorpdfReporte')
    contenedorpdf.removeChild(contenedorpdf.firstChild)  
    const contenedorInputPdf = nodo.querySelector('.contendorInputpdf')
    contenedorInputPdf.classList.remove('d-none')
    const input= contenedorInputPdf.querySelector('input')
    input.onchange = e => cargarReportePdf(e,nodo)

    modalMensaje({titulo:'EXITO', mensaje:eliminar.exito})




}

export {
    eliminarSoporteExtReporte
}