const { ipcRenderer } = require('electron')
import { generateRandomId } from '../../helpers/nombreRandon.js';
import { rotarImg } from '../../helpers/activos/rotarImg.js';
import { eliminarImgActivo } from '../../helpers/eliminarImg.js';
import { imprimirActivo } from '../../activos/ImprimirActivo.js';
import { solicitarMttoActivo } from '../../activos/solicitarMttoActivo.js';
import { guardarEditarActivo } from '../../activos/editarActivo.js';
import { imprimirListadoMtoActivo } from '../../activos/ImprimirListadoMtto.js';
import { agregarComponente } from '../../componentes/agregarLineaComponente.js';
import { eliminarActivo } from '../../activos/eliminarActivo.js';
import { eliminarComponente } from '../../componentes/eliminarComponente.js';
import { nuevaImagen } from '../../helpers/activos/cargarNuevaImagenCarrusel.js';
import { descargarDocumento } from '../../helpers/documentacion/descargardocumento.js';
import { cargarDocumento } from '../../helpers/documentacion/cargarDocumento.js';
import { opcionId } from '../../helpers/activos/listasId.js';
import { modalMensaje } from '../../helpers/modalEleccion.js';
import { cargarTapContenido } from '../cargarTapContenido.js';
import { listadoActivos } from './listadoActivos.js';
import { eliminarDocumento } from '../../helpers/documentacion/eliminardocumento.js';


