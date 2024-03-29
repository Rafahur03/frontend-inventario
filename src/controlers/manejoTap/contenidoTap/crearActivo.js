const { ipcRenderer } = require('electron')
import { agregarComponente } from "../../componentes/agregarLineaComponente.js";
import { nuevaImagen } from "../../helpers/activos/cargarNuevaImagenCarrusel.js";
import { cargarDocumento } from "../../helpers/documentacion/cargarDocumento.js";
import { nuevoActivo } from "../../activos/crearActivo.js";
import { generateRandomId } from "../../helpers/nombreRandon.js";
import { opcionId } from "../../helpers/activos/listasId.js";
const crearActivo = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = ` 
        <h2 class="text-center my-2 fw-bold border-bottom">CREAR UN ACTIVO</h2>
        <h3 class="text-center my-1">Hoja de Vida de Activos</h3>
        <div class="container-fluid w-100 border border-1 border-dark m-2 dataActivo">
            <div class="container-fluid me-5 w-100 d-flex ">
                <div class=" ms-2">
                    <button type="button" class="btn mt-0 pt-0 crearActivo" title="Crear Activo">
                        <i class="bi bi-check-square-fill fs-1 text-success"></i>
                    </button>
                </div>
            </div>
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
                        <div class="d-flex flex-column align-items-center justify-content-center mt-3 contendorImputImagenesActivo">
                            <div class="contendorInput position-relative">
                                <button type="button title="Seleccionar Imagenes"
                                    class="btn btn-secondary fs-6 btn-lg h-25 buttonImagenesActivo">Selecione Max 6
                                    Imagenes</button>
                                <input class="opacity-0 w-100 position-absolute top-0 start-0 inputImagenesActivo"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style="box-sizing:content-box"
                                    multiple >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-2">

                        <label for="clasificacionActivo" class="fw-bold">Clasificacion
                        Activo <span class="m-0 p-0 text-danger"> *</span></label>
                        <input type="select" class="form-control my-1  fw-bold clasificacionActivo" list="listaClasificacion" opcionId="Cla--1">
                        <datalist id="listaClasificacion"></datalist>

                        <label class="fw-bold" for="modeloActivo">Modelo <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 modeloActivo">

                        <label class="fw-bold" for="areaActivo">Area <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 areaActivo" list="listaAreas" opcionId="Ar--1">
                        <datalist id="listaAreas"></datalist>

                        <label class="fw-bold" for="registroInvimaActivo">Registro Invima</label>
                        <input type="text" class="form-control my-1 registroInvimaActivo">

                    </div>
                    <div class="form-group col-3">
                        <label class="fw-bold" for="nombreActivo">Nombre <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 nombreActivo">

                        <label class="fw-bold" for="serieActivo">Serie <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 serieActivo">

                        <label class="fw-bold" for="ubicacionActivo">Ubicacion Especifica <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 ubicacionActivo">

                        <label class="fw-bold" for="riesgoActivo">Clase de Riesgo</label>
                        <input type="text" class="form-control my-1 riesgoActivo" list="listaRiesgo" opcionId="Ris--1">
                        <datalist id="listaRiesgo"></datalist>

                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="marcaActivo">Marca <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 marcaActivo" list="listMarcas" opcionId="Ma--1">
                        <datalist id="listMarcas"></datalist>

                        <label class="fw-bold" for="procesoActivo">Proceso <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 procesoActivo" list="listProceso"  opcionId="Pr--1">
                        <datalist id="listProceso"></datalist>

                        <label class="fw-bold" for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold estadoActivo" readonly value="Activo">

                    </div>
                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-5">
                        <label class="fw-bold" for="proveedorActivo">Provedor <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 proveedorActivo"
                            list="listaProveedores"  opcionId="Pro--1">
                        <datalist id="listaProveedores"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="nitProveedor">Nit Provedor</label>
                        <input type="text" class="form-control my-1 nitProveedor">
                    </div>

                    <div class="form-group col-3">
                        <label class="fw-bold" for="responsableActivo">Responsable del Activo <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 responsableActivo"
                            list="listaUsuario"  opcionId="Re--1">
                        <datalist id="listaUsuario"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="tipoActivo">Tipo activo <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 tipoActivo" list="listaTipoActivo"  opcionId="Ta--1">
                        <datalist id="listaTipoActivo"></datalist>
                    </div>

                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-2">
                        <label class="fw-bold" for="facturaActivo">N. Factura <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 facturaActivo">
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="valorActivo">valor <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 valorActivo">
                    </div>

                    <div class="form-group col-2">
                        <label class="fw-bold" for="ingresoActivo">Fecha ingreso al Inv</label>
                        <input type="date" class="form-control my-1 ingresoActivo" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="fechaCompra">Fecha Compra <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="date" class="form-control my-1 fechaCompra">
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="garantiaActivo">Fin Garantia <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="date" class="form-control my-1 garantiaActivo">
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="frecuenciaMtto">Frecuencia de Mtto <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 frecuenciaMtto"
                            list="listaFrecuencia"  opcionId="Fr--1">
                        <datalist id="listaFrecuencia"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="proximoMtto">Fecha Proximo Mtto <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="date" class="form-control my-1 proximoMtto">
                    </div>

                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-4">
                        <label class="fw-bold" for="descripcionActivo">Descripcion del Activo</label>
                        <textarea class="form-control m-1 descripcionActivo" rows="4"></textarea>
                    </div>
                    <div class="form-group col-4">
                        <label class="fw-bold" for="recomendacionActivo">Recomendaciones de
                            Mantenimiento</label>
                        <textarea class="form-control m-1 recomendacionActivo" rows="4"></textarea>
                    </div>
                    <div class="form-group col-4">
                        <label class="fw-bold" for="observacionActivo">Observaciones</label>
                        <textarea class="form-control m-1 observacionActivo" rows="4"></textarea>
                    </div>
                </div>
            </form>
        </div>
        <div class="container-fluid w-100 m-0 p-0 my-3 containerDocumentacion">
            <h3 class="fw-bold text-center my-2">DOCUMENTACION</h3>
            <div class="container-fluid d-flex  justify-content-around flex-wrap align-items-start w-100 m-0 p-0 my-3 documentacion">
                <div class="m-2 border border-2 Factura">
                    <h5 class="fw-bold text-center">Factura</h5>
                    <div class="d-none containerFactura pdfDocumentacion">
                        <embed src="" type="application/pdf" tipo="Factura"/>
                        <div class="d-block text-center containerBotonesFactura">
                            <button  class="btn p-0 eliminar" type="button" tipo="Factura" title="Eliminar">
                               <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Factura" title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputFactura position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonfactura">Selecione
                                la Factura</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputFactura"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class="m-2 border border-2 Importacion">
                    <h5 class="fw-bold text-center">Registro de importacion</h5>
                    <div class="d-none containerImportacion pdfDocumentacion">
                        <embed src="" type="application/pdf"  tipo="Importacion" />
                        <div class="d-block text-center containerBotonesImportacion">
                            <button class="btn p-0 eliminar" type="button" tipo="Importacion" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Importacion"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div
                        class="d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputImportacion position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonImportacion">Selecione
                                el registro de Importacion</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputImportacion"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class="m-2 border border-2 Invima">
                    <h5 class="fw-bold text-center">Registro INVIMA</h5>
                    <div class="d-none containerInvima pdfDocumentacion">
                        <embed src="" type="application/pdf" tipo="Invima" />
                        <div class="d-block text-center containerBotonesInvima">
                            <button  class="btn p-0 eliminar" type="button" tipo="Invima" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Invima"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputInvima position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonInvima">Selecione
                                el Registro INVIMA</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputInvima"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class="m-2 border border-2 ActaEntrega">
                    <h5 class="fw-bold text-center">Acta de Entrega</h5>
                    <div class="d-none containerEntrega pdfDocumentacion">
                        <embed src="" type="application/pdf" tipo="ActaEntrega" />
                        <div class="d-block text-center containerBotonesEntrega">
                            <button class="btn p-0 eliminar" type="button" tipo="ActaEntrega" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="ActaEntrega"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div
                        class="d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputEntrega position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonEntrega">Selecione
                                el Acta de Entrega</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputEntrega"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class="m-2 border border-2 Manual">
                    <h5 class="fw-bold text-center">Manuales</h5>
                    <div class="d-none containerManual pdfDocumentacion">
                        <embed src="" type="application/pdf" tipo="Manual"/>
                        <div class="d-block text-center containerBotonesManual">
                            <button class="btn p-0 eliminar" type="button" tipo="Manual" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Manual"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputManual position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonManual">Selecione
                                el Manual</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputManual"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class="m-2 border border-2 Garantia">
                    <h5 class="fw-bold text-center">Garantia</h5>
                    <div class="d-none containerGarantia pdfDocumentacion">
                        <embed src="" type="application/pdf"  tipo="Garantia"/>
                        <div class="d-block text-center containerBotonesGarantia">
                            <button  class="btn p-0 eliminar" type="button" tipo="Garantia" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Garantia"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputGarantia position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonGarantia">Selecione
                                la Garantia</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputGarantia"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class="m-2 border border-2 Otro">
                    <h5 class="fw-bold text-center">Otros</h5>
                    <div class="d-none containerOtros pdfDocumentacion">
                        <embed src="" type="application/pdf"  tipo="Otro" />
                        <div class="d-block text-center containerBotonesOtros">
                            <button class="btn p-0 eliminar" type="button" tipo="Otro" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button class="btn p-0 descargar" type="button" tipo="Otro" title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                           </button>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputOtros position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonOtros">Selecione
                                cualquer otro documento</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputOtros"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid w-100 m-0 p-0 my-3 componentes">
            <h3 class="fw-bold text-center my-2">COMPONENTES</h3>
            <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                <table class="table table-borderless table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">COMPONENTE</th>
                            <th scope="col">MARCA</th>
                            <th scope="col">MODELO</th>
                            <th scope="col">SERIE</th>
                            <th scope="col">CAPACIDAD</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div class="p-1 d-flex flex-row-reverse">
                    <button type="button" class="btn nuevoComponente" title="Agregar Componente">
                        <i class="bi bi-plus-square-fill fs-2"></i>
                    </button>
                </div>  
            </div>
        </div>
    `

    const inputImagenes = seccion.querySelector('.inputImagenesActivo')
    inputImagenes.onchange = e => nuevaImagen(e, 'crear')

    const seleccionarDocumento = seccion.querySelectorAll('.containerSelecionar')
    seleccionarDocumento.forEach(nodo => {
        const input = nodo.querySelector('input')
        input.onchange = (e) => cargarDocumento(e, 'crear')
    })

    const nuevoComponente = seccion.querySelector('.nuevoComponente')
    nuevoComponente.onclick = e => agregarComponente(e, 'crear')

    const guardarDatos = seccion.querySelector('.crearActivo')
    guardarDatos.onclick = e => nuevoActivo(seccion)

    const listados = ipcRenderer.sendSync('consultarListasCofigActivos')
    const idlista = generateRandomId()


    const clasificacionActivo = seccion.querySelector('.clasificacionActivo')
    const listaClasificacion = seccion.querySelector('#listaClasificacion')
    listaClasificacion.id = `${listaClasificacion.id}${idlista}`
    clasificacionActivo.setAttribute('list', listaClasificacion.id)
    clasificacionActivo.onblur = e => opcionId(e)
    listados[0].forEach(element => {
        const option = document.createElement('option')
        option.value = `${element.siglas} -- ${element.nombre}`
        option.textContent = element.id
        listaClasificacion.appendChild(option)
    })

    const areaActivo = seccion.querySelector('.areaActivo')
    const listaAreas = seccion.querySelector('#listaAreas')

    listaAreas.id = `${listaAreas.id}${idlista}`
    areaActivo.setAttribute('list', listaAreas.id)
    areaActivo.onblur = e => opcionId(e)
    listados[3].forEach(element => {
        const option = document.createElement('option')
        option.value = element.area
        option.textContent = element.id
        listaAreas.appendChild(option)
    })

    const marcaActivo = seccion.querySelector('.marcaActivo')
    const listaMarca = seccion.querySelector('#listMarcas')
    listaMarca.id = `${listaMarca.id}${idlista}`
    marcaActivo.setAttribute('list', listaMarca.id)
    marcaActivo.onblur = e => opcionId(e)
    listados[1].forEach(element => {
        const option = document.createElement('option')
        option.value = element.marca
        option.textContent = element.id
        listaMarca.appendChild(option)
    })

    const procesoActivo = seccion.querySelector('.procesoActivo')
    const listProceso = seccion.querySelector('#listProceso')
    listProceso.id = `${listProceso.id}${idlista}`
    procesoActivo.setAttribute('list', listProceso.id)
    procesoActivo.onblur = e => opcionId(e)
    listados[2].forEach(element => {
        const option = document.createElement('option')
        option.value = `${element.sigla} -- ${element.proceso}`
        option.textContent = element.id
        listProceso.appendChild(option)
    })

    const proveedorActivo = seccion.querySelector('.proveedorActivo')
    const listaProveedores = seccion.querySelector('#listaProveedores')
    listaProveedores.id = `${listaProveedores.id}${idlista}`
    proveedorActivo.setAttribute('list', listaProveedores.id)
    proveedorActivo.onblur = e => opcionId(e)
    listados[4].forEach(element => {
        const option = document.createElement('option')
        option.value = `${element.nombre_comercial} -- ${element.razon_social} -- ${element.nit}`
        option.textContent = element.id
        listaProveedores.appendChild(option)
    })

    const responsableActivo = seccion.querySelector('.responsableActivo')
    const listaUsuario = seccion.querySelector('#listaUsuario')
    listaUsuario.id = `${listaUsuario.id}${idlista}`
    responsableActivo.setAttribute('list', listaUsuario.id)
    responsableActivo.onblur = e => opcionId(e)
    listados[7].forEach(element => {
        const option = document.createElement('option')
        option.value = element.nombre
        option.textContent = element.id
        listaUsuario.appendChild(option)
    })

    const tipoActivo = seccion.querySelector('.tipoActivo')
    const listaTipoActivo = seccion.querySelector('#listaTipoActivo')
    listaTipoActivo.id = `${listaTipoActivo.id}${idlista}`
    tipoActivo.setAttribute('list', listaTipoActivo.id)
    tipoActivo.onblur = e => opcionId(e)
    listados[5].forEach(element => {
        const option = document.createElement('option')
        option.value = element.tipoActivo
        option.textContent = element.id
        listaTipoActivo.appendChild(option)
    })

    const frecuenciaMtto = seccion.querySelector('.frecuenciaMtto')
    const listaFrecuencia = seccion.querySelector('#listaFrecuencia')
    listaFrecuencia.id = `${listaFrecuencia.id}${idlista}`
    frecuenciaMtto.setAttribute('list', listaFrecuencia.id)
    frecuenciaMtto.onblur = e => opcionId(e)
    listados[8].forEach(element => {
        const option = document.createElement('option')
        option.value = `${element.dias} -- ${element.frecuencia}`
        option.textContent = element.id
        listaFrecuencia.appendChild(option)
    })

    const riesgoActivo = seccion.querySelector('.riesgoActivo')
    const listaRiesgo = seccion.querySelector('#listaRiesgo')
    listaRiesgo.id = `${listaRiesgo.id}${idlista}`
    riesgoActivo.setAttribute('list', listaRiesgo.id)
    riesgoActivo.onblur = e => opcionId(e)
    listados[11].forEach(element => {
        const option = document.createElement('option')
        option.value = `${element.riesgo}`
        option.textContent = element.id
        listaRiesgo.appendChild(option)
    })

    const ingreso = seccion.querySelector('.ingresoActivo')
    const timestamp = Date.now();
    const fechaActual = new Date(timestamp).toISOString().substring(0, 10)
    ingreso.value = fechaActual

    return seccion
}

export {
    crearActivo,
}
