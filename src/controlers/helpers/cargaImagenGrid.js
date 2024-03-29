const mime = require('mime-types')
import { modalMensaje } from './modalEleccion.js'
import { generateRandomId } from './nombreRandon.js'
import { rotarImg } from './activos/rotarImg.js'
import { eliminarImagen, eliminarImagenReporte } from './eliminarImagenGrid.js'
import { guardarImagenSolicitud } from '../solicitudes/guardarImagenSolicitud.js'
import { guardarImgReporte } from '../reportes/guardarImgReporte.js'
import { cambiarFirmaUsuario } from '../usuarios/cambiarFirmaUsuario.js'


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

        contenedorImagen.appendChild(imagen)
        contenedorImagen.appendChild(contenedorBotones)
        contenedorImagenes.appendChild(contenedorImagen)
        imagen.onload = e => rotarImg(e)
    }
    const imagenesFinal = contenedorImagenes.querySelectorAll('img')
    const contendorInput = nodo.querySelector('.contendorInput')
    if (imagenesFinal.length >= 4) {

        contendorInput.classList.add('d-none')
    } else {
        const botonCargarImagenes = nodo.querySelector('.imagenesSoporte')
        botonCargarImagenes.textContent = `Selecione Max ${4 - imagenesFinal.length} Imagenes`
    }

    contendorInput.querySelector('input').value = ''

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
            eliminarImagenReporte(e, nodo)
        }
        contenedorBotones.appendChild(btnEliminar)

        const idReporte = nodo.querySelector('.idReporte')
        if (idReporte !== null) {
            const iGuardar = document.createElement('i')
            iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-3', 'fw-bold', 'text-primary', 'p-0')
            const btnGuardar = document.createElement('button')
            btnGuardar.setAttribute('imagen', nombre)
            btnGuardar.setAttribute('reporte', `${idReporte.value}`)
            btnGuardar.classList.add('btn', 'text-center', 'm-1', 'p-0')
            btnGuardar.appendChild(iGuardar)
            btnGuardar.onclick = e => guardarImgReporte(e, nodo)

            contenedorBotones.appendChild(btnGuardar)
        }

        contenedorImagen.appendChild(imagen)
        contenedorImagen.appendChild(contenedorBotones)
        contenedorImagenes.appendChild(contenedorImagen)
        imagen.onload = e => rotarImg(e)
    }
    const imagenesFinal = contenedorImagenes.querySelectorAll('img')

    const contendorInput = nodo.querySelector('.contendorInput')

    if (imagenesFinal.length >= 4) {
        contendorInput.classList.add('d-none')
    } else {
        const contendorInput = nodo.querySelector('.contendorInput')
        const botonCargarImagenes = nodo.querySelector('.imagenesSoporte')
        botonCargarImagenes.textContent = `Selecione Max ${4 - imagenesFinal.length} Imagenes`
    }
    contendorInput.querySelector('input').value = ''
}

const cargarImagenFirma = (e, nodo) => {

    const files = e.target.files

    if (files.length === 0) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: 'Debe seleccionar Una firma'
        }

        return modalMensaje(mensaje)
    }

    if (files.length > 1) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: 'Solo se puede cargar una firma, se cargara la primera seleccionada'
        }

        return modalMensaje(mensaje)
    }

    const contenedorImagenes = nodo.querySelector('.imageneFirma')
    const imagenesCargadas = contenedorImagenes.querySelectorAll('img')

    const file = files[0]
    const extensiones = ['png', 'jpg', 'jpeg']
    if (extensiones.indexOf(mime.extension(file.type)) == -1 || file.size > 3145728) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: 'Solo se aceptan imagenes en formato png, jpg o jpeg y con tamaños de hasta 3Mb'
        }
        return modalMensaje(mensaje)
    }

    if (imagenesCargadas.length > 0) {
        contenedorImagenes.removeChild(contenedorImagenes.firstChild)
    }

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

    reader.readAsDataURL(file)

    const usuarios = nodo.querySelector('.editarUsuario')

    const contenedorBotones = document.createElement('div')
    contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')

    const iGuardar = document.createElement('i')
    iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-3', 'fw-bold', 'text-primary', 'p-0')
    const btnGuardar = document.createElement('button')
    btnGuardar.setAttribute('imagen', nombre)
    btnGuardar.classList.add('btn', 'text-center', 'm-1', 'p-0')
    btnGuardar.appendChild(iGuardar)
    btnGuardar.onclick = e => {
        e.preventDefault()
        cambiarFirmaUsuario(e, nodo)
    }
    contenedorBotones.appendChild(btnGuardar)
    contenedorImagen.appendChild(imagen)
    if (usuarios !== null) contenedorImagen.appendChild(contenedorBotones)
    contenedorImagenes.appendChild(contenedorImagen)


    const contendorInput = nodo.querySelector('.contendorInput')
    const boton = contendorInput.querySelector('button')
    boton.textContent = 'Cambiar La Firma del usuario'
}



export { cargarImagenGrid, cargarImagenGridReporte, cargarImagenFirma }