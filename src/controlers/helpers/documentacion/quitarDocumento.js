import { modalEleccion, modalMensaje } from "../modalEleccion.js"
import { cargarDocumento } from "./cargarDocumento.js"
const quitarDocumento =  async e => {
    const eleccion = await modalEleccion({ titulo: 'QUITAR DOCUMENTO DE ACTIVO', mensaje: 'Esta seguro de quitar el documento seleccionado, esta accion no se puede deshacer' })
    if (!eleccion) return
    
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const contendorPdf = boton.parentNode.parentNode
    contendorPdf.classList.add('d-none')
    const embed = contendorPdf.querySelector('embed')
    embed.src=''
    const contenedorInput = contendorPdf.nextSibling.nextSibling
    contenedorInput.classList.remove('d-none')
    const input = contenedorInput.querySelector('input')
    input.value = ''
    input.onchange = (e) => cargarDocumento(e)
    modalMensaje({ titulo: 'EXITO', mensaje: 'Documento Quitado Correctamente'})
}

export {
    quitarDocumento
}