const { ipcRenderer } = require('electron')
import { rotarImg } from '../../helpers/activos/rotarImg.js';
const editarReporte = () => {
    const id = 929
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center fw-bold">   CONSULTAR O EDITAR UN REPORTE</h3>
        <div class="container-fluid w-100 d-flex">
            <div class="p-2">
                 <button type="button" class="btn mt-0 pt-0 guardarEdicionReporte" title="Guardar Datos">
                <i class="bi bi-save2-fill fs-1 text-warning"></i></button>
            </div>

            <div class="p-2">
                <button type="button" class="btn  mt-0 pt-0 printReporte" title="Imprimir Reporte">
                    <i class="bi bi-file-earmark-pdf-fill fs-1 text-primary"></i>
                </button>
            </div>
            <div class="p-2 ms-auto">
                <button type="button" class="btn  mt-0 pt-0 eliminarReporte" title="Eliminar Activo">
                    <i class="bi bi-trash-fill fs-1 text-danger"></i>
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
                        <input type="text" class="form-control my-1 fw-bold idActivo" opcionId="Act--0" readonly>

                        <label for="codigoInterno">Codigo interno</label>
                        <input type="text" class="form-control my-1  fw-bold codigoInterno" readonly>

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
                        <input type="text" class="form-control my-1 fw-bold estadoActivo fw-bold "
                            id="" list="listEstadoActivo" opcionId="Es--1" readonly>
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
                        <input type="date" class="form-control my-1 fechaproximoMtto" readonly>
                    </div>

                    </div>
                </div>
                <h3 class="text-center mt-1 fw-bold">Datos del Reporte</h3>
                <div class="row mx-3 align-items-center">
                    <div class="form-group col-2">
                        <label for="idSolicitud">ID solicitud</label>
                        <input type="text" class="form-control my-1  fw-bold idSolicitud"
                            list="listSolicitudes" readonly>
                        <datalist id="listSolicitudes"></datalist>
                    </div>

                    <div class="form-group col-2">
                        <label for="fechaSolicitud">Fecha de solicitud</label>
                        <input type="datetime" class="form-control my-1 fechaSolicitud" id="" readonly>
                    </div>

                    <div class="form-group col-2">
                        <label for="fechaReporte">Fecha de reporte</label>
                        <input type="date" class="form-control my-1 fechaReporte" ireadonly">
                    </div>

                    <div class="form-group col-2">
                        <label for="tipoMantenimiento">Tipo de Mtto</label>
                        <input type="text" class="form-control my-1 tipoMantenimiento"
                            list="listTipoMtto" opcionId="Tm--1" readonly>
                        <datalist id="listTipoMtto"></datalist>
                    </div>

                    <div class="form-group col-2">
                        <label for="CostoMo">Costo Mano de obra</label>
                        <input type="number" class="form-control my-1 costoMo" min="0"
                            placeholder="1000,00" readonly>
                    </div>

                    <div class="form-group col-2">
                        <label for="costoMa">Costo materiales</label>
                        <input type="number" class="form-control my-1 costoMp"min="0"
                            placeholder="1000,00" readonly>
                    </div>

                </div>
                <div class="row mx-3 align-items-center">
                    <div class="form-group col-4">
                        <label for="ProvedorMtto">Proveedor Mtto</label>
                        <input type="text" class="form-control my-1 provedorMtto" id=""
                            list="listProvedorMtto" opcionId="Pro--1" readonly>
                        <datalist id="listProvedorMtto"></datalist>
                    </div>

                    <div class="form-group col-3">
                        <label for="usuarioReporte">Responsable del reporte</label>
                        <input type="text" class="form-control my-1 usuarioReporte" opcionId="Rer--1" readonly>
                    </div>

                    <div class="form-group col-3">
                        <label for="recibidoConforme">Recibido Conforme</label>
                        <input type="text" class="form-control my-1 recibidoConforme" id=""
                            list="listRecibidoConforme" opcionId="Re--1" readonly>
                        <datalist id="listRecibidoConforme"></datalist>
                    </div>

                    <div class="form-group col-2 p-1">
                        <label for="estadoSolicitud">Estado Solicitud</label>
                        <input type="text" class="form-control my-1 fw-bold estadoSolicitud" id=""
                            list="listestadoSolicitud" opcionId="Ess--1" readonly>
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
                                rows="6" readonly></textarea>
                        </div>
                    </div>

                    <div class="row mx-3 align-items-center">
                        <div class="form-group col-6">
                            <label for="descripcionReporte">Descripcion de reporte</label>
                            <p class="m-0" id="caracteresReporte">Maximo 1000 caracteres</p>
                            <textarea class="form-control m-1 descripcionReporte" id=""
                                rows="6" readonly></textarea>
                        </div>
                        <div class="form-group col-6">
                            <label for="recomendaciones">Recomendaciones</label>
                            <p class="m-0" id="caracteresRecomendacion">Maximo 1000 caracteres</p>
                            <textarea class="form-control m-1 recomendaciones" id=""
                                rows="6" readonly></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group w-50 mx-auto text-center d-block my-2">
                    <label for="imagenesSoporte" class="labelSeleccionarImagen">Soporte
                        Fotografico</label>
                    <div class="contendorInput position-relative d-none">
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
                    <div class="contendorInputpdf position-relative d-none">
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

    const reporte = ipcRenderer.sendSync('consultarReporte', id);
    if (reporte.msg) return modalMensaje({ titulo: 'ERROR', mensaje: reporte.msg })
    console.log(reporte)

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
    const hallazgos = seccion.querySelector('.descripcionHallazgos')
    const reporteTecnico = seccion.querySelector('.descripcionReporte')
    const recomendaciones = seccion.querySelector('.recomendaciones')
    const usuarioReporte = seccion.querySelector('.usuarioReporte')
    const costoMo = seccion.querySelector('.costoMo')
    const costoMp = seccion.querySelector('.costoMp')

    idActivo.value = 'Act-' + reporte.idActivo
    codigoInterno.value = reporte.codigo
    modeloActivo.value = reporte.modelo
    nombreActivo.value = reporte.nombre
    serieActivo.value = reporte.serie
    ubicacionActivo.value = reporte.ubicacion
    estadoActivo.value = reporte.estadoActivo
    estadoActivo.setAttribute('opcionId', `Es-${reporte.estadoActivoId}`)
    marcaActivo.value = reporte.marca
    tipoActivo.value = reporte.tipoActivo
    idSolicitud.value = 'Sol-' + reporte.idSolicitud
    fechaSolicitud.value = reporte.fechaSolicitud
    estadoSolicitud.value = reporte.estadoSolicitud
    estadoSolicitud.setAttribute('opcionId', `Ess-${reporte.estadoSolicitudId}`)
    descripcionSolicitud.value = reporte.solicitud
    areaActivo.value = reporte.area
    procesoActivo.value = reporte.proceso
    tipoMantenimiento.value = reporte.tipoMtto
    tipoMantenimiento.setAttribute('opcionId', `Tm-${reporte.tipoMttoId}`)
    provedorMtto.value = reporte.proveedor
    provedorMtto.setAttribute('opcionId', `Pro-${reporte.proveedorMttoId}`)
    recibidoConforme.value = reporte.usuarioRecibido
    recibidoConforme.setAttribute('opcionId', `Re-${reporte.recibidoConformeId}`)
    fechaReporte.value = reporte.fechaReporte
    fechaproximoMtto.value = reporte.proximoMtto
    hallazgos.value = reporte.hallazgos
    reporteTecnico.value = reporte.reporte
    recomendaciones.value = reporte.recomendaciones
    costoMo.value = reporte.costoMo
    costoMp.value = reporte.costoMp
    usuarioReporte.value = reporte.usuarioReporte
    usuarioReporte.setAttribute('opcionId', `Rer-${reporte.estadoActivoId}`)

    const carruselimagenes = seccion.querySelector('.carousel-inner')

    reporte.imagenesActivo.forEach((element, index) => {
        const itemCarrusel = document.createElement('div')
        itemCarrusel.setAttribute('nombre', `Img-${reporte.imgActivo[index]}`)
        itemCarrusel.classList.add('carousel-item', `Img-${reporte.imgActivo[index]}`)
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
        carruselimagenes.setAttribute('activo', 'Act-' + reporte.idActivo)
        imagen.onload = e => rotarImg(e)
    })

    if (reporte.imgReporte.length !== 0) {
        const contenedorImagenes = seccion.querySelector('.imagenesReporte')
        reporte.imagenesReporte.forEach((element, index) => {
            const contenedorImagen = document.createElement('div')
            contenedorImagen.setAttribute('nombre', `Img-${reporte.imgReporte[index]}`)
            contenedorImagen.classList.add('m-2', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'col-3')
            const imagen = document.createElement('img')
            imagen.classList.add('rounded', 'img-fluid', reporte.imgReporte[index])
            imagen.src = element
            contenedorImagen.appendChild(imagen)

            // recuerda solo si es editor

            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')

            const iEliminar = document.createElement('i')
            iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
            const btnEliminar = document.createElement('button')
            btnEliminar.setAttribute('imagen', reporte.imgReporte[index])
            btnEliminar.setAttribute('Reporte', `Rep-${reporte.idReporte}`)
            btnEliminar.classList.add('btn', 'text-center', 'm-1', 'p-0')
            btnEliminar.appendChild(iEliminar)
            btnEliminar.onclick = e => { console.lof('crear funcion para eliminar d ela bd') }
            contenedorBotones.appendChild(btnEliminar)
            contenedorImagen.appendChild(contenedorBotones)

            contenedorImagenes.appendChild(contenedorImagen)
        })

        if (reporte.soporte) {
            const contenedorReporte = seccion.querySelector('.contendorpdfReporte')
            const contenedorpdf = document.createElement('div')
            contenedorpdf.classList.add('m-2', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'col-3', 'embed-responsive')
            const iframepdf = document.createElement('iframe')
            iframepdf.classList.add('embed-responsive-item')
            iframepdf.src = reporte.soporte
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')
            const iEliminar = document.createElement('i')
            iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn', 'text-center', 'm-1', 'p-0')
            btnEliminar.appendChild(iEliminar)
            btnEliminar.onclick = e => { console.log('debes crear al funcion eliminardocumento') }
            const iDescargar = document.createElement('i')
            iDescargar.classList.add('bi', 'bi-file-earmark-pdf-fill', 'fs-3', 'fw-bold', 'text-success', 'p-0')
            const btnDescargar = document.createElement('button')
            btnDescargar.classList.add('btn', 'text-center', 'm-1', 'p-0')
            btnDescargar.appendChild(iDescargar)
            btnDescargar.onclick = e => { console.log('debes crear al funcion descargar') }

            contenedorBotones.appendChild(btnEliminar)
            contenedorBotones.appendChild(btnDescargar)
            contenedorpdf.appendChild(iframepdf)
            contenedorpdf.appendChild(contenedorBotones)
            contenedorReporte.appendChild(contenedorpdf)
        }

    }

    return seccion
}

export {
    editarReporte,
}
