const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"
import { EliminarImagenInsumo } from "./EliminarImagenInsumo.js"

const guardarImagenInsumo = (e, nodo) => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const insumo = boton.getAttribute('insumo')
    const nombre = boton.getAttribute('nombre').split('-')[1]
    const contenedorBotones = boton.parentNode
    const imagen = contenedorBotones.previousSibling
    const dataImagen = imagen.src

    const data = {
        insumo,
        nombre,
        dataImagen
    }

    const imagenInsumo = ipcRenderer.sendSync('guardarimagenInsumo', data);

    if (imagenInsumo.msg) return modalMensaje({titulo: 'ERROR', mensaje: imagenInsumo.msg})

    

    modalMensaje({
        titulo: 'EXITO',
        mensaje: imagenInsumo.exito
    })
    
    const botonEliminar = contenedorBotones.firstChild
    const carruselItem = imagen.parentNode.parentNode
    carruselItem.setAttribute('nombre', `Img-${imagenInsumo.nombre}`)
    carruselItem.classList.add(`Img-${imagenInsumo.nombre}`)
    botonEliminar.setAttribute('nombre', `Img-${imagenInsumo.nombre}`)
    botonEliminar.classList.add('m-0')
    botonEliminar.classList.remove('m-3')
    botonEliminar.onclick = e => EliminarImagenInsumo(e, nodo)
    imagen.classList.remove(nombre)
    imagen.classList.add(imagenInsumo.nombre)
    contenedorBotones.removeChild(boton)
}

export {
    guardarImagenInsumo
}