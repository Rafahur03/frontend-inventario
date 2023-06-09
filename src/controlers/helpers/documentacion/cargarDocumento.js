import { gudardarDocumento } from "./guardarDocumento.js"
import { eliminarDocumento } from "./eliminardocumento.js"
const cargarDocumento =  async e => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    console.log(boton)


}

export{
    cargarDocumento
}