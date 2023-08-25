const { ipcRenderer } = require('electron')
import { modalMensaje } from "../../helpers/modalEleccion.js";
import { rotarImg } from "../../helpers/activos/rotarImg.js";
import { generateRandomId } from "../../helpers/nombreRandon.js";
import { opcionId } from "../../helpers/activos/listasId.js";
import { cargarImagenGridReporte } from "../../helpers/cargaImagenGrid.js";
import { nuevoReporte } from "../../reportes/nuevoReporte.js";
import { cargarReportePdf } from "../../reportes/cargarReportePdf.js";

const crearReporte = id => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
            <h3 class="text-center mt-1 fw-bold">CREAR REPORTE</h3>
            <div class="container-fluid w-100 d-flex ">
                <div class="p-2">
                    <button type="button" class="btn mt-0 pt-0 crearReporte" title="Crear Solicitud">
                        <i class="bi bi-check-square-fill fs-1 text-success"></i>
                    </button>
                </div>
            </div>
            <h3 class="text-center mt-1 fw-bold">Datos del Activo</h3>
            <div class="container-fluid w-100 m-0 p-0 mb-3 dataActivo">
                <form class="container-fluid w-100 position-relative">
                    <div class="row mx-3 align-items-center">
                        <div class="form-group col-4 p-4">
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
                        <div class="form-group col-2">

                            <label for="idActivo"> Id Activo</label>
                            <input type="text" class="form-control my-1 fw-bold idActivo" opcionId="Act--0">

                            <label for="codigoInterno">Codigo interno</label>
                            <input type="text" class="form-control my-1  fw-bold codigoInterno">

                            <label for=" modeloActivo">Modelo</label>
                            <input type="text" class="form-control my-1 modeloActivo" id="" readonly>

                            <label for="areaActivo">Area</label>
                            <input type="text" class="form-control my-1 areaActivo" id="" readonly>

                        </div>
                        <div class="form-group col-3">

                            <label for="nombreActivo">Nombre</label>
                            <input type="text" class="form-control my-1 nombreActivo" id="" readonly>

                            <label for="serieActivo">Serie</label>
                            <input type="text" class="form-control my-1 serieActivo" id="" readonly>

                            <label for="ubicacionActivo">Ubicacion Especifica</label>
                            <input type="text" class="form-control my-1 ubicacionActivo" id="" readonly>

                            <label for="estadoActivo">Estado</label>
                            <input type="text" class="form-control my-1 fw-bold estadoActivo  fw-bold "
                                id="" list="listEstadoActivo" opcionId="Es--1">
                            <datalist id="listEstadoActivo"></datalist>

                        </div>
                        <div class="form-group col-3">

                            <label for="marcaActivo">Marca</label>
                            <input type="text" class="form-control my-1 marcaActivo" id="" readonly>

                            <label for="procesoActivo">Proceso</label>
                            <input type="text" class="form-control my-1 procesoActivo" id="" readonly>

                            <label for="tipoActivo">Tipo activo</label>
                            <input type="text" class="form-control my-1 tipoActivo" id="" readonly>

                            <label for="fechaproximoMtto">Fecha del proximo Mtto</label>
                            <input type="date" class="form-control my-1 fechaproximoMtto" >
                        </div>

                        </div>
                    </div>
                    <h3 class="text-center mt-1 fw-bold">Datos del Reporte</h3>
                    <div class="row mx-3 align-items-center">
                        <div class="form-group col-2">
                            <label for="idSolicitud">ID solicitud</label>
                            <input type="text" class="form-control my-1  fw-bold idSolicitud" id=""
                                list="listSolicitudes">
                            <datalist id="listSolicitudes"></datalist>
                        </div>

                        <div class="form-group col-2">
                            <label for="fechaSolicitud">Fecha de solicitud</label>
                            <input type="datetime" class="form-control my-1 fechaSolicitud" id="" readonly>
                        </div>

                        <div class="form-group col-2">
                            <label for="fechaReporte">Fecha de reporte</label>
                            <input type="date" class="form-control my-1 fechaReporte" id="">
                        </div>

                        <div class="form-group col-2">
                            <label for="tipoMantenimiento">Tipo de Mtto</label>
                            <input type="text" class="form-control my-1 tipoMantenimiento" id=""
                                list="listTipoMtto" opcionId="Tm--1">
                            <datalist id="listTipoMtto"></datalist>
                        </div>

                        <div class="form-group col-2">
                            <label for="CostoMo">Costo Mano de obra</label>
                            <input type="number" class="form-control my-1 costoMo" id=""
                                placeholder="1000,00">
                        </div>

                        <div class="form-group col-2">
                            <label for="costoMa">Costo materiales</label>
                            <input type="number" class="form-control my-1 costoMp" id=""
                                placeholder="1000,00">
                        </div>

                    </div>
                    <div class="row mx-3 align-items-center">
                        <div class="form-group col-4">
                            <label for="ProvedorMtto">Proveedor Mtto</label>
                            <input type="text" class="form-control my-1 provedorMtto" id=""
                                list="listProvedorMtto" opcionId="Pro--1">
                            <datalist id="listProvedorMtto"></datalist>
                        </div>

                        <div class="form-group col-3">
                            <label for="nitProveedor">NIT proveedor o</label>
                            <input type="text" class="form-control my-1 nitProveedor" readonly>
                        </div>

                        <div class="form-group col-3">
                            <label for="recibidoConforme">Recibido Conforme</label>
                            <input type="text" class="form-control my-1 recibidoConforme" id=""
                                list="listRecibidoConforme" opcionId="Re--1">
                            <datalist id="listRecibidoConforme"></datalist>
                        </div>

                        <div class="form-group col-2 p-1">
                            <label for="estadoSolicitud">Estado Solicitud</label>
                            <input type="text" class="form-control my-1 fw-bold estadoSolicitud" id=""
                                list="listestadoSolicitud" opcionId="Ess--1">
                            <datalist id="listestadoSolicitud"></datalist>
                        </div>

                        <div class="row m-3 align-items-center">
                            <div class="form-group col-6">
                                <label for="descripcionSolicitud">Descripcion solicitud</label>
                                <textarea class="form-control m-1 descripcionSolicitud" id="" rows="6"
                                    readonly></textarea>
                            </div>
                            <div class="form-group col-6">
                                <label for="descripcionHallazgos">Descripcion Hallazgos</label>
                                <p class="m-0" id="caracteresHallazgos">Maximo 1000 caracteres</p>
                                <textarea class="form-control m-1 descripcionHallazgos" id=""
                                    rows="6"></textarea>
                            </div>
                        </div>

                        <div class="row mx-3 align-items-center">
                            <div class="form-group col-6">
                                <label for="descripcionReporte">Descripcion de reporte</label>
                                <p class="m-0" id="caracteresReporte">Maximo 1000 caracteres</p>
                                <textarea class="form-control m-1 descripcionReporte" id=""
                                    rows="6"></textarea>
                            </div>
                            <div class="form-group col-6">
                                <label for="recomendaciones">Recomendaciones</label>
                                <p class="m-0" id="caracteresRecomendacion">Maximo 1000 caracteres</p>
                                <textarea class="form-control m-1 recomendaciones" id=""
                                    rows="6"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group w-50 mx-auto text-center d-block my-2">
                        <label for="imagenesSoporte" class="labelSeleccionarImagen">Soporte
                            Fotografico</label>
                        <div class="contendorInput position-relative">
                            <input
                                class="opacity-0 position-absolute top-0 start-25 z-2 w-50 inputImagenSoporte"
                                type="file" accept="image/png, image/jpeg, image/jpg"
                                style="box-sizing:content-box" multiple>
                            <button type="button"
                                class="btn btn-secondary position-relative fs-6 btn-lg imagenesSoporte">Seleccionar
                                Max 4 Imagenes</button>
                        </div>
                    </div>
                    <!-- aqui van las imagenes -->
                    <div class="form-group row d-block">
                        <div class="d-flex flex-row align-items-center justify-content-center imagenesReporte"></div>
                    </div>
                    <!-- aqui va el cargue del soporte -->
                    <div class="form-group w-50 mx-auto text-center d-block my-2">
                        <label for="pdfSoporte" class="labelSeleccionarSoportepdf">Documento externo soporte
                            de mantenimiento</label>
                        <div class="contendorInputpdf position-relative">
                            <input
                                class="opacity-0 position-absolute top-0 start-25 z-2 w-50 inputPdfSoporte"
                                type="file" accept="application/pdf">
                            <button type="button"
                                class="btn btn-secondary position-relative fs-6 btn-lg pdfSoporte">Seleccione
                                Un archivo en PDF</button>
                        </div>
                    </div>
                    <div class="form-group row d-block">
                        <div class="d-flex flex-row align-items-center justify-content-center contendorpdfReporte"></div>
                    </div>
                </form>
            </div>
    `

    const solicitud = ipcRenderer.sendSync('consultarSolicitudReporte', id)
    if (solicitud.msg) return modalMensaje({ titulo: 'ERROR', mensaje: solicitud.msg })
    
    const idActivo = seccion.querySelector('.idActivo')
    const codigoInterno = seccion.querySelector('.codigoInterno')
    const modeloActivo = seccion.querySelector('.modeloActivo')
    const areaActivo = seccion.querySelector('.areaActivo')
    const nombreActivo = seccion.querySelector('.nombreActivo')
    const serieActivo = seccion.querySelector('.serieActivo')
    const ubicacionActivo = seccion.querySelector('.ubicacionActivo')
    const estadoActivo = seccion.querySelector('.estadoActivo')
    const marcaActivo = seccion.querySelector('.marcaActivo')
    const procesoActivo = seccion.querySelector('.procesoActivo')
    const tipoActivo = seccion.querySelector('.tipoActivo')
    const idSolicitud = seccion.querySelector('.idSolicitud')
    const fechaSolicitud = seccion.querySelector('.fechaSolicitud')
    const tipoMantenimiento = seccion.querySelector('.tipoMantenimiento')
    const provedorMtto = seccion.querySelector('.provedorMtto')
    const recibidoConforme = seccion.querySelector('.recibidoConforme')
    const estadoSolicitud = seccion.querySelector('.estadoSolicitud')
    const fechaReporte = seccion.querySelector('.fechaReporte')
    const fechaproximoMtto = seccion.querySelector('.fechaproximoMtto')
    const descripcionSolicitud = seccion.querySelector('.descripcionSolicitud')

    idActivo.value = 'Act-' + solicitud.id_activo
    codigoInterno.value = solicitud.codigo
    modeloActivo.value = solicitud.modelo
    nombreActivo.value = solicitud.nombre
    serieActivo.value = solicitud.serie
    ubicacionActivo.value = solicitud.ubicacion
    estadoActivo.value = solicitud.estadoActivo
    estadoActivo.setAttribute('opcionId', `Es-${solicitud.idEstadoActivo}`)
    marcaActivo.value = solicitud.marca
    tipoActivo.value = solicitud.tipoActivo
    idSolicitud.value = 'Sol-' + solicitud.id
    fechaSolicitud.value = solicitud.fecha_solicitud
    estadoSolicitud.value = solicitud.estadoSolicitud
    estadoSolicitud.setAttribute('opcionId', `Ess-${solicitud.idEstadoSolicitud}`)
    descripcionSolicitud.value = solicitud.solicitud
    areaActivo.value = solicitud.area
    procesoActivo.value = solicitud.proceso
    const fecha = new Date
    
    fechaReporte.value = fecha.toJSON().slice(0, 10);
    fecha.setDate(fecha.getDate() + solicitud.dias)
    fechaproximoMtto.value = fecha.toJSON().slice(0, 10)


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

    const idlista = generateRandomId()

    const listEstadoActivo = seccion.querySelector('#listEstadoActivo')

    listEstadoActivo.id = `${listEstadoActivo.id}${idlista}`
    estadoActivo.setAttribute('list', listEstadoActivo.id)
    estadoActivo.onblur = e => opcionId(e)
    solicitud.listados[0].forEach(element => {
        const option = document.createElement('option')
        option.value = element.estado
        option.textContent = element.id
        listEstadoActivo.appendChild(option)
    })

    const listestadoSolicitud = seccion.querySelector('#listestadoSolicitud')

    listestadoSolicitud.id = `${listestadoSolicitud.id}${idlista}`
    estadoSolicitud.setAttribute('list', listestadoSolicitud.id)
    estadoSolicitud.onblur = e => opcionId(e)
    solicitud.listados[1].forEach(element => {
        const option = document.createElement('option')
        option.value = element.estado
        option.textContent = element.id
        listestadoSolicitud.appendChild(option)
    })

    const listTipoMtto = seccion.querySelector('#listTipoMtto')

    listTipoMtto.id = `${listTipoMtto.id}${idlista}`
    tipoMantenimiento.setAttribute('list', listTipoMtto.id)
    tipoMantenimiento.onblur = e => opcionId(e)
    solicitud.listados[2].forEach(element => {
        const option = document.createElement('option')
        option.value = element.tipoMantenimeinto
        option.textContent = element.id
        listTipoMtto.appendChild(option)
    })

    const listProvedorMtto = seccion.querySelector('#listProvedorMtto')

    listProvedorMtto.id = `${listProvedorMtto.id}${idlista}`
    provedorMtto.setAttribute('list', listProvedorMtto.id)
    provedorMtto.onblur = e => opcionId(e)
    solicitud.listados[3].forEach(element => {
        const option = document.createElement('option')
        option.value = element.razonSocial + '--' + element.nombre + '--' + element.nit
        option.textContent = element.id
        listProvedorMtto.appendChild(option)
    })

    const listRecibidoConforme = seccion.querySelector('#listRecibidoConforme')

    listRecibidoConforme.id = `${listRecibidoConforme.id}${idlista}`
    recibidoConforme.setAttribute('list', listRecibidoConforme.id)
    recibidoConforme.onblur = e => opcionId(e)
    solicitud.listados[4].forEach(element => {
        const option = document.createElement('option')
        option.value = element.usuario
        option.textContent = element.id
        listRecibidoConforme.appendChild(option)
    })

    const inputImagenes = seccion.querySelector('.inputImagenSoporte')
    inputImagenes.onchange = e => cargarImagenGridReporte(e, seccion)

    const inputSoportePdf = seccion.querySelector('.inputPdfSoporte')
    inputSoportePdf.onchange = e => cargarReportePdf(e, seccion)

    const crearReporte = seccion.querySelector('.crearReporte')
    crearReporte.setAttribute('Solicitud', `Sol-${solicitud.id}`)
    crearReporte.onclick = e => nuevoReporte(e, seccion)
    

    return seccion
}

export {
    crearReporte,
}
