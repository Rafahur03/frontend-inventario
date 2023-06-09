import { modalEleccion } from "../modalEleccion.js"
import { cargarDocumento } from "./cargarDocumento.js"


const eliminarDocumento =  async e => {
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR IMAGEN DE ACTIVO', mensaje: 'Esta seguro de eliminar la imagen seleccionada, esta accion no se puede deshacer' })
    if (!eleccion) return

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    console.log(boton)
}

export {eliminarDocumento}