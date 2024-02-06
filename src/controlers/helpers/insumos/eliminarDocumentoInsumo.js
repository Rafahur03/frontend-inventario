import { modalEleccion } from "../modalEleccion.js"

const eliminarFacturaInsumo = async nodo =>{
    
    const elecion = await modalEleccion({titulo: 'ADVERTENCIA', mensaje: '¿Esta seguro de eliminar el documento?'})
    if(!elecion) return

    const contenedorpdf = nodo.querySelector('.contendorpdFactura')
    contenedorpdf.removeChild(contenedorpdf.firstChild)  
    const contenedorInputPdf = nodo.querySelector('.contendorInputpdf')
    contenedorInputPdf.classList.remove('d-none')
}

export { eliminarFacturaInsumo}