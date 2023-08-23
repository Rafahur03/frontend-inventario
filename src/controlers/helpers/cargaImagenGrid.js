const mime = require('mime-types')
import { modalMensaje } from './modalEleccion.js'
import { generateRandomId } from './nombreRandon.js'
import { rotarImg } from './activos/rotarImg.js'
import { eliminarImagen } from './eliminarImagenGrid.js'
import { guardarImagenSolicitud } from '../solicitudes/guardarImagenSolicitud.js'


const cargarImagenGrid = (e, nodo) => {

    const files = e.target.files
    const imagenes = []

    const contenedorImagenes = nodo.querySelector('.imagenesSolicitud')
    const imagenesCargadas = contenedorImagenes.querySelectorAll('img')

    if (imagenesCargadas.length >= 4) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: 'Solo se pueden cargar un maximo de 4 imagenes'
        }
        return modalMensaje(mensaje)
    }
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

    if (imagenes.length > (4 - imagenesCargadas.length)) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: `Se cargaran solo las ${4 - imagenesCargadas.length} primeras imagenes`
        }
        modalMensaje(mensaje)
    }
    let cantidad
    if ((4 - imagenesCargadas.length) >= imagenes.length) {
        cantidad = imagenes.length
    } else {
        cantidad = 4 - imagenesCargadas.length
    }
    for (var i = 0; i < cantidad; i++) {
        const nombre = generateRandomId()
        const reader = new FileReader()
        const contenedorImagen = document.createElement('div')
        contenedorImagen.setAttribute('nombre', `Img-${nombre}`)
        contenedorImagen.classList.add('m-2', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'col-3')
        const imagen = document.createElement('img')
        imagen.classList.add('rounded', 'img-fluid', nombre)


        reader.onload = function (e) {
            imagen.src = e.target.result
        }

        reader.readAsDataURL(imagenes[i])

        const contenedorBotones = document.createElement('div')
        contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')

        const iEliminar = document.createElement('i')
        iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
        const btnEliminar = document.createElement('button')
        btnEliminar.setAttribute('imagen', nombre)
        btnEliminar.classList.add('btn', 'text-center', 'm-1', 'p-0')
        btnEliminar.appendChild(iEliminar)
        btnEliminar.onclick = e => {
            e.preventDefault()
            eliminarImagen(e, nodo)
        }
        contenedorBotones.appendChild(btnEliminar)
        const idSolicitud = nodo.querySelector('.idSolicitud')

        if (idSolicitud !== null) {
            const iGuardar = document.createElement('i')
            iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-3', 'fw-bold', 'text-primary', 'p-0')
            const btnGuardar = document.createElement('button')
            btnGuardar.setAttribute('imagen', nombre)
            btnGuardar.setAttribute('solicitud', `${idSolicitud.value}`)
            btnGuardar.classList.add('btn', 'text-center', 'm-1', 'p-0')
            btnGuardar.appendChild(iGuardar)
            btnGuardar.onclick = e => {
                e.preventDefault()
                guardarImagenSolicitud(e, nodo)
            }
            contenedorBotones.appendChild(btnGuardar)
        }
        console.log(imagen)
        contenedorImagen.appendChild(imagen)
        contenedorImagen.appendChild(contenedorBotones)
        contenedorImagenes.appendChild(contenedorImagen)
        imagen.onload = e => rotarImg(e)
    }
    const imagenesFinal = contenedorImagenes.querySelectorAll('img')

    if (imagenesFinal.length >= 4) {
        const labelCargarImagenes = nodo.querySelector('.labelSeleccionarImagen')

        const contendorInput = nodo.querySelector('.contendorInput')
        labelCargarImagenes.classList.add('d-none')
        contendorInput.classList.add('d-none')
    } else {
        const botonCargarImagenes = nodo.querySelector('.imagenesSoporte')
        botonCargarImagenes.textContent = `Selecione Max ${4 - imagenesFinal.length} Imagenes`
    }

}


const cargarImagenGridReporte = (e, nodo) => {

    const files = e.target.files
    const imagenes = []

    const contenedorImagenes = nodo.querySelector('.imagenesReporte')
    const imagenesCargadas = contenedorImagenes.querySelectorAll('img')

    if (imagenesCargadas.length >= 4) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: 'Solo se pueden cargar un maximo de 4 imagenes'
        }
        return modalMensaje(mensaje)
    }
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

    if (imagenes.length > (4 - imagenesCargadas.length)) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: `Se cargaran solo las ${4 - imagenesCargadas.length} primeras imagenes`
        }
        modalMensaje(mensaje)
    }
    let cantidad
    if ((4 - imagenesCargadas.length) >= imagenes.length) {
        cantidad = imagenes.length
    } else {
        cantidad = 4 - imagenesCargadas.length
    }
    for (var i = 0; i < cantidad; i++) {
        const nombre = generateRandomId()
        const reader = new FileReader()
        const contenedorImagen = document.createElement('div')
        contenedorImagen.setAttribute('nombre', `Img-${nombre}`)
        contenedorImagen.classList.add('m-2', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'col-3')
        const imagen = document.createElement('img')
        imagen.classList.add('rounded', 'img-fluid', nombre)


        reader.onload = function (e) {
            imagen.src = e.target.result
        }

        reader.readAsDataURL(imagenes[i])

        const contenedorBotones = document.createElement('div')
        contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')

        const iEliminar = document.createElement('i')
        iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
        const btnEliminar = document.createElement('button')
        btnEliminar.setAttribute('imagen', nombre)
        btnEliminar.classList.add('btn', 'text-center', 'm-1', 'p-0')
        btnEliminar.appendChild(iEliminar)
        btnEliminar.onclick = e => {
            e.preventDefault()
            console.log('tienes que crear la funcion eliminar imagen')
        }
        contenedorBotones.appendChild(btnEliminar)
        const idReporte = nodo.querySelector('.idReporte')

        if (idReporte !== null) {
            const iGuardar = document.createElement('i')
            iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-3', 'fw-bold', 'text-primary', 'p-0')
            const btnGuardar = document.createElement('button')
            btnGuardar.setAttribute('imagen', nombre)
            btnGuardar.setAttribute('solicitud', `${idReporte.value}`)
            btnGuardar.classList.add('btn', 'text-center', 'm-1', 'p-0')
            btnGuardar.appendChild(iGuardar)
            btnGuardar.onclick = e => {
                e.preventDefault()
                console.log('tienes que crear la funcion fuardar imagen')
            }
            contenedorBotones.appendChild(btnGuardar)
        }

        contenedorImagen.appendChild(imagen)
        contenedorImagen.appendChild(contenedorBotones)
        contenedorImagenes.appendChild(contenedorImagen)
        imagen.onload = e => rotarImg(e)
    }
    const imagenesFinal = contenedorImagenes.querySelectorAll('img')

    if (imagenesFinal.length >= 4) {
        const labelCargarImagenes = nodo.querySelector('.labelSeleccionarImagen')

        const contendorInput = nodo.querySelector('.contendorInput')
        labelCargarImagenes.classList.add('d-none')
        contendorInput.classList.add('d-none')
    } else {
        const botonCargarImagenes = nodo.querySelector('.imagenesSoporte')
        botonCargarImagenes.textContent = `Selecione Max ${4 - imagenesFinal.length} Imagenes`
    }

}

export { cargarImagenGrid, cargarImagenGridReporte }