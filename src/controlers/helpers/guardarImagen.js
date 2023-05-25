const { ipcRenderer } = require('electron')
import { modalMensaje } from "./modalEleccion.js"
import { eliminarImgActivo } from "./eliminarImg.js"
const guardarImgActivo = e => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const activo = boton.getAttribute('activo')
    const id = activo.split('-')
    const nombre = boton.getAttribute('nombre').split('-')[1]
    const form = document.querySelector(`[form-activo="${activo}"]`)
    const codigo = form.querySelector('.codigoInterno').value
    const contenedorBotones = boton.parentNode
    const imagen = contenedorBotones.previousSibling
    const dataImagen = imagen.src
    const data = {
        id,
        codigo,
        dataImagen
    }
    const imagenActivo = ipcRenderer.sendSync('imagenActivo', data);
    if (imagenActivo.msg) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: imagenActivo.msg
        }
        modalMensaje(mensaje)
        return
    }
    
    const botonEliminar = contenedorBotones.firstChild
    const carruselItem = imagen.parentNode.parentNode
    carruselItem.setAttribute('nombre', imagenActivo.nombre)
    botonEliminar.setAttribute('nombre', imagenActivo.nombre)
    botonEliminar.onclick = e => eliminarImgActivo(e)
    imagen.classList.remove(nombre)
    imagen.classList.add(imagenActivo.nombre)
    contenedorBotones.removeChild(boton)
}

export {
    guardarImgActivo
}