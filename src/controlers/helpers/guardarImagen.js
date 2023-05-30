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
    const id = activo.split('-')[1]
    const nombre = boton.getAttribute('nombre').split('-')[1]
    const form = document.querySelector(`[form-activo="${activo}"]`)
    const codigo = form.querySelector('.codigoInterno').value
    const contenedorBotones = boton.parentNode
    const imagen = contenedorBotones.previousSibling
    const dataImagen = imagen.src
    const data = {
        id,
        codigo,
        nombre,
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
    
    const mensaje = {
        titulo: 'EXITO',
        mensaje: imagenActivo.exito
    }
    modalMensaje(mensaje)
    console.log(imagenActivo)

    const botonEliminar = contenedorBotones.firstChild
    const carruselItem = imagen.parentNode.parentNode
    carruselItem.setAttribute('nombre', imagenActivo.nombre)
    itemCarrusel.classList.add( `Img-${imagenActivo.nombre}`)
    botonEliminar.setAttribute('nombre', imagenActivo.nombre)
    botonEliminar.classList.add('m-0')
    botonEliminar.classList.remove('m-3')
    botonEliminar.onclick = e => eliminarImgActivo(e)
    imagen.classList.remove(nombre)
    imagen.classList.add(imagenActivo.nombre)
    imagen.src = imagenActivo.imagen
    contenedorBotones.removeChild(boton)
}

export {
    guardarImgActivo
}