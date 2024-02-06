const { ipcRenderer } = require('electron')
import { eliminarDocumentoInsumo } from "./eliminarDocumentoInsumo.js"
import { modalMensaje } from "../helpers/modalEleccion.js"
import { descargarFacturaInsumo } from "./descargarFacturaInsumo.js"
const guardarDocumentoInsumo = async (e, nodo) => {
    e.preventDefault()

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const soportePDF = nodo.querySelector('iframe').src

    const insumo = boton.getAttribute('insumo')
    const idInsumo = nodo.querySelector('.insumo').getAttribute('insumo')


    const data = {
        insumo,
        idInsumo,
        soportePDF
    }

    const guardado = ipcRenderer.sendSync('guardarDocumentoInsumo', data);
    if (guardado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: guardado.msg })
    
    const contendorpdFactura = nodo.querySelector('.contendorpdFactura')
    const contenedorbotones  = contendorpdFactura.querySelector('.contenedorbotones')
    const btnEliminar  = contenedorbotones.querySelector('.eliminar')
    const btnGuardar  = contenedorbotones.querySelector('.guardar')
    const iGuardar  = btnGuardar.querySelector('i')
    btnEliminar.setAttribute('insumo', insumo)
    btnGuardar.setAttribute('insumo', insumo)
    btnEliminar.onclick = e =>eliminarDocumentoInsumo(e, nodo)
    btnGuardar.onclick = e =>descargarFacturaInsumo(e, nodo)
    iGuardar.classList.remove('text-primary')
    iGuardar.classList.add('text-success')

    modalMensaje({ titulo: 'EXITO', mensaje: guardado.exito })


}

export {
    guardarDocumentoInsumo
}

