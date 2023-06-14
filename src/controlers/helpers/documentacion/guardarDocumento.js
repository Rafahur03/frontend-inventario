import { modalMensaje } from "../modalEleccion.js"
import { eliminarDocumento } from "./eliminardocumento.js"
import { descargarDocumento } from "./descargardocumento.js"

const gudardarDocumento =  async e => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const contenedorPdf = boton.parentNode.parentNode
    const contendorInput = contenedorPdf.nextSibling.nextSibling
    const input = contendorInput.querySelector('input')
    const file = input.files[0] 
    console.log(file)

}

export {
    gudardarDocumento
}