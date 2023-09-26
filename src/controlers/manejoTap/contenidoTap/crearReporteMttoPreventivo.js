const { ipcRenderer } = require('electron')
import { modalMensaje } from "../../helpers/modalEleccion.js";
import { generateRandomId } from "../../helpers/nombreRandon.js";
import { opcionIdAct } from "../../helpers/activos/listasId.js";
import { cargarImagenGridReporte } from "../../helpers/cargaImagenGrid.js";
import { cargarReportePdf } from "../../reportes/cargarReportePdf.js";
import { cargarActivoReportePrev } from "../../reportes/cargarActivoReportePrev.js";
import { guardarReportePrev } from "../../reportes/guardarReportePrev.js";
const crearReporteMttoPreventivo = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
            <h3 class="text-center mt-1 fw-bold">CREAR REPORTE MANTENIMIENTO PREVENTIVO</h3>
            <div class="container-fluid w-100 d-flex ">
                <div class="p-2">
                    <button type="button" class="btn mt-0 pt-0 crearReporte" title="Crear Reporte">
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
                            <input type="text" class="form-control my-1 fw-bold idActivo" list="listActivo" opcionId="Act--0">
                            <datalist id="listActivo"></datalist>

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
                            <input type="date" class="form-control my-1 fechaproximoMtto" readonly>
                        </div>

                        </div>
                    </div>
                    <h3 class="text-center mt-1 fw-bold">Datos del Reporte</h3>
                    <div class="row mx-3 align-items-center">

                        <div class="form-group col-2">
                            <label for="fechaReporte">Fecha de reporte</label>
                            <input type="date" class="form-control my-1 fechaReporte" id="">
                        </div>

                        <div class="form-group col-2">
                            <label for="CostoMo">Costo Mano de obra</label>
                            <input type="number" class="form-control my-1 costoMo" min="0"
                                placeholder="1000,00">
                        </div>

                        <div class="form-group col-2">
                            <label for="costoMa">Costo materiales</label>
                            <input type="number" class="form-control my-1 costoMp" min="0"
                                placeholder="1000,00">
                        </div>

                        <div class="form-group col-3">
                            <label for="recibidoConforme">Recibido Conforme</label>
                            <input type="text" class="form-control my-1 recibidoConforme" id=""
                                list="listRecibidoConforme" opcionId="Re--1">
                            <datalist id="listRecibidoConforme"></datalist>
                        </div>

                        <div class="form-group col-3">
                            <label for="proximoMtto">Proximo Mtto</label>
                            <input type="date" class="form-control my-1 proximoMtto">
                        </div>

                    </div>
                        <div class="row mx-3 align-items-center">
                            <div class="form-group col-3">
                                <label for="fechaSolicitud">Fecha de solicitud</label>
                                <input type="date" class="form-control my-1 fechaSolicitud" id="">
                            </div>
                            <div class="form-group col-6">
                                <label for="ProvedorMtto">Proveedor Mtto</label>
                                <input type="text" class="form-control my-1 provedorMtto" id=""
                                    list="listProvedorMtto" opcionId="Pro--1">
                                <datalist id="listProvedorMtto"></datalist>
                            </div>    

                                <div class="form-group col-3 p-1">
                                <label for="estadoSolicitud">Estado Reporte</label>
                                <input type="text" class="form-control my-1 fw-bold estadoSolicitud" id=""
                                    list="listestadoSolicitud" opcionId="Ess--1">
                                <datalist id="listestadoSolicitud"></datalist>
                            </div>
                        </div>
                        

                        <div class="row m-3 align-items-center">
                            <div class="form-group col-6">
                                <label for="descripcionSolicitud">Descripcion solicitud</label>
                                <p class="m-0" id="caracteresReporte">Maximo 1000 caracteres</p>
                                <textarea class="form-control m-1 descripcionSolicitud" id="" rows="6" readonly="true"></textarea>
                            </div>

                            <div class="form-group col-6">
                                <label for="descripcionHallazgos">Descripcion Hallazgos</label>
                                <p class="m-0" id="caracteresHallazgos">Maximo 1000 caracteres</p>
                                <textarea class="form-control m-1 descripcionHallazgos" id=""
                                    rows="6"></textarea>
                            </div>

                        </div>

                        <div class="row m-3 align-items-center">

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
    const listado = ipcRenderer.sendSync('listadoActivo');
    if(listado.msg) return modalMensaje({ titulo:'ERROR', mensaje:'No se pudieron cargar los activos.'})
    
    const idlista = generateRandomId()
    const idActivo = seccion.querySelector('.idActivo')
    const listActivo = seccion.querySelector('#listActivo')
    const crear = seccion.querySelector('.crearReporte')
    listActivo.id = `${listActivo.id}${idlista}`
    idActivo.setAttribute('list', listActivo.id)
    listado.forEach(element => {
        const option = document.createElement('option')
        option.value = 'Act-' + element.id 
        option.textContent = element.codigoInterno +' ' + element.nombreActivo +' ' + element.ubicacion+ ' ' + element.nombreResponsable + ' ' + element.marca + ' ' + element.serie
        listActivo.appendChild(option)
    })

    idActivo.onblur = e => {
        const consultarActivo = opcionIdAct(e)
            if(!consultarActivo) {
                crear.setAttribute('opcionId', 'Act-00')
                return
            }

        const id = idActivo.getAttribute('opcionId')
        cargarActivoReportePrev(id, seccion)
    }

    idActivo.addEventListener('keydown', (e) => {
        // 3. Verificar si la tecla presionada es "Enter" (keyCode 13)
        if (e.keyCode === 13) {
            const consultarActivo = opcionIdAct(e)
            if(!consultarActivo) {
                crear.setAttribute('opcionId', 'Act-00')
                return
            }
            
            const   id = idActivo.getAttribute('opcionId')
            cargarActivoReportePrev(id, seccion)
        }
    })

    const inputImagenes = seccion.querySelector('.inputImagenSoporte')
    inputImagenes.onchange = e => cargarImagenGridReporte(e, seccion)

    const inputSoportePdf = seccion.querySelector('.inputPdfSoporte')
    inputSoportePdf.onchange = e => cargarReportePdf(e, seccion)

    crear.onclick = e => guardarReportePrev(e, seccion)
    
    return seccion
}

export {
    crearReporteMttoPreventivo,
}
