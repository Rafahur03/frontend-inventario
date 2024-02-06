const mime = require('mime-types')
import { modalMensaje } from '../modalEleccion.js'
import { rotarImg } from '../activos/rotarImg.js'
import { generateRandomId } from '../nombreRandon.js'
import { eliminarImgInsumocarrusel } from './eliminarImgInsumocarrusel.js'
import { guardarImagenInsumo } from '../../insumos/guardarImagenInsumo.js'

const nuevaImagenInsumo = (e, crear = null) => {
    const files = e.target.files

    const contenerdorInput = e.target.parentNode
    const contenedorSeleccionar = contenerdorInput.parentNode
    const contenedorCarruserl = contenedorSeleccionar.previousSibling.previousSibling
    const carruselimagenes = contenedorCarruserl.querySelector('.carousel-inner')
    const imagenes = []
    const extensiones = ['png', 'jpg', 'jpeg']

    for (const file of files) {
        if (extensiones.indexOf(mime.extension(file.type)) !== -1 && file.size <= 6291456) {
            imagenes.push(file)
        }
    }

    if (imagenes.length === 0) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: 'Solo se aceptan imagenes en formato png, jpg o jpeg y con tamaños de hasta 6Mb'
        }
        modalMensaje(mensaje)
        return
    }

    if (imagenes.length > 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Solo Puede cargar Una imagen' })

    while (carruselimagenes.firstChild) {
        carruselimagenes.removeChild(carruselimagenes.firstChild);
    }

    const nombreImgen = generateRandomId()
    const reader = new FileReader()
    const itemCarrusel = document.createElement('div')
    itemCarrusel.setAttribute('nombre', `Img-${nombreImgen}`)
    itemCarrusel.classList.add('carousel-item')
    itemCarrusel.classList.add('active')
    const divContainer = document.createElement('div')
    divContainer.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center')
    const divContainerBotones = document.createElement('div')
    divContainerBotones.classList.add('d-block')
    const imagen = document.createElement('img')
    imagen.classList.add('d-block', 'w-100', nombreImgen)

    reader.onload = function (e) {
        imagen.src = e.target.result
    }
    reader.readAsDataURL(imagenes[0])


    const iEliminar = document.createElement('i')
    iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
    const btnEliminar = document.createElement('button')
    btnEliminar.setAttribute('nombre', `Img-${nombreImgen}`)
    btnEliminar.classList.add('btn', 'me-3', 'p-0')
    btnEliminar.type = 'button'
    btnEliminar.appendChild(iEliminar)
    divContainerBotones.appendChild(btnEliminar)
    btnEliminar.onclick = e => eliminarImgInsumocarrusel(e) 

    if (crear === null) {
        const insumo = carruselimagenes.getAttribute('insumo')
        btnEliminar.setAttribute('insumo', `${insumo}`)

        const iGuardar = document.createElement('i')
        iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-3', 'fw-bold', 'text-primary', 'p-0')
        const btnGuardar = document.createElement('button')
        btnGuardar.setAttribute('insumo', `${insumo}`)
        btnGuardar.type = 'button'
        btnGuardar.classList.add('btn', 'ms-3', 'p-0')
        btnGuardar.setAttribute('nombre', `Img-${nombreImgen}`)
        btnGuardar.appendChild(iGuardar)
        divContainerBotones.appendChild(btnGuardar)
        btnGuardar.onclick = e => guardarImagenInsumo(e)
    }

    divContainer.appendChild(imagen)
    divContainer.appendChild(divContainerBotones)
    itemCarrusel.appendChild(divContainer)
    carruselimagenes.appendChild(itemCarrusel)
    imagen.onload = e => rotarImg(e)

    const contenedorinput = contenedorCarruserl.nextSibling.nextSibling
    contenedorinput.classList.add('d-none')
    e.target.value = ''

}

export {
    nuevaImagenInsumo
}