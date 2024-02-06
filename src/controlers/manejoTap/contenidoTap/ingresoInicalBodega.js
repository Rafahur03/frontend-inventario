const { ipcRenderer } = require('electron')
import { nuevaImagen } from "../../helpers/activos/cargarNuevaImagenCarrusel.js";
import { generateRandomId } from "../../helpers/nombreRandon.js";
import { opcionId } from "../../helpers/activos/listasId.js";
const ingresoInicalBodega = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = ` 
        <h2 class="text-center my-2 fw-bold border-bottom">INGRESO DE INSUMOS A BODEGA</h2>
        <h3 class="text-center my-1">Ingreso de insumo</h3>
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
                        <div class="imagenInsumo">
                           
                        </div>
                        <div class="d-flex flex-column align-items-center justify-content-center mt-3 contendorImputImagenesActivo">
                            <div class="contendorInput position-relative">
                                <button type="button title="Selecione una Imagen"
                                    class="btn btn-secondary fs-6 btn-lg h-25 buttonImagenesActivo">Selecione una Imagen</button>
                                <input class="opacity-0 w-100 position-absolute top-0 start-0 inputImagenesActivo"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style="box-sizing:content-box"
                                    >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-3">
                        <label for="insumo" class="fw-bold">Insumo<span class="m-0 p-0 text-danger"> *</span></label>
                        <input type="select" class="form-control my-1  fw-bold insumo" list="listainsumos" opcionId="Ins--1">
                        <datalist id="listainsumos"></datalist>

                        <label class="fw-bold" for="modeloActivo">Modelo <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 modeloActivo">

                        <label class="fw-bold" for="areaActivo">Area <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 areaActivo" list="listaAreas" opcionId="Ar--1">
                        <datalist id="listaAreas"></datalist>

                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="marcaActivo">Marca <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 marcaActivo" list="listMarcas" opcionId="Ma--1">
                        <datalist id="listMarcas"></datalist>
                    
                        <label class="fw-bold" for="serieActivo">Serie <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 serieActivo">

                        <label class="fw-bold" for="ubicacionActivo">Cantidad Especifica <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 ubicacionActivo">
                  
                    </div>
                    <div class="form-group col-3">
                        <label class="fw-bold" for="facturaActivo">N. Factura <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 facturaActivo">

                        <label class="fw-bold" for="valorActivo">valor Unitario <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 valorActivo">

                        <label class="fw-bold" for="fechaCompra">Fecha Compra <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="date" class="form-control my-1 fechaCompra">
                                       
                    </div>
                    <div class="form-group col-12">
                        <label class="fw-bold" for="proveedorActivo">Provedor <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 proveedorActivo"
                            list="listaProveedores"  opcionId="Pro--1">
                        <datalist id="listaProveedores"></datalist>
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
                
            </div>
        </div>
    `

    return seccion
}

export {
    ingresoInicalBodega,
}
