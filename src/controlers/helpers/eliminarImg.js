const { ipcRenderer } = require('electron')
import { modalEleccion, modalMensaje } from "./modalEleccion.js"
const eliminarImgActivo = async e => {
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR IMAGEN DE ACTIVO', mensaje: 'Esta seguro de eliminar la imagen seleccionada, esta accion no se puede deshacer' })
    if (!eleccion) return

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const activo = boton.getAttribute('activo')
    const nombre = boton.getAttribute('nombre')
    const divImagen = boton.parentNode.parentNode
    const carruselItem = divImagen.parentNode
    const carruseInner = carruselItem.parentNode
    const formGorup1 = carruseInner.parentNode.parentNode
    const formGorup2 = formGorup1.nextSibling.nextSibling
    const codigo = formGorup2.querySelector('.codigoInterno').value
    const data = {
        activo,
        codigo,
        nombre
    }
    const eliminarImagen = ipcRenderer.sendSync('elimnarImagenActivo', data);
    // elimina la imagen del carusel activo y aumenta o muestra el contador de selecionar 
    if (eliminarImagen.msg) return modalMensaje({ titulo: 'error', mensaje: eliminarImagen.msg })
    carruseInner.removeChild(carruselItem)
    const itemsRestantes = carruseInner.querySelectorAll('.carousel-item')
    carruseInner.firstChild.classList.add('active')
    const cantidaditems = itemsRestantes.length
    if (cantidaditems < 6) {
        const bottonSeleccion = formGorup1.querySelector('.buttonImagenesActivo')
       bottonSeleccion.textContent = `Selecione Max ${6 - cantidaditems} Imagenes`
        const contendorImputImagenesActivo = formGorup1.querySelector('.contendorImputImagenesActivo')
        if (contendorImputImagenesActivo.classList.contains('d-none')) contendorImputImagenesActivo.classList.remove('d-none')
    }


    // buscamos si el activo esta en otra pestaña eliminamos la imagen y valoramos el contador de imagens
    const itemImagenes = document.querySelectorAll('.carousel-item')
    if (itemImagenes.length !== 0) {
        for (const item of itemImagenes) {
            if (item.classList.contains(nombre)) {
                item.parentNode.removeChild(item)
                item.parentNode.firstChild.classList.add('active')
                const itemsparend = item.parentNode.querySelectorAll('.carousel-item')
                const cantidad = itemsparend.length
                if (cantidad < 6) {
                    const itemcarruseInner = carruselItem.parentNode
                    const itemformGorup1 = itemcarruseInner.parentNode.parentNode
                    const itembottonSeleccion = itemformGorup1.querySelector('.buttonImagenesActivo')
                    itembottonSeleccion.textContent = `Selecione Max ${6 - cantidad} Imagenes`
                    const contendorImputImagenesActivo = itemformGorup1.querySelector('.contendorImputImagenesActivo')
                    if (contendorImputImagenesActivo.classList.contains('d-none')) contendorImputImagenesActivo.classList.remove('d-none')
                }

            }
        }
    }

    modalMensaje({ titulo: 'EXITO', mensaje: eliminarImagen.exito })

}


const eliminarImgCarrusel = e => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const carruselItem = boton.parentNode.parentNode.parentNode
    const carruselInner = carruselItem.parentNode
    carruselInner.removeChild(carruselItem)
    const carruselItemTodos = carruselInner.querySelectorAll('.carousel-item')
    const cantidad = carruselItemTodos.length
    if (cantidad !== 0) {
        carruselItemTodos[0].classList.add('active')

    }
    const filaGirImagenes = carruselInner.parentNode.parentNode
    const bottonSeleccion = filaGirImagenes.querySelector('.buttonImagenesActivo')
    bottonSeleccion.textContent = `Selecione Max ${6 - cantidad} Imagenes`
    const contendorImputImagenesActivo = filaGirImagenes.querySelector('.contendorImputImagenesActivo')
    if (contendorImputImagenesActivo.classList.contains('d-none')) contendorImputImagenesActivo.classList.remove('d-none')
}

export {
    eliminarImgActivo,
    eliminarImgCarrusel
}