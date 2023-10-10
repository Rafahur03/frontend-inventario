const { ipcRenderer } = require('electron')
import { rotarImg } from '../helpers/activos/rotarImg.js';
import { generateRandomId } from '../helpers/nombreRandon.js';
import { opcionId } from '../helpers/activos/listasId.js';
import { modalMensaje } from '../helpers/modalEleccion.js';

const cargarActivoReportePrev = async (id, nodo) => {

    const activo = ipcRenderer.sendSync('consultarDatosActivoReportePrev', id);
    if (activo.msg) return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudo cargar el activo, recargue e intente mas tarde.' })
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
    const tipoActivo = nodo.querySelector('.tipoActivo')
    const idActivo = nodo.querySelector('.idActivo')
    const fechaproximoMtto = nodo.querySelector('.fechaproximoMtto')
    const descripcionSolicitud = nodo.querySelector('.descripcionSolicitud')
    //const fechaReporte = document.querySelector('.fechaReporte')
    const crear = document.querySelector('.crearReporte')


    crear.setAttribute('activo', 'Act-' + activo.id)
    idActivo.value = 'Act-' + activo.id
    codigoInterno.value = activo.codigo
    modeloActivo.value = activo.modelo
    areaActivo.value = activo.area
    nombreActivo.value = activo.nombre
    serieActivo.value = activo.serie
    ubicacionActivo.value = activo.ubicacion
    estadoActivo.value = activo.estado
    estadoActivo.setAttribute('opcionId', 'Es-' + activo.estadoActivoId)
    marcaActivo.value = activo.marca
    procesoActivo.value = activo.proceso
    tipoActivo.value = activo.tipoActivo
    fechaproximoMtto.value = activo.proximoMto
    descripcionSolicitud.value = 'Mantenimiento Preventivo Act-' + activo.id
    // const fecha = new Date
    // fechaReporte.value = fecha.toJSON().slice(0, 10);


    const idlista = generateRandomId()

    const listEstadoActivo = nodo.querySelector('#listEstadoActivo')

    listEstadoActivo.id = `${listEstadoActivo.id}${idlista}`
    estadoActivo.setAttribute('list', listEstadoActivo.id)
    estadoActivo.onblur = e => opcionId(e)
    activo.listaEstados.forEach(element => {
        const option = document.createElement('option')
        option.value = element.estado
        option.textContent = element.id
        listEstadoActivo.appendChild(option)
    })

    const recibidoConforme = nodo.querySelector('.recibidoConforme')
    const listRecibidoConforme = nodo.querySelector('#listRecibidoConforme')

    listRecibidoConforme.id = `${listRecibidoConforme.id}${idlista}`
    recibidoConforme.setAttribute('list', listRecibidoConforme.id)
    recibidoConforme.onblur = e => opcionId(e)
    activo.listaUsuarios.forEach(element => {
        const option = document.createElement('option')
        option.value = element.usuario
        option.textContent = element.id
        listRecibidoConforme.appendChild(option)
    })


    const provedorMtto = nodo.querySelector('.provedorMtto')
    const listProvedorMtto = nodo.querySelector('#listProvedorMtto')

    listProvedorMtto.id = `${listProvedorMtto.id}${idlista}`
    provedorMtto.setAttribute('list', listProvedorMtto.id)
    provedorMtto.onblur = e => opcionId(e)
    activo.listaProveedores.forEach(element => {
        const option = document.createElement('option')
        option.value = element.razonSocial + '--' + element.nombre + '--' + element.nit
        option.textContent = element.id
        listProvedorMtto.appendChild(option)
    })

    const estadoSolicitud = nodo.querySelector('.estadoSolicitud')
    const listestadoSolicitud = nodo.querySelector('#listestadoSolicitud')
    listestadoSolicitud.id = `${listestadoSolicitud.id}${idlista}`
    estadoSolicitud.setAttribute('list', listestadoSolicitud.id)
    estadoSolicitud.onblur = e => opcionId(e)
    activo.listadoEstadosSolicitud.forEach(element => {
        const option = document.createElement('option')
        option.value = element.estadoSolicitud
        option.textContent = element.id
        listestadoSolicitud.appendChild(option)
    })

    const fechaReporte = nodo.querySelector('.fechaReporte')
    const hoy = new Date(Date.now())
    fechaReporte.value = hoy.toISOString().substring(0, 10)

}

export { cargarActivoReportePrev } 