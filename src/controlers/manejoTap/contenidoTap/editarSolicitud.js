const { ipcRenderer } = require('electron')
import { modalMensaje } from '../../helpers/modalEleccion.js';
import { rotarImg } from '../../helpers/activos/rotarImg.js';
import { eliminarImagenSolicitud } from '../../solicitudes/eliminarImagenSolicitud.js';
import { guardarEditarSolicitud } from '../../solicitudes/guardareditarSolicitud.js';
import { eliminarSolicitud } from '../../solicitudes/elimianrSolicitud.js';
import { cargarImagenGrid } from '../../helpers/cargaImagenGrid.js';
import { imprimirSolicitud } from '../../solicitudes/imprimirSolicitud.js';
import { cargarNuevaVista } from '../cargarTapContenido.js';
const editarSolicitud = (id) => {


    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
            <h3 class="text-center mt-1 fw-bold">CONSULTA O EDITA UNA SOLICITUD</h3>
            <div class="container-fluid w-100 d-flex mb-3 mt-3">
                <div class=" ms-2">
                    <button type="button" class="btn mt-0 pt-0 guardarEdicion d-none" title="Guardar Datos">
                        <i class="bi bi-save2-fill fs-1 text-warning"></i>
                    </button>
                </div>
                <div class="ms-2">
                    <button type="button" class="btn  mt-0 pt-0 elaborarReporte d-none" title="elaborarReporte">
                        <i class="bi bi-wrench-adjustable-circle-fill fs-1 text-secondary"></i>
                    </button>
                </div>
                <div class="ms-2r"> 
                    <button type="button" class="btn  mt-0 pt-0 print" title="Imprimir Hoja de vida">
                        <i class="bi bi-file-earmark-pdf-fill fs-1 text-primary"></i>
                    </button>
                </div>
                <div class="ms-auto">
                    <button type="button" class="btn  mt-0 pt-0 eliminar d-none" title="Eliminar Activo">
                        <i class="bi bi-trash-fill fs-1 text-danger"></i>                    
                    </button>
                </div>
            </div>
            <h4 class="text-center mt-1">Datos de Activo y Solicitud</h4>
            <div class="container-fluid w-100 m-0 p-0 mb-3 dataActivo">
                <form class="container-fluid w-100 position-relative">
                    <div class="row mx-3 align-items-center">
                        <div class="form-group col-4 p-4">
                            <div id="carouselExampleControls" class="carousel slide"
                                ata-bs-ride="carousel">
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
                        <div class="form-group col-2">
                            <label for="idActivo"> Id Activo</label>
                            <input type="text" class="form-control my-1 idActivo fw-bold" opcionId="Act--0">

                            <label for="codigoInterno">Codigo Interno</label>
                            <input type="text" class="form-control my-1  fw-bold codigoInterno" readonly>
                            
                            <label for="tipoActivo">Tipo activo</label>
                            <input type="text" class="form-control my-1 tipoActivo" id="" readonly>
                            
                            <label for="idSolicitud" class="fw-bold">ID solicitud</label>
                            <input type="text" class="form-control my-1 fw-bold idSolicitud" id="">
        

                        </div>
                        <div class="form-group col-3">

                            <label for="nombreActivo">Nombre</label>
                            <input type="text" class="form-control my-1 nombreActivo" id="" readonly>

                            <label for="serieActivo">Serie</label>
                            <input type="text" class="form-control my-1 serieActivo" id="" readonly>

                            <label for="ubicacionActivo">Ubicacion Especifica</label>
                            <input type="text" class="form-control my-1 ubicacionActivo" id="" readonly>

                            <label for="fechaSolicitud">Fecha de solicitud</label>
                            <input type="datetime" class="form-control my-1 fechaSolicitud" id="" readonly>

                            <label for="solicitante">Solicitante</label>
                            <input type="text" class="form-control my-1 solicitante" id="" readonly>

                            

                        </div>
                        <div class="form-group col-3">

                            <label for="marcaActivo">Marca</label>
                            <input type="text" class="form-control my-1 marcaActivo" id="" readonly>

                            <label for=" modeloActivo">Modelo</label>
                            <input type="text" class="form-control my-1 modeloActivo" id="" readonly>

                            <label for="estadoActivo">Estado</label>
                            <input type="text" class="form-control my-1 fw-bold estadoActivo" id="" readonly>

                            <label for="estadoSolicitud">Estado de la solicitud</label>
                            <input type="text" class="form-control my-1 fw-bold estadoSolicitud" id="" readonly>

                            <label for="imagenesSoporte" class="labelSeleccionarImagen d-none">Soporte Fotografico</label>
                            <div class="contendorInput position-relative d-none" >
                                <button type="button"
                                    class="btn btn-secondary fs-6 btn-lg h-25 imagenesSoporte">Seleccionar Max 4 Imagenes</button>
                                <input class="opacity-0 w-75 position-absolute top-0 start-0 inputImagenSoporte" type="file"
                                    accept="image/png, image/jpeg, image/jpg" style="box-sizing:content-box" multiple>
                            </div>

                        </div>
                    </div>
                    <!-- div para las imagenes -->
                    <div class="form-group row d-block">
                        <div class="d-flex flex-row align-items-center justify-content-center imagenesSolicitud"></div>
                    </div>

                    <div class="row m-2 align-items-center">
                        <div class="form-group col d-flex flex-column">
                            <label class="text-center fw-bold" for="descripcionSolicitud">DESCRIPCION DE
                                LA SOLICITUD O FALLO DEL EQUIPO</label>
                            <p class="m-0 caracteressolicitud">Maximo 1000 caracteres</p>
                            <textarea class="form-control descripcionSolicitud" rows="4" readonly ></textarea>
                        </div>
                    </div>
                    </div>
                </form>
            </div>        
    `
    const solicitud = ipcRenderer.sendSync('consultarSolicitud', id)
    if (solicitud.msg) return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudo consultar la solicitud' })

    const idActivo = seccion.querySelector('.idActivo')
    const codigoInterno = seccion.querySelector('.codigoInterno')
    const tipoActivo = seccion.querySelector('.tipoActivo')
    const idSolicitud = seccion.querySelector('.idSolicitud')
    const nombreActivo = seccion.querySelector('.nombreActivo')
    const serieActivo = seccion.querySelector('.serieActivo')
    const ubicacionActivo = seccion.querySelector('.ubicacionActivo')
    const fechaSolicitud = seccion.querySelector('.fechaSolicitud')
    const solicitante = seccion.querySelector('.solicitante')
    const marcaActivo = seccion.querySelector('.marcaActivo')
    const modeloActivo = seccion.querySelector('.modeloActivo')
    const estadoActivo = seccion.querySelector('.estadoActivo')
    const estadoSolicitud = seccion.querySelector('.estadoSolicitud')
    const descripcionSolicitud = seccion.querySelector('.descripcionSolicitud')
    const imprimir = seccion.querySelector('.print')

    idActivo.value = 'Act-' + solicitud.id_activo
    codigoInterno.value = solicitud.codigo
    tipoActivo.value = solicitud.tipoActivo
    idSolicitud.value = 'Sol-' + solicitud.id
    nombreActivo.value = solicitud.nombre
    serieActivo.value = solicitud.serie
    ubicacionActivo.value = solicitud.ubicacion
    fechaSolicitud.value = solicitud.fecha_solicitud
    solicitante.value = solicitud.usuario
    marcaActivo.value = solicitud.marca
    modeloActivo.value = solicitud.modelo
    estadoActivo.value = solicitud.estado
    estadoSolicitud.value = solicitud.estadoSolicitud
    descripcionSolicitud.value = solicitud.solicitud
    imprimir.setAttribute('solicitud', `Sol-${solicitud.id}`)
    imprimir.onclick = e => imprimirSolicitud(e, solicitud.id)

    const carruselimagenes = seccion.querySelector('.carousel-inner')

    solicitud.imagenesActivo.forEach((element, index) => {
        const itemCarrusel = document.createElement('div')
        itemCarrusel.setAttribute('nombre', `Img-${solicitud.imagenes_Activo[index]}`)
        itemCarrusel.classList.add('carousel-item', `Img-${solicitud.imagenes_Activo[index]}`)
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
        carruselimagenes.setAttribute('activo', 'Act-' + solicitud.id_activo)
        imagen.onload = e => rotarImg(e)
    })

    const contenedorImagenes = seccion.querySelector('.imagenesSolicitud')
    solicitud.imagenesSolicitud.forEach((element, index) => {
        const contenedorImagen = document.createElement('div')
        contenedorImagen.setAttribute('nombre', `Img-${solicitud.img_solicitud[index]}`)
        contenedorImagen.classList.add('w-25', 'm-2')
        const imagen = document.createElement('img')
        imagen.classList.add('img-thumbnail', solicitud.img_solicitud[index])
        imagen.src = element
        contenedorImagen.appendChild(imagen)

        if (!solicitud.editar) {

            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')

            const iEliminar = document.createElement('i')
            iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
            const btnEliminar = document.createElement('button')
            btnEliminar.setAttribute('imagen', solicitud.img_solicitud[index])
            btnEliminar.setAttribute('solicitud', `Sol-${solicitud.id}`)
            btnEliminar.classList.add('btn', 'text-center', 'm-1', 'p-0')
            btnEliminar.appendChild(iEliminar)
            btnEliminar.onclick = e => eliminarImagenSolicitud(e, seccion)
            contenedorBotones.appendChild(btnEliminar)
            contenedorImagen.appendChild(contenedorBotones)
        }
        contenedorImagenes.appendChild(contenedorImagen)

        if (!solicitud.editar) {
            const guardarEdicion = seccion.querySelector('.guardarEdicion')
            const crearReporte = seccion.querySelector('.elaborarReporte')
            const btneliminarSolicitud = seccion.querySelector('.eliminar')
            const labelImputImagen = seccion.querySelector('.labelSeleccionarImagen')
            const contenedorImput = seccion.querySelector('.contendorInput')
            const imagenesSoporte = contenedorImput.querySelector('.imagenesSoporte')
            const inputImagen = contenedorImput.querySelector('input')

            guardarEdicion.classList.remove('d-none')
            guardarEdicion.setAttribute('solicitud', `Sol-${solicitud.id}`)
            guardarEdicion.onclick = e => guardarEditarSolicitud(e, seccion)

            crearReporte.classList.remove('d-none')
            crearReporte.setAttribute('solicitud', `Sol-${solicitud.id}`)
            crearReporte.onclick = e => cargarNuevaVista('crearReporte', {solicitud:solicitud.id, tipo:'Sol'})

            btneliminarSolicitud.classList.remove('d-none')
            btneliminarSolicitud.setAttribute('solicitud', `Sol-${solicitud.id}`)
            btneliminarSolicitud.onclick = e => eliminarSolicitud(e, seccion)

            descripcionSolicitud.readOnly= false

            if(solicitud.imagenesSolicitud.length < 4){
                labelImputImagen.classList.remove('d-none')
                contenedorImput.classList.remove('d-none')
                imagenesSoporte.textContent = `Selecione ${4-solicitud.imagenesSolicitud.length} imagenes`
                inputImagen.onchange = e => cargarImagenGrid(e, seccion)
            }
        }
    })

    return seccion
}

export {
    editarSolicitud,
}
