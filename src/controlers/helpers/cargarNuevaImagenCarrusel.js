const mime = require('mime-types')
import { eliminarImgCarrusel } from './eliminarImg.js'
import { modalMensaje } from './modalEleccion.js'
import { rotarImg } from './rotarImg.js'
import { guardarImgActivo } from './guardarImagen.js'
import { generateRandomId } from './nombreRandon.js'

const nuevaImagen = e => {
    const files = e.target.files
    const contenerdorInput = e.target.parentNode
    const contenedorSeleccionar = contenerdorInput.parentNode
    const contenedorCarruserl = contenedorSeleccionar.previousSibling.previousSibling
    const carruselimagenes = contenedorCarruserl.querySelector('.carousel-inner')
    const imagenes = []
    const extensiones = ['png', 'jpg', 'jpeg']
    for (const file of files) {
        if (extensiones.indexOf(mime.extension(file.type)) !== -1 && file.size <= 3145728) {
            imagenes.push(file)
        }
    }

    if (imagenes.length === 0) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: 'Solo se aceptan imagenes en formato png, jpg o jpeg y con tamaños de hasta 3Mb'
        }
        modalMensaje(mensaje)
        return
    }
    const imagenesExistente = carruselimagenes.querySelectorAll('.carousel-item')
    let cantidadImagenes = imagenesExistente.length

    if (cantidadImagenes === 1) {
        const nombre = imagenesExistente[0].getAttribute('nombre').split('-')[1];
        if (nombre === 'undefined') {
            carruselimagenes.removeChild(imagenesExistente[0])
            cantidadImagenes--
        }
    }

    if (cantidadImagenes + imagenes.length > 6) {
        const mensaje = {
            titulo: 'Info',
            mensaje: `Se cargaran solo las ${6 - cantidadImagenes} primeras imagenes seleccionadas ya que superan el limite de 6 imagens por activo`
        }
        modalMensaje(mensaje)
    }

    const activo = carruselimagenes.getAttribute('activo')

    let cantidad
    if ((6 - cantidadImagenes) >= imagenes.length) {
        cantidad = imagenes.length
    } else {
        cantidad = 6 - cantidadImagenes
    }

    for (var i = 0; i < cantidad; i++) {
        const nombreImgen = generateRandomId()
        const reader = new FileReader()
        const itemCarrusel = document.createElement('div')
        itemCarrusel.setAttribute('nombre', `Img-${nombreImgen}`)
        itemCarrusel.classList.add('carousel-item')
        if (cantidadImagenes === 0) if (i === 0) itemCarrusel.classList.add('active')
        const divContainer = document.createElement('div')
        divContainer.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center')
        const divContainerBotones = document.createElement('div')
        divContainerBotones.classList.add('d-block')
        const imagen = document.createElement('img')
        imagen.classList.add('d-block', 'w-100', nombreImgen)
        
        reader.onload = function (e) {
            imagen.src= e.target.result  
        }
        reader.readAsDataURL(imagenes[i])

        const iGuardar = document.createElement('i')
        iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-3', 'fw-bold', 'text-primary', 'p-0')
        const iEliminar = document.createElement('i')
        iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
        const btnGuardar = document.createElement('button')
        btnGuardar.setAttribute('activo', `${activo}`)
        btnGuardar.type = 'button'
        btnGuardar.classList.add('btn', 'ms-3', 'p-0')
        btnGuardar.setAttribute('nombre', `Img-${nombreImgen}`)
        const btnEliminar = document.createElement('button')
        btnEliminar.setAttribute('activo', `${activo}`)
        btnEliminar.setAttribute('nombre', `Img-${nombreImgen}`)
        btnEliminar.classList.add('btn', 'me-3', 'p-0')
        btnEliminar.type = 'button'
        btnGuardar.appendChild(iGuardar)
        btnEliminar.appendChild(iEliminar)
        divContainerBotones.appendChild(btnEliminar)
        divContainerBotones.appendChild(btnGuardar)
        divContainer.appendChild(imagen)
        divContainer.appendChild(divContainerBotones)
        itemCarrusel.appendChild(divContainer)
        carruselimagenes.appendChild(itemCarrusel)
        carruselimagenes.setAttribute('activo', `${activo}`)
        imagen.onload = e => rotarImg(e)
        btnEliminar.onclick = e => eliminarImgCarrusel(e)
        btnGuardar.onclick = e => guardarImgActivo(e)
        cantidadImagenes++
    }

    const contenedorinput = contenedorCarruserl.nextSibling.nextSibling
    if (cantidadImagenes >= 6) {
        contenedorinput.classList.add('d-none')
    }else{
        const botonInput = contenedorinput.querySelector('.buttonImagenesActivo')
        botonInput.textContent = `Selecione Max ${ 6 - cantidadImagenes} Imagenes`
    }

}

export {
    nuevaImagen
}