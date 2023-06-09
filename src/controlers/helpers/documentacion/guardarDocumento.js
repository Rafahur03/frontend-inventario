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

    console.log(boton)

}

export {
    gudardarDocumento
}