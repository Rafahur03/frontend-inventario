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
    const carruselItem = boton.parentNode.parentNode
    const carruseInner = carruselItem.parentNode.parentNode
    const formGorup1 = carruseInner.parentNode.parentNode
    const formGorup2 = formGorup1.nextSibling.nextSibling
    const codigo = formGorup2.querySelector('.codigoInterno').value

    const data = {
        activo,
        codigo,
        nombre
    }
    const eliminarImagen = ipcRenderer.sendSync('elimnarImagenActivo', data);
    if (eliminarImagen.msg) return modalMensaje({ titulo: 'error', mensaje: eliminarImagen.msg })
    carruseInner.removeChild(carruselItem)
    const itemImagenes = document.querySelectorAll('.carousel-item')
    if (itemImagenes.length !== 0) {
        for (const item of itemImagenes) {
            if (item.classList.contains(nombre)) {
                item.parentNode.removeChild(item)
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