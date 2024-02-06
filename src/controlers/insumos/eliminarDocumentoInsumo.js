const { ipcRenderer } = require('electron')
import { cargarDocumentoInsumo } from "../helpers/insumos/cargarDocumentoInsumo.js"
import { modalEleccion,modalMensaje } from "../helpers/modalEleccion.js"

const eliminarDocumentoInsumo = async (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR FACTURA INSUMO', mensaje: `Esta seguro(a) de eliminar La FActura, esta accion es irreversible` })

    if (!eleccion) return

    const insumo = boton.getAttribute('insumo')
    const idinsumo = nodo.querySelector('.insumo').getAttribute('insumo')

    const data = {
        insumo,
        idinsumo
    }

    const eliminar = ipcRenderer.sendSync('eliminarFacturaInsumo', data);

    if (eliminar.msg) return  modalMensaje({titulo:'ERROR', mensaje:eliminar.msg})
    
    const contenedorpdf = nodo.querySelector('.contendorpdFactura')
    contenedorpdf.removeChild(contenedorpdf.firstChild)  
    const contenedorInputPdf = nodo.querySelector('.contendorInputpdf')
    contenedorInputPdf.classList.remove('d-none')
    const input= contenedorInputPdf.querySelector('input')
    input.onchange = e => cargarDocumentoInsumo(e,nodo)

    modalMensaje({titulo:'EXITO', mensaje:eliminar.exito})

}

export {
    eliminarDocumentoInsumo
}