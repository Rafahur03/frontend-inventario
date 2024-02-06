const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"
import { EliminarImagenInsumo } from "./EliminarImagenInsumo.js"

const guardarImagenInsumo = e => {
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
    if (imagenInsumo.msg) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: imagenInsumo.msg
        }
        return modalMensaje(mensaje)
        
    }
    
    const mensaje = {
        titulo: 'EXITO',
        mensaje: imagenInsumo.exito
    }
    modalMensaje(mensaje)

    const botonEliminar = contenedorBotones.firstChild
    const carruselItem = imagen.parentNode.parentNode
    carruselItem.setAttribute('nombre', `Img-${imagenInsumo.nombre}`)
    carruselItem.classList.add( `Img-${imagenInsumo.nombre}`)
    botonEliminar.setAttribute('nombre', `Img-${imagenInsumo.nombre}`)
    botonEliminar.classList.add('m-0')
    botonEliminar.classList.remove('m-3')
    botonEliminar.onclick = e => EliminarImagenInsumo(e)
    imagen.classList.remove(nombre)
    imagen.classList.add(imagenInsumo.nombre)
    imagen.src = imagenInsumo.imagen
    contenedorBotones.removeChild(boton)
}

export {
    guardarImagenInsumo    
}