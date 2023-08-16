const { ipcRenderer } = require('electron')
import { modalMensaje } from '../../helpers/modalEleccion.js';
import { opcionIdAct } from '../../helpers/activos/listasId.js';
import { generateRandomId } from '../../helpers/nombreRandon.js';
import { cargarActivoSolicitud } from '../../solicitudes/cargarActivoSolicitud.js';
import { guardarSolicitud } from '../../solicitudes/guardarSolicitud.js';
import { cargarImagenGrid } from '../../helpers/cargaImagenGrid.js';
const crearSolicitud = (id = null) => {
    
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">CREAR SOLICITUD</h3>
        <div class="container-fluid w-100 d-flex mx-1">
             <div class=" ms-2">
                <button type="button" class="btn mt-0 pt-0 crear" title="Crear Solicitud">
                    <i class="bi bi-check-square-fill fs-1 text-success"></i>
                </button>
            </div>
        </div>
        <h4 class="text-center mt-1">Datos de Activo</h4>
        <div class="container-fluid w-100 m-0 p-0 mb-3 dataActivo">
            <form class="w-100 position-relative">
                <div class="row mx-3 align-items-center ">
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
                        <input type="text" class="form-control my-1 idActivo" list="listActivos" opcionId="Act--0">
                        <datalist id="listActivos"></datalist>

                        <label for="codigoInterno">Codigo Interno</label>
                        <input type="text" class="form-control my-1  fw-bold codigoInterno" readonly>

                        <label for="modeloActivo">Modelo</label>
                        <input type="text" class="form-control my-1 modeloActivo" readonly>

                        <label for="areaActivo">Area</label>
                        <input type="text" class="form-control my-1 areaActivo" readonly>

                    </div>
                    <div class="form-group col-3">
                        <label for="nombreActivo">Nombre</label>
                        <input type="text" class="form-control my-1 nombreActivo" readonly>

                        <label for="serieActivo">Serie</label>
                        <input type="text" class="form-control my-1 serieActivo" readonly>

                        <label for="ubicacionActivo">Ubicacion Especifica</label>
                        <input type="text" class="form-control my-1 ubicacionActivo" readonly>

                        <label for="estadoctivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold estadoActivo" readonly>

                    </div>
                    <div class="form-group col-3">

                        <label for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1 marcaActivo" readonly>

                        <label for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1 procesoActivo" readonly>

                        <label for="responsable">Responsable</label>
                        <input type="text" class="form-control my-1 responsable" readonly>

                        <label for="imagenesSoporte" class="labelSeleccionarImagen">Soporte Fotografico</label>
                        <div class="contendorInput position-relative" >
                            <button type="button"
                                class="btn btn-secondary fs-6 btn-lg h-25 imagenesSoporte">Seleccionar Max 4 Imagenes</button>
                            <input class="opacity-0 w-75 position-absolute top-0 start-0 inputImagenSoporte" type="file"
                                accept="image/png, image/jpeg, image/jpg" style="box-sizing:content-box" multiple>
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
                            <textarea class="form-control descripcionSolicitud" rows="4" ></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </div>    
    `
    const idActivo = seccion.querySelector('.idActivo')
    const listaActivos = seccion.querySelector('#listActivos')
    const crear = seccion.querySelector('.crear')
    const inputImagenes = seccion.querySelector('.inputImagenSoporte')
    
    const idlista = generateRandomId()
    listaActivos.id = `${listaActivos.id}${idlista}`
    idActivo.setAttribute('list', listaActivos.id)
    idActivo.onblur = e => {
        const consultarActivo = opcionIdAct(e)
            if(!consultarActivo) {
                crear.setAttribute('opcionId', 'Act-00')
                return
            }
        const id = idActivo.getAttribute('opcionId')
        cargarActivoSolicitud(id, seccion)
    }
    idActivo.addEventListener('keydown', (e) => {
        // 3. Verificar si la tecla presionada es "Enter" (keyCode 13)
        if (e.keyCode === 13) {
            const consultarActivo = opcionIdAct(e)
            if(!consultarActivo) {
                crear.setAttribute('opcionId', 'Act-00')
                return
            }
            const id = idActivo.getAttribute('opcionId')
            cargarActivoSolicitud(id, seccion)
        }
    })
    const listado = ipcRenderer.sendSync('listadoActivo');
    if (listado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: listado.msg })
    listado.forEach(element => {
        const option = document.createElement('option')
        option.value = `Act-${element.id}`
        option.textContent = element.codigoInterno + ' - ' + element.nombreActivo + ' - ' + element.marca + ' - ' + element.modelo + ' - ' + element.serie + '-  ' + element.ubicacion + ' - ' + element.nombreResponsable
        listaActivos.appendChild(option)
    });

    if (id !== null) {   
        idActivo.setAttribute('opcionId', id)
        cargarActivoSolicitud(id, seccion)
    }
    crear.onclick = e => guardarSolicitud(e, seccion)
    inputImagenes.onchange = e => cargarImagenGrid(e, seccion)
    return seccion
}

export {
    crearSolicitud,
}

