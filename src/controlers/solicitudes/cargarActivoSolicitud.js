const { ipcRenderer } = require('electron')
import { rotarImg } from '../helpers/activos/rotarImg.js';

const cargarActivoSolicitud = async (id, nodo) => {
  
    const activo = ipcRenderer.sendSync('consultarDatosActivoSolicitud', id);
    const carruselimagenes = nodo.querySelector('.carousel-inner')
    while (carruselimagenes.firstChild) {
        carruselimagenes.removeChild(carruselimagenes.firstChild)
    }

    if (activo.url_img !== null) {
        activo.BufferImagenes.forEach((element, index) => {
            const itemCarrusel = document.createElement('div')
            itemCarrusel.setAttribute('nombre', `Img-${activo.url_img[index]}`)
            itemCarrusel.classList.add('carousel-item', `Img-${activo.url_img[index]}`)
            if (index == 0) itemCarrusel.classList.add('active')
            const divContainer = document.createElement('div')
            const divContainerBotones = document.createElement('div')
            divContainerBotones.classList.add('d-block')
            divContainer.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center')
            const imagen = document.createElement('img')
            imagen.classList.add('d-block', 'w-100')
            imagen.src = element
            divContainer.appendChild(imagen)
            divContainer.appendChild(divContainerBotones)
            itemCarrusel.appendChild(divContainer)
            carruselimagenes.appendChild(itemCarrusel)
            carruselimagenes.setAttribute('activo', `Act-${activo.id}`)
            imagen.onload = e => rotarImg(e)
        })
    }
    const codigoInterno = nodo.querySelector('.codigoInterno')
    const modeloActivo = nodo.querySelector('.modeloActivo')
    const areaActivo = nodo.querySelector('.areaActivo')
    const nombreActivo = nodo.querySelector('.nombreActivo')
    const serieActivo = nodo.querySelector('.serieActivo')
    const ubicacionActivo = nodo.querySelector('.ubicacionActivo')
    const estadoActivo = nodo.querySelector('.estadoActivo')
    const marcaActivo = nodo.querySelector('.marcaActivo')
    const procesoActivo = nodo.querySelector('.procesoActivo')
    const responsable = nodo.querySelector('.responsable')
    const idActivo = nodo.querySelector('.idActivo')
    const crear = nodo.querySelector('.crear')

    crear.setAttribute('opcionId', 'Act-' + activo.id)
    idActivo.value = 'Act-' + activo.id
    codigoInterno.value = activo.codigo
    modeloActivo.value = activo.modelo
    areaActivo.value = activo.area
    nombreActivo.value = activo.nombre
    serieActivo.value = activo.serie
    ubicacionActivo.value = activo.ubicacion
    estadoActivo.value = activo.estado
    marcaActivo.value = activo.marca
    procesoActivo.value = activo.proceso
    responsable.value = activo.responsable
}

export { cargarActivoSolicitud } 