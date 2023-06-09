const editarReporte = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center fw-bold">   CONSULTAR O EDITAR UN REPORTE</h3>
        <div class="container-fluid w-100 d-flex">
            <div class="p-2"><button type="button"
                    class="btn btn-primary actualizar">Actualizar</button></div>
            <div class="p-2"> <button type="button" class="btn btn-secondary print">Print</button></div>
            <div class="p-2 ms-auto"><button type="button"
                    class="btn btn-danger eliminar ">Eliminar</button></div>
        </div>

        <h3 class="text-center mt-1 fw-bold">Datos del Activo</h3>
        <div class="container-fluid w-100 m-0 p-0 mb-3 dataActivo">
            <form class="container-fluid w-100 position-relative">
                <div class="row mx-3 align-items-center">
                    <div class="form-group col-4 p-4">
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
                    </div>
                    <div class="form-group col-2">

                        <label for="codigoInterno">Codigo interno</label>
                        <input type="text" class="form-control my-1" id="codigoInterno"
                            list="listActivos">
                        <datalist id="listActivos"></datalist>

                        <label for=" modeloActivo">Modelo</label>
                        <input type="text" class="form-control my-1" id="modeloActivo" readonly>

                        <label for="areaActivo">Area</label>
                        <input type="text" class="form-control my-1" id="areaActivo" readonly>

                        <label for="tipoActivo">Tipo activo</label>
                        <input type="text" class="form-control my-1" id="tipoActivo" readonly>

                    </div>
                    <div class="form-group col-3">

                        <label for="nombreActivo">Nombre</label>
                        <input type="text" class="form-control my-1" id="nombreActivo" readonly>

                        <label for="serieActivo">Serie</label>
                        <input type="text" class="form-control my-1" id="serieActivo" readonly>

                        <label for="ubicacionActivo">Ubicacion Especifica</label>
                        <input type="text" class="form-control my-1" id="ubicacionActivo" readonly>

                        <label for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoActivo"
                            list="listEsatdoActivo">
                        <datalist id="listEsatdoActivo"></datalist>

                    </div>
                    <div class="form-group col-3">

                        <label for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1" id="marcaActivo" readonly>

                        <label for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1" id="procesoActivo" readonly>

                        <label for="imagenesSoporte">Soporte Fotografico del Reporte</label>
                        <div class="contendorInput position-relative">
                            <button id="imagenesSoporte" type="button"
                                class="btn btn-secondary fs-6 btn-lg h-25">Seleccionar Max 4
                                Imagenes</button>
                            <input class="opacity-0 w-75 position-absolute top-0 start-0" type="file"
                                id="inputImagenSoporte" accept="image/png, image/jpeg, image/jpg">
                        </div>
                    </div>
                </div>
                <h3 class="text-center mt-1 fw-bold">Datos del Reporte</h3>
                <!-- aqui van las imagenes -->
                <div class="row mx-3 align-items-center" id="ImagenesReporte">

                </div>
                <div class="row mx-3 align-items-center">
                    <div class="form-group col-1">
                        <label for="idSolicitud">ID solicitud</label>
                        <input type="text" class="form-control my-1" id="idSolicitud"
                            list="listSolicitudes">
                        <datalist id="listSolicitudes"></datalist>
                    </div>

                    <div class="form-group col-2">
                        <label for="fechaSolicitud">Fecha de solicitud</label>
                        <input type="datetime" class="form-control my-1" id="fechaSolicitud" readonly>
                    </div>

                    <div class="form-group col-2">
                        <label for="fechaReporte">Fecha de reporte</label>
                        <input type="date" class="form-control my-1" id="fechaReporte">
                    </div>

                    <div class="form-group col-2">
                        <label for="tipoMantenimiento">Tipo de Mtto</label>
                        <input type="text" class="form-control my-1" id="tipoMantenimiento"
                            list="listTipoMtto">
                        <datalist id="listTipoMtto"></datalist>
                    </div>

                    <div class="form-group col-2">
                        <label for="CostoMo">Costo Mano de obra</label>
                        <input type="number" class="form-control my-1" id="costoMo"
                            placeholder="1000,00">
                    </div>

                    <div class="form-group col-2">
                        <label for="costoMa">Costo materiales</label>
                        <input type="number" class="form-control my-1" id="costoMp"
                            placeholder="1000,00">
                    </div>

                </div>
                <div class="row mx-3 align-items-center">
                    <div class="form-group col-4">
                        <label for="ProvedorMtto">Proveedor de Mtto</label>
                        <input type="text" class="form-control my-1" id="provedorMtto"
                            list="listProvedorMtto">
                        <datalist id="listProvedorMtto"></datalist>
                    </div>
                    <div class="form-group col-3">
                        <label for="diligenciaReporte">Reporte Tecnico Por:</label>
                        <input type="datetime" class="form-control my-1" id="diligenciaReporte"
                            list="listDiligenciaReporte" readonly>
                        <datalist id="listDiligenciaReporte"></datalist>
                    </div>

                    <div class="form-group col-3">
                        <label for="recibidoConforme">Recibido Conforme</label>
                        <input type="text" class="form-control my-1" id="recibidoConforme"
                            list="listRecibidoConforme">
                        <datalist id="listRecibidoConforme"></datalist>
                    </div>

                    <div class="form-group col-2 p-1">
                        <label for="estadoSolicitud">Estado Solicitud</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoSolicitud"
                            list="listestadoSolicitud">
                        <datalist id="listestadoSolicitud"></datalist>
                    </div>

                    <div class="row m-3 align-items-center">
                        <div class="form-group col-6">
                            <label for="descripcionSolicitud">Descripcion solicitud</label>
                            <textarea class="form-control m-1" id="descripcionSolicitud" rows="6"
                                readonly></textarea>
                        </div>
                        <div class="form-group col-6">
                            <label for="descripcionHallazgos">Descripcion Hallazgos</label>
                            <p class="m-0" id="caracteresHallazgos">Maximo 1000 caracteres</p>
                            <textarea class="form-control m-1" id="descripcionHallazgos"
                                rows="6"></textarea>
                        </div>
                    </div>

                    <div class="row mx-3 align-items-center">
                        <div class="form-group col-6">
                            <label for="descripcionReporte">Descripcion de reporte</label>
                            <p class="m-0" id="caracteresReporte">Maximo 1000 caracteres</p>
                            <textarea class="form-control m-1" id="descripcionReporte"
                                rows="6"></textarea>
                        </div>
                        <div class="form-group col-6">
                            <label for="recomendaciones">Recomendaciones</label>
                            <p class="m-0" id="caracteresRecomendacion">Maximo 1000 caracteres</p>
                            <textarea class="form-control m-1" id="recomendaciones" rows="6"></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
    `

    return seccion
}

export {
    editarReporte,
}
