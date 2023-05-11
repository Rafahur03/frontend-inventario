const crearActivo = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">CREAR UN ACTIVO</h3>
        <div class="container-fluid ms-5 w-100 d-flex ">
            <div class="p-2"><button type="button" class="btn btn-success crear">Crear</button></div>
        </div>
        <div class="container-fluid w-100 border border-1 border-dark m-2 dataActivo">
            <h1 class="text-center mt-1">Hoja de Vida de Activos</h1>
            <form class="w-100">
                <div class="row mx-1 align-items-center">
                    <div class="form-group col-4">
                        <div class="d-flex flex-column align-items-center justify-content-center"
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
                        <div id="carruselImagenActivo" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators"></div>
                            <div class="carousel-inner"></div>
                            <button class="carousel-control-prev" type="button"
                                data-bs-target="#carruselImagenActivo" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                data-bs-target="#carruselImagenActivo" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div class="form-group col-3">
                        <label for="clasificacionActivo" class="clasificacionActivo">Clasificacion
                            Activo</label>
                        <input type="select" class="form-control my-1  fw-bold" id="clasificacionActivo" list="listClasificacionActivo">
                        <datalist id="listClasificacionActivo"></datalist>

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
                        <input type="text" class="form-control my-1" id="procesoActivo" list="listProceso">
                        <datalist id="listProceso"></datalist>

                        <label for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoActivo"list="listaEstado">
                        <datali st id="listaEstado"></datalist>
                    </div>
                </div>
                <div class="row mx-3 align-items-center py-1">
                    <div class="form-group col-5">
                        <label for="proveedorActivo">Provedor</label>
                        <input type="text" class="form-control my-1" id="proveedorActivo"  list="listaProveedores">
                        <datalist id="listaProveedores"></datalist>
                    </div>
                    <div class="form-group col-2 nitProveedor">
                        <label for="nitProveedor">Nit Provedor</label>
                        <input type="text" class="form-control my-1" id="nitProveedor" readonly>
                    </div>

                    <div class="form-group col-3">
                        <label for="responsableActivo">Responsable del Activo</label>
                        <input type="text" class="form-control my-1" id="responsableActivo" list="listaUsuario">
                        <datalist id="listaUsuario"></datalist>
                    </div>
                    <div class="form-group col-2">
                        <label for="tipoActivo">Tipo activo</label>
                        <input type="text" class="form-control my-1" id="tipoActivo" list="listaTipoActivo">
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
                        <input type="text" class="form-control my-1" id="frecuenciaMtto" list="listaFrecuencia">
                        <datalist id="listaFrecuencia"></datalist>
                    </div>

                    <div class="form-group col-3 proximoMtto">
                        <label for="proximoMtto">Fecha Proximo Mtto</label>
                        <input type="date" class="form-control my-1" id="proximoMtto">
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
   crearActivo,
}
