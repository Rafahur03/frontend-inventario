import { cargarDocumento } from "./cargarDocumento.js"
const quitarDocumento =  async e => {


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
    quitarDocumento
}