const { ipcRenderer } = require('electron')
import { modalMensaje } from '../../helpers/modalEleccion.js';
import { rotarImg } from '../../helpers/activos/rotarImg.js';
import { generateRandomId } from '../../helpers/nombreRandon.js';
import { opcionId } from '../../helpers/activos/listasId.js';
import { cargarTapContenido } from '../cargarTapContenido.js';
import { editarActivo } from './editarActivo.js';

const cambiarClasificacion = id => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h1 class="text-center mt-1 fw-bold">CAMBIAR CLASIFICACION</h1>
        <div class="container-fluid ms-5 w-100 d-flex ">
            <div class=" ms-2">
                <button type="button" class="btn mt-0 pt-0 guardarEdicion" title="Guardar Datos">
                    <i class="bi bi-save2-fill fs-1 text-warning"></i>
                </button>
            </div>
        </div>
        <div class="container-fluid w-100 border border-1 border-dark m-2 py-3 cambiarClasificacion">
            <h3 class="text-center mt-1">Datos del Activo</h3>
            <form class="w-100">
                <div class="row mx-1 align-items-center">
                    <div class="form-group col-4">
                        <div id="carouselExampleControls" class="carousel slide"
                            data-bs-ride="carousel">
                            <div class="carousel-inner"></div>
                            <button class="carousel-control-prev" type="button" title="Previo"
                                data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" title="Siguiente"
                                data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div class="form-group col-3">
                        <label for="clasificacionActivo">Nueva ClasificacionActivo</label>
                        <input type="select" class="form-control my-1  fw-bold clasificacionActivo"  list="listClasificacionActivo" opcionId = "Sig--1">
                        <datalist id="listClasificacionActivo"></datalist>

                        <label for="codigoActivo">Codigo Interno</label>
                        <input type="text" class="form-control my-1 codigoActivo"  readonly>

                        <label for="modeloActivo">Modelo</label>
                        <input type="text" class="form-control my-1 modeloActivo"  readonly>

                        <label for="areaActivo">Area</label>
                        <input type="text" class="form-control my-1 areaActivo" ireadonly>

                    </div>
                    <div class="form-group col-3">
                        <label for="nombreActivo">Nombre</label>
                        <input type="text" class="form-control my-1 nombreActivo" readonly>

                        <label for="serieActivo">Serie</label>
                        <input type="text" class="form-control my-1 serieActivo"  readonly>

                        <label for="ubicacionActivo">Ubicacion Especifica</label>
                        <input type="text" class="form-control my-1 ubicacionActivo"  readonly>

                        <label for="responsableActivo">Responsable del Activo</label>
                        <input type="text" class="form-control my-1 responsableActivo" readonly>

                    </div>
                    <div class="form-group col-2">
                        <label for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1 marcaActivo readonly>

                        <label for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1 procesoActivo "  readonly>

                        <label for="tipoActivo">Tipo activo</label>
                        <input type="text" class="form-control my-1 tipoActivo"readonly>

                        <label for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold estadoActivo"  readonly>

                    </div>
                </div>
            </form>
        </div>
    `
    const activo = ipcRenderer.sendSync('consultarActivoCambiarClasificacion', id)

    if (activo.msg) {
        modalMensaje({ titulo: 'ERROR', mensaje: activo.msg })
        return editarActivo(id)
    }

    const codigoActivo = seccion.querySelector('.codigoActivo')
    const modeloActivo = seccion.querySelector('.modeloActivo')
    const areaActivo = seccion.querySelector('.areaActivo')
    const nombreActivo = seccion.querySelector('.nombreActivo')
    const serieActivo = seccion.querySelector('.serieActivo')
    const ubicacionActivo = seccion.querySelector('.ubicacionActivo')
    const responsableActivo = seccion.querySelector('.responsableActivo')
    const marcaActivo = seccion.querySelector('.marcaActivo')
    const procesoActivo = seccion.querySelector('.procesoActivo')
    const tipoActivo = seccion.querySelector('.tipoActivo')
    const estadoActivo = seccion.querySelector('.estadoActivo')
    const guardarEdicion = seccion.querySelector('.guardarEdicion')

    codigoActivo.value = activo.codigo
    modeloActivo.value = activo.modelo
    areaActivo.value = activo.area
    nombreActivo.value = activo.nombre
    serieActivo.value = activo.serie
    ubicacionActivo.value = activo.ubicacion
    responsableActivo.value = activo.usuario
    marcaActivo.value = activo.marca
    procesoActivo.value = activo.proceso
    tipoActivo.value = activo.tipoActivo
    estadoActivo.value = activo.estado

    const carruselimagenes = seccion.querySelector('.carousel-inner')
    const carruseldiv = seccion.querySelector('#carouselExampleControls')
    const carruselBotonSiguente = carruseldiv.querySelector('.carousel-control-next')
    const carruselBotonAnterior = carruseldiv.querySelector('.carousel-control-prev')
    const randonid = generateRandomId()
    carruseldiv.id = randonid
    carruselBotonSiguente.setAttribute('data-bs-target', `#${randonid}`)
    carruselBotonAnterior.setAttribute('data-bs-target', `#${randonid}`)

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
        itemCarrusel.appendChild(divContainer)
        carruselimagenes.appendChild(itemCarrusel)
        imagen.onload = e => rotarImg(e)
    })

    const clasificacionActivo = seccion.querySelector('.clasificacionActivo')
    const listClasificacionActivo = seccion.querySelector('#listClasificacionActivo')
    listClasificacionActivo.id = `${listClasificacionActivo.id}${randonid}`
    clasificacionActivo.setAttribute('list', listClasificacionActivo.id)
    clasificacionActivo.onblur = e => opcionId(e)
    activo.listaCladificacion.forEach(element => {
        const option = document.createElement('option')
        option.value = element.clasificacion
        option.textContent = element.id
        listClasificacionActivo.appendChild(option)
    })
    guardarEdicion.onclick = () => {
        const clasificacion = clasificacionActivo.getAttribute('opcionId')
        if (clasificacion === 'Sig--1') return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escojer una nueva clasificacion del listado' })

        const data = {
            id,
            codigo: activo.codigo,
            siglas: clasificacionActivo.getAttribute('opcionId')
        }

        const cambiar = ipcRenderer.sendSync('CambiarClasificacion', data)
        if (cambiar.msg) return modalMensaje({ titulo: 'ERROR', mensaje: cambiar.msg })
        modalMensaje({ titulo: 'EXITO', mensaje: cambiar.exito })
        cargarTapContenido('editarActivo', cambiar.id)

    }

    return seccion
}

export {
    cambiarClasificacion,
}
