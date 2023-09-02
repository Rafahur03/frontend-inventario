const { ipcRenderer } = require('electron')
import { eliminarSoporteExtReporte } from "./eliminarSoporteExterno.js"
import { descargarReporteExterno } from "./descargarSoporteExterno.js"
import { modalMensaje } from "../helpers/modalEleccion.js"
const guardarSoporteExterno = async (e, nodo) => {
    e.preventDefault()

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const soportePDF = nodo.querySelector('iframe').src

    const reporte = boton.getAttribute('reporte')
    const codigo = nodo.querySelector('.idActivo').value
    const idSolicitud = nodo.querySelector('.idSolicitud').value.split('-')[1]

    const data = {
        reporte,
        codigo,
        idSolicitud,
        soportePDF
    }

    const guardado = ipcRenderer.sendSync('guardarSoporteExtReporte', data);
    if (guardado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: guardado.msg })
    
    const contendorpdfReporte = nodo.querySelector('.contendorpdfReporte')
    const contenedorbotones  = contendorpdfReporte.querySelector('.contenedorbotones')
    const btnEliminar  = contenedorbotones.querySelector('.eliminar')
    const btnGuardar  = contenedorbotones.querySelector('.guardar')
    const iGuardar  = btnGuardar.querySelector('i')
    btnEliminar.setAttribute('reporte', reporte)
    btnGuardar.setAttribute('reporte', reporte)
    btnEliminar.onclick = e =>eliminarSoporteExtReporte(e, nodo)
    btnGuardar.onclick = e =>descargarReporteExterno(e,nodo)
    iGuardar.classList.remove('text-primary')
    iGuardar.classList.add('text-success')

    modalMensaje({ titulo: 'EXITO', mensaje: guardado.exito })


}

export {
    guardarSoporteExterno
}