const editarActivo = (id) => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = ` 
        <h2 class="text-center my-2 fw-bold border-bottom">CONSULTAR O EDITAR UN ACTIVO</h2>
        <h3 class="text-center my-1">Hoja de Vida de Activos</h3>
        <div class="container-fluid w-100 border border-1 border-dark m-2 dataActivo">
            <div class="container-fluid me-5 w-100 d-flex ">
                <div class=" ms-2">
                    <button type="button" class="btn mt-0 pt-0 d-none guardarEdicion" title="Guardar Datos">
                        <i class="bi bi-save2-fill fs-1 text-warning"></i>
                    </button>
                </div>
                <div class="ms-2">
                    <button type="button" class="btn  mt-0 pt-0 solicitar" title="Solicitar Mantenimiento">
                        <i class="bi bi-wrench-adjustable-circle-fill fs-1 text-secondary"></i>
                    </button>
                </div>
                <div class="ms-2r"> 
                    <button type="button" class="btn  mt-0 pt-0 print" title="Imprimir Hoja de vida">
                        <i class="bi bi-file-pdf-fill fs-1 text-primary"></i>
                    </button>
                </div>
                <div class="ms-auto">
                    <button type="button" class="btn  mt-0 pt-0  d-none cambiarClasificacion" title="Cambiar Clasificacion">
                        <i class="bi bi-sign-turn-right-fill fs-1 text-danger"></i>                    
                    </button>
                </div>
                <div class="mr-2">
                    <button type="button" class="btn  mt-0 pt-0 d-none eliminar" title="Eliminar Activo">
                        <i class="bi bi-trash-fill fs-1 text-danger"></i>                    
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
                    <div class="form-group col-3">

                        <label class="fw-bold" for="codigoInterno">Codigo Interno</label>
                        <input type="text" class="form-control my-1 fw-bold codigoInterno" readonly>

                        <label class="fw-bold" for="modeloActivo">Modelo</label>
                        <input type="text" class="form-control my-1 modeloActivo" readonly>

                        <label class="fw-bold" for="areaActivo">Area</label>
                        <input type="text" class="form-control my-1 areaActivo" list="listaAreas"
                            readonly>
                        <datalist id="listaAreas"></datalist>

                        <label class="fw-bold" for="registroInvimaActivo">Registro Invima</label>
                        <input type="text" class="form-control my-1 registroInvimaActivo" readonly>
                        

                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="nombreActivo">Nombre</label>
                        <input type="text" class="form-control my-1 nombreActivo" readonly>

                        <label class="fw-bold" for="serieActivo">Serie</label>
                        <input type="text" class="form-control my-1 serieActivo" readonly>

                        <label class="fw-bold" for="ubicacionActivo">Ubicacion Especifica</label>
                        <input type="text" class="form-control my-1 ubicacionActivo" readonly>

                        <label class="fw-bold" for="riesgoActivo">Clase de Riesgo</label>
                        <input type="text" class="form-control my-1 riesgoActivo" list="listaRiesgo"
                            readonly>
                        <datalist id="listaRiesgo"></datalist>

                    </div>
                    <div class="form-group col-3">
                        <label class="fw-bold" for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1 marcaActivo" list="listMarcas"
                            readonly>
                        <datalist id="listMarcas"></datalist>

                        <label class="fw-bold" for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1 procesoActivo" list="listProceso"
                            readonly>
                        <datalist id="listProceso"></datalist>

                        <label class="fw-bold" for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold estadoActivo"
                            list="listaEstado" readonly>
                        <datalist id="listaEstado"></datalist>
                    </div>
                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-5">
                        <label class="fw-bold" for="proveedorActivo">Provedor</label>
                        <input type="text" class="form-control my-1 proveedorActivo"
                            list="listaProveedores" readonly>
                        <datalist id="listaProveedores"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="nitProveedor">Nit Provedor</label>
                        <input type="text" class="form-control my-1 nitProveedor" readonly>
                    </div>

                    <div class="form-group col-3">
                        <label class="fw-bold" for="responsableActivo">Responsable del Activo</label>
                        <input type="text" class="form-control my-1 responsableActivo"
                            list="listaUsuario" readonly>
                        <datalist id="listaUsuario"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="tipoActivo">Tipo activo</label>
                        <input type="text" class="form-control my-1 tipoActivo" list="listaTipoActivo"
                            readonly>
                        <datalist id="listaTipoActivo"></datalist>
                    </div>

                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-2">
                        <label class="fw-bold" for="facturaActivo">N. Factura</label>
                        <input type="text" class="form-control my-1 facturaActivo" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="valorActivo">valor</label>
                        <input type="text" class="form-control my-1 valorActivo" readonly>
                    </div>

                    <div class="form-group col-2">
                        <label class="fw-bold" for="ingresoActivo">Fecha ingreso al Inv</label>
                        <input type="date" class="form-control my-1 ingresoActivo" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="fechaCompra">Fecha Compra</label>
                        <input type="date" class="form-control my-1 fechaCompra" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="garantiaActivo">Fin Garantia</label>
                        <input type="date" class="form-control my-1 garantiaActivo" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="frecuenciaMtto">Frecuencia de Mtto</label>
                        <input type="text" class="form-control my-1 frecuenciaMtto"
                            list="listaFrecuencia" readonly>
                        <datalist id="listaFrecuencia"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="proximoMtto">Fecha Proximo Mtto</label>
                        <input type="date" class="form-control my-1 proximoMtto" readonly>
                    </div>

                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-4">
                        <label class="fw-bold" for="descripcionActivo">Descripcion del Activo</label>
                        <textarea class="form-control m-1 descripcionActivo" rows="4"
                            readonly></textarea>
                    </div>
                    <div class="form-group col-4">
                        <label class="fw-bold" for="recomendacionActivo">Recomendaciones de
                            Mantenimiento</label>
                        <textarea class="form-control m-1 recomendacionActivo" rows="4"
                            readonly></textarea>
                    </div>
                    <div class="form-group col-4">
                        <label class="fw-bold" for="observacionActivo">Observaciones</label>
                        <textarea class="form-control m-1 observacionActivo" rows="4"
                            readonly></textarea>
                    </div>
                </div>
            </form>
        </div>
        <div class="container-fluid w-100 m-0 p-0 my-3 ContainerDocumentacion">
            <h3 class="fw-bold text-center my-2">DOCUMENTACION</h3>
            <div class="container-fluid d-flex  justify-content-around flex-wrap align-items-start w-100 m-0 p-0 my-3 documentacion">
                <div class="my-2 w-50 border border-2 Factura">
                    <h5 class="fw-bold text-center">Factura</h5>
                    <div class="d-none containerFactura pdfDocumentacion">
                        <embed class="w-100 p-2" style="height:255px" src="" type="application/pdf" />
                        <div class="d-block text-center containerBotonesFactura">
                            <button  class="btn p-0 eliminar" type="button" tipo="Factura" title="Eliminar">
                               <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button class="d-none btn p-0 guardar" type="button" tipo="Factura" title="Guardar">
                                <i class="bi bi-save2-fill fs-4 fw-bold text-success"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Factura" title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class=" d-none d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputFactura position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonfactura">Selecione
                                la Factura</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputFactura"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class="my-2 w-50 border border-2 Importacion">
                    <h5 class="fw-bold text-center">Registro de importacion</h5>
                    <div class="d-none containerImportacion pdfDocumentacion">
                        <embed class="w-100 p-2" style="height:255px" src="" type="application/pdf" />
                        <div class="d-block text-center containerBotonesImportacion">
                            <button class="btn p-0 eliminar" type="button" tipo="Importacion" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button class="d-none btn p-0 guardar" type="button" tipo="Importacion" title="Guardar">
                                <i class="bi bi-save2-fill fs-4 fw-bold text-success"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Importacion"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div
                        class="d-none d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputImportacion position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonImportacion">Selecione
                                el registro de Importacion</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputImportacion"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class=" my-2 w-50 border border-2 Invima">
                    <h5 class="fw-bold text-center">Registro INVIMA</h5>
                    <div class="d-none containerInvima pdfDocumentacion">
                        <embed class="w-100 p-2"style="height:255px" src="" type="application/pdf" />
                        <div class="d-block text-center containerBotonesInvima">
                            <button  class="btn p-0 eliminar" type="button" tipo="Invima" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button class="d-none btn p-0 guardar" type="button" tipo="Invima" title="Guardar">
                                <i class="bi bi-save2-fill fs-4 fw-bold text-success"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Invima"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-none d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputInvima position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonInvima">Selecione
                                el Registro INVIMA</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputInvima"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class=" my-2 w-50 border border-2 ActaEntrega">
                    <h5 class="fw-bold text-center">Acta de Entrega</h5>
                    <div class="d-none containerEntrega pdfDocumentacion">
                        <embed class="w-100 p-2" style="height:255px" src="" type="application/pdf" />
                        <div class="d-block text-center containerBotonesEntrega">
                            <button class="btn p-0 eliminar" type="button" tipo="ActaEntrega" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button class="d-none btn p-0 guardar" type="button" tipo="ActaEntrega" title="Guardar">
                                <i class="bi bi-save2-fill fs-4 fw-bold text-success"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="ActaEntrega"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div
                        class="d-none d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputEntrega position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonEntrega">Selecione
                                el Acta de Entrega</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputEntrega"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class=" my-2 w-50 border border-2 Manual">
                    <h5 class="fw-bold text-center">Manuales</h5>
                    <div class="d-none containerManual pdfDocumentacion">
                        <embed class="w-100 p-2" style="height:255px" src="" type="application/pdf" />
                        <div class="d-block text-center containerBotonesManual">
                            <button class="btn p-0 eliminar" type="button" tipo="Manual" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button  class="d-none btn p-0 guardar" type="button" tipo="Manual" title="Guardar">
                                <i class="bi bi-save2-fill fs-4 fw-bold text-success"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Manual"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-none d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputManual position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonManual">Selecione
                                el Manual</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputManual"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class="my-2 w-50 border border-2 Garantia">
                    <h5 class="fw-bold text-center">Garantia</h5>
                    <div class="d-none containerGarantia pdfDocumentacion">
                        <embed class="w-100 p-2" style="height:255px" src="" type="application/pdf" />
                        <div class="d-block text-center containerBotonesGarantia">
                            <button  class="btn p-0 eliminar" type="button" tipo="Garantia" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button  class="d-none btn p-0 guardar" type="button" tipo="Garantia" title="Guardar">
                                <i class="bi bi-save2-fill fs-4 fw-bold text-success"></i>
                            </button>
                            <button  class="btn p-0 descargar" type="button" tipo="Garantia"  title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class=" d-none d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
                        <div class="contendorInputGarantia position-relative">
                            <button type="button" class="btn btn-secondary fs-6 btn-lg h-25 buttonGarantia">Selecione
                                la Garantia</button>
                            <input class="opacity-0 w-100 position-absolute top-0 start-0 inputGarantia"
                                type="file" accept="application/pdf" style="box-sizing:content-box">
                        </div>
                    </div>
                </div>
                <div class=" my-2 w-50 border border-2 Otro">
                    <h5 class="fw-bold text-center">Otros</h5>
                    <div class="d-none containerOtros pdfDocumentacion">
                        <embed class="w-100 p-2" style="height:255px" src="" type="application/pdf" />
                        <div class="d-block text-center containerBotonesOtros">
                            <button class="btn p-0 eliminar" type="button" tipo="Otro" title="Eliminar">
                                <i class="bi bi-trash-fill fs-4 fw-bold text-danger"></i>
                            </button>
                            <button class="d-none btn p-0 guardar" type="button" tipo="Otro" title="Guardar">
                                <i class="bi bi-save2-fill fs-4 fw-bold text-success"></i>
                            </button>
                            <button class="btn p-0 descargar" type="button" tipo="Otro" title="Descargar">
                                <i class="bi bi-file-earmark-arrow-down-fill fs-4 fw-bold text-primary"></i>
                           </button>
                        </div>
                    </div>
                    <div class="d-none d-flex flex-column align-items-center justify-content-center m-3 containerSelecionar">
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
        <div class="container-fluid w-100 m-0 p-0 my-3 historialMantenimiento">
            <h2 class="text-center fw-bold">Historial de Mantenimientos</h2>
            <div class="p-1 d-flex flex-row-reverse">
                    <button type="button" class="btn imprimirlistadomtto" title="Imprimir Mantenimientos">
                        <i class="bi bi-printer-fill fs-2 text-primary"></i>
                    </button>
            </div>
            <table class="table W-100 table-striped table-hover table-sm table-responsive">
                <thead>
                    <tr class="text-uppercase text-center">
                        <th scope="col">id reporte</th>
                        <th scope="col">Fecha reporte</th>
                        <th scope="col">Hallazgos</th>
                        <th scope="col">Reporte tecnico</th>
                        <th scope="col">recomendaciones</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Proximo Mtto</th>
                        <th scope="col">Tipo Mtto</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    `

    const data = ipcRenderer.sendSync('consultarActivo', id)
    if (data.msg) {
        modalMensaje({ titulo: 'ERROR', mensaje: data.msg })
        return listadoActivos()
    }
    const activo = data.activo

    const form = seccion.querySelector('form')
    const codigoInterno = seccion.querySelector('.codigoInterno')
    const modeloActivo = seccion.querySelector('.modeloActivo')
    const areaActivo = seccion.querySelector('.areaActivo')
    const nombreActivo = seccion.querySelector('.nombreActivo')
    const serieActivo = seccion.querySelector('.serieActivo')
    const ubicacionActivo = seccion.querySelector('.ubicacionActivo')
    const marcaActivo = seccion.querySelector('.marcaActivo')
    const procesoActivo = seccion.querySelector('.procesoActivo')
    const estadoActivo = seccion.querySelector('.estadoActivo')
    const proveedorActivo = seccion.querySelector('.proveedorActivo')
    const nitProveedor = seccion.querySelector('.nitProveedor')
    const responsableActivo = seccion.querySelector('.responsableActivo')
    const tipoActivo = seccion.querySelector('.tipoActivo')
    const facturaActivo = seccion.querySelector('.facturaActivo')
    const valorActivo = seccion.querySelector('.valorActivo')
    const ingresoActivo = seccion.querySelector('.ingresoActivo')
    const fechaCompra = seccion.querySelector('.fechaCompra')
    const garantiaActivo = seccion.querySelector('.garantiaActivo')
    const frecuenciaMtto = seccion.querySelector('.frecuenciaMtto')
    const proximoMtto = seccion.querySelector('.proximoMtto')
    const descripcionActivo = seccion.querySelector('.descripcionActivo')
    const recomendacionActivo = seccion.querySelector('.recomendacionActivo')
    const observacionActivo = seccion.querySelector('.observacionActivo')
    const riesgoActivo = seccion.querySelector('.riesgoActivo')
    const registroInvimaActivo = form.querySelector('.registroInvimaActivo')
    const componentesbody = seccion.querySelector('.componentes').querySelector('tbody')
    const historialMantenimiento = seccion.querySelector('.historialMantenimiento').querySelector('tbody')
    const carruselimagenes = seccion.querySelector('.carousel-inner')
    const carruseldiv = seccion.querySelector('#carouselExampleControls')
    const carruselBotonSiguente = carruseldiv.querySelector('.carousel-control-next')
    const carruselBotonAnterior = carruseldiv.querySelector('.carousel-control-prev')
    const solicitarMantenimiento = seccion.querySelector('.solicitar')
    const imprimirHojadevida = seccion.querySelector('.print')
    const imprimirlistadomtto = seccion.querySelector('.imprimirlistadomtto')
    const agregarcomponentes = seccion.querySelector('.componentes').querySelector('.nuevoComponente')


    // cargamos los datos del activo
    codigoInterno.value = activo.codigo
    codigoInterno.setAttribute('codigo-activo', `Act-${activo.id}`)
    form.setAttribute('form-activo', `Act-${activo.id}`)
    modeloActivo.value = activo.modelo
    areaActivo.value = activo.area
    areaActivo.setAttribute('opcionId', `Ar-${activo.area_id}`)
    nombreActivo.value = activo.nombre
    serieActivo.value = activo.serie
    ubicacionActivo.value = activo.ubicacion
    marcaActivo.value = activo.marca
    marcaActivo.setAttribute('opcionId', `Ma-${activo.marca_id}`)
    procesoActivo.value = activo.proceso
    procesoActivo.setAttribute('opcionId', `Pr-${activo.proceso_id}`)
    estadoActivo.value = activo.estado
    estadoActivo.setAttribute('opcionId', `Es-${activo.estado_id}`)
    proveedorActivo.value = activo.provedor
    proveedorActivo.setAttribute('opcionId', `Pro-${activo.proveedor_id}`)
    nitProveedor.value = activo.nit
    responsableActivo.value = activo.responsable
    responsableActivo.setAttribute('opcionId', `Re-${activo.responsableId}`)
    tipoActivo.value = activo.tipoActivo
    tipoActivo.setAttribute('opcionId', `Ta-${activo.tipo_activo_id}`)
    facturaActivo.value = activo.numero_factura
    valorActivo.value = activo.valor
    ingresoActivo.value = activo.fecha_creacion
    fechaCompra.value = activo.fecha_compra
    garantiaActivo.value = activo.vencimiento_garantia
    frecuenciaMtto.value = activo.frecuencia
    frecuenciaMtto.setAttribute('opcionId', `Fr-${activo.frecuencia_id}`)
    proximoMtto.value = activo.fecha_proximo_mtto
    descripcionActivo.value = activo.descripcion
    recomendacionActivo.value = activo.recomendaciones_Mtto
    observacionActivo.value = activo.obervacion
    riesgoActivo.value = activo.riesgo
    riesgoActivo.setAttribute('opcionId', `Ris-${activo.riesgoId}`)
    registroInvimaActivo.value = activo.invima

    if (activo.editar) {
        const listados = ipcRenderer.sendSync('consultarListasCofigActivos')
        const idlista = generateRandomId()

        modeloActivo.removeAttribute('readonly')

        areaActivo.removeAttribute('readonly')
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

        nombreActivo.removeAttribute('readonly')
        serieActivo.removeAttribute('readonly')
        ubicacionActivo.removeAttribute('readonly')

        marcaActivo.removeAttribute('readonly')
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

        procesoActivo.removeAttribute('readonly')
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

        estadoActivo.removeAttribute('readonly')
        const listaEstado = seccion.querySelector('#listaEstado')
        listaEstado.id = `${listaEstado.id}${idlista}`
        estadoActivo.setAttribute('list', listaEstado.id)
        estadoActivo.onblur = e => opcionId(e)
        listados[6].forEach(element => {
            const option = document.createElement('option')
            option.value = element.estado
            option.textContent = element.id
            listaEstado.appendChild(option)
        })

        proveedorActivo.removeAttribute('readonly')
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

        responsableActivo.removeAttribute('readonly')
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

        tipoActivo.removeAttribute('readonly')
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

        facturaActivo.removeAttribute('readonly')
        valorActivo.removeAttribute('readonly')
        fechaCompra.removeAttribute('readonly')
        garantiaActivo.removeAttribute('readonly')

        frecuenciaMtto.removeAttribute('readonly')
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

        riesgoActivo.removeAttribute('readonly')
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

        proximoMtto.removeAttribute('readonly')
        descripcionActivo.removeAttribute('readonly')
        recomendacionActivo.removeAttribute('readonly')
        observacionActivo.removeAttribute('readonly')
        registroInvimaActivo.removeAttribute('readonly')
    }

    // configuramos el carrusel de imagenes
    const idCarrusel = generateRandomId()
    carruseldiv.id = idCarrusel
    carruselBotonSiguente.setAttribute('data-bs-target', `#${idCarrusel}`)
    carruselBotonAnterior.setAttribute('data-bs-target', `#${idCarrusel}`)

    carruselimagenes.setAttribute('activo', 'Act-' + activo.id)
    // cargamos las imagnes en el carrusel
    if (activo.url_img !== null && activo.url_img !== '') {
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
            const iEliminar = document.createElement('i')
            iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-1', 'fw-bold', 'text-danger')
            const btnEliminar = document.createElement('button')
            btnEliminar.setAttribute('activo', `Act-${activo.id}`)
            btnEliminar.title = 'Eliminar'
            btnEliminar.setAttribute('nombre', `Img-${activo.url_img[index]}`)
            btnEliminar.classList.add('btn', 'p-0')
            btnEliminar.type = 'button'
            btnEliminar.appendChild(iEliminar)
            divContainer.appendChild(imagen)
            divContainerBotones.appendChild(btnEliminar)
            divContainer.appendChild(divContainerBotones)
            itemCarrusel.appendChild(divContainer)
            carruselimagenes.appendChild(itemCarrusel)
            carruselimagenes.setAttribute('activo', `Act-${activo.id}`)
            imagen.onload = e => rotarImg(e)
            btnEliminar.onclick = e => eliminarImgActivo(e)
        })
    }
    // mostrar input de cargar imagenes en el activo
    if (activo.url_img.length >= 6) {
        const contendorImputImagenesActivo = seccion.querySelector('.contendorImputImagenesActivo')
        contendorImputImagenesActivo.classList.add('d-none')
    } else {
        const bottontImagenActivo = seccion.querySelector('.buttonImagenesActivo')
        const faltantes = 6 - activo.url_img.length
        bottontImagenActivo.textContent = `Selecione Max ${faltantes} Imagenes`
        const inputImagenActivo = seccion.querySelector('.inputImagenesActivo')
        inputImagenActivo.onchange = e => nuevaImagen(e)
    }

    // cargar y mostrar los documentos soportes
    if (activo.Buffersoportes) {
        const documentos = Object.keys(activo.Buffersoportes)
        if (documentos.length > 0) {
            documentos.forEach(documento => {
                const containerDocumento = seccion.querySelector(`.${documento}`)
                if (containerDocumento !== undefined) {
                    const embedpdf = containerDocumento.querySelector('embed')
                    const arrayBuffer = Uint8Array.from(atob(activo.Buffersoportes[`${documento}`].split(',')[1]), c => c.charCodeAt(0)).buffer;
                    const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
                    embedpdf.src = URL.createObjectURL(blob)
                    embedpdf.setAttribute('activo', `Act-${activo.id}`)
                    embedpdf.setAttribute('tipo', `${documento}`)
                    const containerpdf = containerDocumento.querySelector('.pdfDocumentacion')
                    containerpdf.classList.remove('d-none')
                    const botonEliminar = containerDocumento.querySelector('.eliminar')
                    botonEliminar.setAttribute('activo', `Act-${activo.id}`)
                    botonEliminar.setAttribute('tipo', `${documento}`)
                    botonEliminar.onclick = e => eliminarDocumento(e)
                    const botonDescargar = containerDocumento.querySelector('.descargar')
                    botonDescargar.setAttribute('activo', `Act-${activo.id}`)
                    botonDescargar.setAttribute('tipo', `${documento}`)
                    botonDescargar.onclick = e => descargarDocumento(e)
                }
            })
        }
    }

    //cargar los input de los que no tiene documentos
    const containersDocumentos = seccion.querySelectorAll('.d-none.pdfDocumentacion')
    for (const element of containersDocumentos) {
        const contenedorImput = element.nextSibling.nextSibling
        const inputdocumento = contenedorImput.querySelector('input')
        inputdocumento.onchange = (e) => cargarDocumento(e)
        inputdocumento.setAttribute('activo', `Act-${activo.id}`)
        contenedorImput.classList.remove('d-none')
    }

    // cargamos los componentes en la tabla componentes
    const componentes = data.componentes
    componentes.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const tdcomponente = document.createElement('td')
        const tdmarca = document.createElement('td')
        const tdmodelo = document.createElement('td')
        const tdSerie = document.createElement('td')
        const tdcapacidad = document.createElement('td')
        const tdAcciones = document.createElement('td')
        const btnEliminar = document.createElement('button')
        btnEliminar.title = 'Eliminar'
        const iEliminar = document.createElement('i')
        tr.id = `Com-${element.id}`
        tdId.textContent = element.id
        tdcomponente.textContent = element.nombre
        tdmarca.textContent = element.marca
        tdmodelo.textContent = element.modelo
        tdSerie.textContent = element.serie
        tdcapacidad.textContent = element.capacidad
        tr.appendChild(tdId)
        tr.appendChild(tdcomponente)
        tr.appendChild(tdmarca)
        tr.appendChild(tdmodelo)
        tr.appendChild(tdSerie)
        tr.appendChild(tdcapacidad)
        // botones de edicion de compnentes
        iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-5', 'eliminarcomponente')
        btnEliminar.classList.add('btn')
        btnEliminar.type = 'button'
        btnEliminar.setAttribute('componente', `Com-${element.id}`)
        btnEliminar.setAttribute('activo', `Act-${activo.id}`)
        btnEliminar.onclick = e => eliminarComponente(e)
        btnEliminar.appendChild(iEliminar)
        tdAcciones.appendChild(btnEliminar)
        tr.appendChild(tdAcciones)
        // creamos la fila en la tabla

        componentesbody.appendChild(tr)
    });

    // agregar un componente
    agregarcomponentes.setAttribute('activo', `Act-${activo.id}`)
    agregarcomponentes.onclick = e => agregarComponente(e)


    // cargamos los reportes en la tabla reportes
    const reportes = data.reportes
    reportes.forEach(element => {
        const tr = document.createElement('tr')

        const tdId = document.createElement('td')
        const tdFechaReporte = document.createElement('td')
        const tdHallazgos = document.createElement('td')
        const tdReporte = document.createElement('td')
        const tdRecomendaciones = document.createElement('td')
        const tdProveedor = document.createElement('td')
        const tdProximoMtto = document.createElement('td')
        const tdtipoMantenimeinto = document.createElement('td')
        tr.id = `Rep-${element.id}`
        tdId.textContent = element.id
        tdFechaReporte.textContent = element.fechareporte
        tdHallazgos.textContent = element.hallazgos
        tdReporte.textContent = element.reporte
        tdRecomendaciones.textContent = element.recomendaciones
        tdProveedor.textContent = element.proveedor
        tdProximoMtto.textContent = element.proximoMtto
        tdtipoMantenimeinto.textContent = element.tipoMantenimeinto
        tr.appendChild(tdId)
        tr.appendChild(tdFechaReporte)
        tr.appendChild(tdHallazgos)
        tr.appendChild(tdReporte)
        tr.appendChild(tdRecomendaciones)
        tr.appendChild(tdProveedor)
        tr.appendChild(tdProximoMtto)
        tr.appendChild(tdtipoMantenimeinto)
        historialMantenimiento.appendChild(tr)
    });
    imprimirlistadomtto.setAttribute('activo', `Act-${activo.id}`)
    imprimirlistadomtto.onclick = e => imprimirListadoMtoActivo(e)

    solicitarMantenimiento.setAttribute('activo', `Act-${activo.id}`)
    solicitarMantenimiento.onclick = e => solicitarMttoActivo(e)
    imprimirHojadevida.setAttribute('activo', `Act-${activo.id}`)
    imprimirHojadevida.onclick = e => imprimirActivo(e)

    const actualizarActivo = seccion.querySelector('.guardarEdicion')
    const eliminarActivob = seccion.querySelector('.eliminar')
    actualizarActivo.classList.remove('d-none')
    actualizarActivo.setAttribute('activo', `Act-${activo.id}`)
    actualizarActivo.onclick = e => guardarEditarActivo(e)
    eliminarActivob.classList.remove('d-none')
    eliminarActivob.setAttribute('activo', `Act-${activo.id}`)
    eliminarActivob.onclick = e => eliminarActivo(e)

    if (activo.cambiarClasificacion) {
        const cambiarClasificacion = seccion.querySelector('.cambiarClasificacion')
        cambiarClasificacion.classList.remove('d-none')
        cambiarClasificacion.onclick = e => {
            e.preventDefault()
            cargarTapContenido('cambiarClasificacion', activo.id)
        }
    }


    return seccion
}

export {
    editarActivo,
}
