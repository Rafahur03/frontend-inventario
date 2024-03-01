const { ipcRenderer } = require('electron')
import { modalMensaje, modalEleccion } from "../helpers/modalEleccion.js"
import { nuevaImagenInsumo } from "../helpers/insumos/nuevaImagenInsumo.js"

const EliminarImagenInsumo = async e => {
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR IMAGEN DE INSUMO', mensaje: 'Esta seguro de eliminar la imagen seleccionada, esta accion no se puede deshacer' })
    if (!eleccion) return

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const insumo = boton.getAttribute('insumo')
    const nombre = boton.getAttribute('nombre')
    const divImagen = boton.parentNode.parentNode
    const carruselItem = divImagen.parentNode
    const carruseInner = carruselItem.parentNode

    const data = {
        insumo,
        nombre
    }
    const eliminarImagen = ipcRenderer.sendSync('elimnarImagenInsumo', data);
    // elimina la imagen del carusel activo y aumenta o muestra el contador de selecionar 
    if (eliminarImagen.msg) return modalMensaje({ titulo: 'error', mensaje: eliminarImagen.msg })
    while (carruseInner.firstChild) {
        carruseInner.removeChild(carruseInner.firstChild);
    }
    
    const padreCarruseInner = carruseInner.parentNode.parentNode
    const divInputImagen = padreCarruseInner.querySelector('.contendorInputImagenesinsumo')
    divInputImagen.classList.remove('d-none')  
    const inputImagenInsumo = divInputImagen.querySelector('input')
    inputImagenInsumo.onchange = e => nuevaImagenInsumo(e)

    modalMensaje({ titulo: 'EXITO', mensaje: eliminarImagen.exito })
 
}

export {EliminarImagenInsumo}