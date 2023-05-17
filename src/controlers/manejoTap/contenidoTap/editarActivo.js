const editarActivo = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">CONSULTAR O EDITAR UN ACTIVO</h3>
        <div class="container-fluid me-5 w-100 d-flex ">
            <div class="p-2"><button type="button" class="btn btn-warning d-none actualizar">Actualizar</button></div>
            <div class="p-2"><button type="button" class="btn btn-secondary solicitar">Solictar Mtto</button></div>
            <div class="p-2"> <button type="button" class="btn btn-primary print">Print</button></div>
            <div class="p-2 ms-auto"><button type="button" class="btn btn-danger eliminar d-none">Eliminar</button></div>
        </div>

        <div class="container-fluid w-100 border border-1 border-dark m-2 dataActivo">
            <h2 class="text-center mt-1">Hoja de Vida de Activos</h2>
            <form class="w-100">
                <div class="row mx-1 align-items-center">

                    <div class="form-group col-4">
                        <div id="carruselImgActivo" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators"></div>
                            <div class="carousel-inner"></div>
                            <button class="carousel-control-prev" type="button"
                                data-bs-target="#carruselImgActivo" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                data-bs-target="#carruselImgActivo" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div class="d-flex d-none flex-column align-items-center justify-content-center"
                            id="contendorImputImagenesActivo">
                            <div class="contendorInput position-relative">
                                <button id="buttonImagenesActivo" type="button"
                                    class="btn btn-secondary fs-6 btn-lg h-25">Selecione Max 6
                                    Imagenes</button>
                                <input class="opacity-0 w-100 position-absolute top-0 start-0 "
                                    type="file" id="inputImagenesActivo"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style="box-sizing:content-box">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-3">

                        <label class ="fw-bold" for="codigoInterno">Codigo Interno</label>
                        <input type="text" class="form-control my-1 fw-bold codigoInterno" readonly>

                        <label class ="fw-bold" for="modeloActivo">Modelo</label>
                        <input type="text" class="form-control my-1 modeloActivo" readonly>

                        <label class ="fw-bold" for="areaActivo">Area</label>
                        <input type="text" class="form-control my-1 areaActivo" list="listaAreas" readonly>
                        <datalist id="listaAreas"></datalist>

                    </div>
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="nombreActivo">Nombre</label>
                        <input type="text" class="form-control my-1 nombreActivo" readonly>

                        <label class ="fw-bold" for="serieActivo">Serie</label>
                        <input type="text" class="form-control my-1 serieActivo" readonly>

                        <label class ="fw-bold" for="ubicacionActivo">Ubicacion Especifica</label>
                        <input type="text" class="form-control my-1 ubicacionActivo" readonly>

                    </div>
                    <div class="form-group col-3">
                        <label class ="fw-bold" for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1 marcaActivo" list="listMarcas" readonly>
                        <datalist id="listMarcas"></datalist>

                        <label class ="fw-bold" for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1 procesoActivo" list="listProceso" readonly>
                        <datalist id="listProceso"></datalist>

                        <label class ="fw-bold" for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold estadoActivo" list="listaEstado" readonly>
                        <datalist id="listaEstado"></datalist>
                    </div>
                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-5">
                        <label class ="fw-bold" for="proveedorActivo">Provedor</label>
                        <input type="text" class="form-control my-1 proveedorActivo" list="listaProveedores" readonly>
                        <datalist id="listaProveedores"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="nitProveedor">Nit Provedor</label>
                        <input type="text" class="form-control my-1 nitProveedor" readonly>
                    </div>

                    <div class="form-group col-3">
                        <label class ="fw-bold" for="responsableActivo">Responsable del Activo</label>
                        <input type="text" class="form-control my-1 responsableActivo" list="listaUsuario" readonly>
                        <datalist id="listaUsuario"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="tipoActivo">Tipo activo</label>
                        <input type="text" class="form-control my-1 tipoActivo" list="listaTipoActivo" readonly>
                        <datalist id="listaTipoActivo"></datalist>
                    </div>

                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="facturaActivo">N. Factura</label>
                        <input type="text" class="form-control my-1 facturaActivo" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="valorActivo">valor</label>
                        <input type="text" class="form-control my-1 valorActivo" readonly>
                    </div>

                    <div class="form-group col-2">
                        <label class ="fw-bold" for="ingresoActivo">Fecha ingreso al Inv</label>
                        <input type="date" class="form-control my-1 ingresoActivo" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="fechaCompra">Fecha Compra</label>
                        <input type="date" class="form-control my-1 fechaCompra" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="garantiaActivo">Fin Garantia</label>
                        <input type="date" class="form-control my-1 garantiaActivo" readonly>
                    </div>
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="frecuenciaMtto">Frecuencia de Mtto</label>
                        <input type="text" class="form-control my-1 frecuenciaMtto" list="listaFrecuencia" readonly>
                        <datalist id="listaFrecuencia"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label class ="fw-bold" for="proximoMtto">Fecha Proximo Mtto</label>
                        <input type="date" class="form-control my-1 proximoMtto" readonly>
                    </div>

                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-4">
                        <label class ="fw-bold" for="descripcionActivo">Descripcion del Activo</label>
                        <textarea class="form-control m-1 descripcionActivo" rows="4"readonly></textarea>
                    </div>
                    <div class="form-group col-4">
                        <label class ="fw-bold" for="recomendacionActivo">Recomendaciones de Mantenimiento</label>
                        <textarea class="form-control m-1 recomendacionActivo" rows="4" readonly></textarea >
                    </div>
                    <div class="form-group col-4">
                        <label class ="fw-bold" for="observacionActivo">Observaciones</label>
                        <textarea class="form-control m-1 observacionActivo" rows="4" readonly></textarea>
                    </div>
                </div>
            </form>
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
                <div class="p-1 d-none agregarComponente ">
                    <button type="button" class="btn" id="nuevaComponente">
                        <i class="bi bi-plus-square-fill fs-2"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="container-fluid w-100 m-0 p-0 my-3 historialMantenimiento">
            <h2 class="text-center fw-bold">Historial de Mantenimientos</h2>
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

    return seccion
}

export {
    editarActivo,
}
