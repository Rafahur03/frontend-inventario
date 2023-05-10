const agregarActivo = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        
        <div class="container-fluid ms-5 w-100 d-flex ">
            <div class="p-2"><button type="button" class="btn btn-success crear">Crear</button></div>
            <div class="p-2"><button type="button"
                                        class="btn btn-warning actualizar d-none">Actualizar</button></div>
            <div class="p-2"><button type="button" class="btn btn-secondary solicitar d-none">Solictar
                                        Mtto</button>
            </div>
            <div class="p-2"> <button type="button" class="btn btn-primary print d-none">Print</button>
            </div>
            <div class="p-2 ms-auto"><button type="button"
                                        class="btn btn-danger eliminar d-none ">Eliminar</button>
            </div>
        </div>

        <div class="container-fluid w-100 border border-1 border-dark m-2 dataActivo">
            <h1 class="text-center mt-1">Hoja de Vida de Activos</h1>
            <form class="w-100">
                <div class="row mx-1 align-items-center">
                    <div class="form-group col-4">
                        <div class="d-flex flex-column align-items-center justify-content-center" id="dragDropImgActivo">
                            <div class="icon">
                                <i class="bi bi-images text-color-info text-info display-6 "></i>
                            </div>
                            <span class="fw-bold dragtext">Arrastra y suelta </span>
                            <span class="fw-bold dragtext">o </span>
                            <span class="fw-bold text-info">Selecciona las imagenes</span>
                            <input type="file" accept=".jpg, .png, .jpeg|image/*" id="inputActivoImg" hidden multiple "><span class=" text-secondary">Tipo: JPEG, JPG, PNG
                            </span>
                        </div>
                        <div id="carruselImgActivo" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators"></div>
                            <div class="carousel-inner"></div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carruselImgActivo" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                                    data-bs-target="#carruselImgActivo" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div class="form-group col-3">
                        <label for="clasificacionActivo" class="clasificacionActivo">Clasificacion
                                                Activo</label>
                        <input type="select" class="form-control my-1  fw-bold" id="clasificacionActivo"
                                                list="listClasificacionActivo">
                        <datalist id="listClasificacionActivo"></datalist>

                        <label for="codigoInterno" class="d-none codigoInterno">Codigo Interno</label>
                        <input type="text" class="form-control my-1 fw-bold d-none" id="codigoInterno"
                                                readonly>

                        <label for="modeloActivo">Modelo</label>
                        <input type="text" class="form-control my-1" id="modeloActivo">

                        <label for="areaActivo">Area</label>
                        <input type="text" class="form-control my-1" id="areaActivo" list="listaAreas">
                        <datalist id="listaAreas"></datalist>

                    </div>
                    <div class="form-group col-3">
                        <label for="nombreActivo">Nombre</label>
                        <input type="text" class="form-control my-1" id="nombreActivo">

                        <label for="serieActivo">Serie</label>
                        <input type="text" class="form-control my-1" id="serieActivo">

                        <label for="ubicacionActivo">Ubicacion Especifica</label>
                        <input type="text" class="form-control my-1" id="ubicacionActivo">

                    </div>
                    <div class="form-group col-2">
                        <label for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1" id="marcaActivo" list="listMarcas">
                        <datalist id="listMarcas"></datalist>

                        <label for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1" id="procesoActivo"
                                                list="listProceso">
                        <datalist id="listProceso"></datalist>

                        <label for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoActivo"
                                                list="listaEstado">
                        <datalist id="listaEstado"></datalist>
                    </div>
                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-5">
                        <label for="proveedorActivo">Provedor</label>
                        <input type="text" class="form-control my-1" id="proveedorActivo"
                                                list="listaProveedores">
                        <datalist id="listaProveedores"></datalist>
                    </div>
                    <div class="form-group col-2 nitProveedor">
                        <label for="nitProveedor">Nit Provedor</label>
                        <input type="text" class="form-control my-1" id="nitProveedor" readonly>
                    </div>

                    <div class="form-group col-3">
                        <label for="responsableActivo">Responsable del Activo</label>
                        <input type="text" class="form-control my-1" id="responsableActivo"
                                                list="listaUsuario">
                        <datalist id="listaUsuario"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label for="tipoActivo">Tipo activo</label>
                        <input type="text" class="form-control my-1" id="tipoActivo"
                                                list="listaTipoActivo">
                        <datalist id="listaTipoActivo"></datalist>
                    </div>

                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-2">
                        <label for="facturaActivo">N. Factura</label>
                        <input type="text" class="form-control my-1" id="facturaActivo">
                    </div>
                    <div class="form-group col-2">
                        <label for="valorActivo">valor</label>
                        <input type="text" class="form-control my-1" id="valorActivo">
                    </div>

                    <div class="form-group col-2 d-none ingresoActivo">
                        <label for="ingresoActivo">Fecha ingreso al Inv</label>
                        <input type="date" class="form-control my-1" id="ingresoActivo" readonly>
                    </div>
                    <div class="form-group col-3">
                        <label for="fechaCompra">Fecha Compra</label>
                        <input type="date" class="form-control my-1" id="fechaCompra">
                    </div>
                    <div class="form-group col-3">
                        <label for="garantiaActivo">Fin Garantia</label>
                        <input type="date" class="form-control my-1" id="garantiaActivo">
                    </div>
                    <div class="form-group col-2">
                        <label for="frecuenciaMtto">Frecuencia de Mtto</label>
                        <input type="text" class="form-control my-1" id="frecuenciaMtto"
                                                list="listaFrecuencia">
                        <datalist id="listaFrecuencia"></datalist>
                    </div>
                    <div class="form-group col-2 d-none ultimoMtto ">
                        <label for="ultimoMtto">Fecha Ultimo Mtto</label>
                        <input type="date" class="form-control my-1" id="ultimoMtto" readonly>
                    </div>
                    <div class="form-group col-2 d-none proximoMtto">
                        <label for="proximoMtto">Fecha Proximo Mtto</label>
                        <input type="date" class="form-control my-1 fw-bold" id="proximoMtto" readonly>
                    </div>

                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-4">
                        <label for="descripcionActivo">Descripcion del Activo</label>
                        <textarea class="form-control m-1" id="descripcionActivo" rows="4"></textarea>
                    </div>
                    <div class="form-group col-4">
                        <label for="recomendacionActivo">Recomendaciones de Mantenimiento</label>
                        <textarea class="form-control m-1" id="recomendacionActivo" rows="4"></textarea>
                    </div>
                    <div class="form-group col-4">
                        <label for="observacionActivo">Observaciones</label>
                        <textarea class="form-control m-1" id="observacionActivo" rows="4"></textarea>
                    </div>
                </div>
            </form>
        </div>
    `

    return seccion
}

export {
    agregarActivo,
}
