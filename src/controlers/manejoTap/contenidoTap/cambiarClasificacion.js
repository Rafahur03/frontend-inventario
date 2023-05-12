const cambiarClasificacion = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h1 class="text-center mt-1 fw-bold">CAMBIAR CLASIFICACION</h1>
        <div class="container-fluid ms-5 w-100 d-flex ">
            <div class="p-2"><button type="button" class="btn btn-warning crear">Cambiar</button></div>
        </div>
        <div class="container-fluid w-100 border border-1 border-dark m-2 py-3 cambiarClasificacion">
            <h3 class="text-center mt-1">Datos del Activo</h3>
            <form class="w-100">
                <div class="row mx-1 align-items-center">
                    <div class="form-group col-4">
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
                        <label for="clasificacionActivo" class="clasificacionActivo">Nueva ClasificacionActivo</label>
                        <input type="select" class="form-control my-1  fw-bold" id="clasificacionActivo" list="listClasificacionActivo">
                        <datalist id="listClasificacionActivo"></datalist>

                        <label for="codigoActivo">Codigo Interno</label>
                        <input type="text" class="form-control my-1" id="codigoActivo" readonly>

                        <label for="modeloActivo">Modelo</label>
                        <input type="text" class="form-control my-1" id="modeloActivo" readonly>

                        <label for="areaActivo">Area</label>
                        <input type="text" class="form-control my-1" id="areaActivo" readonly>

                    </div>
                    <div class="form-group col-3">
                        <label for="nombreActivo">Nombre</label>
                        <input type="text" class="form-control my-1" id="nombreActivo" readonly>

                        <label for="serieActivo">Serie</label>
                        <input type="text" class="form-control my-1" id="serieActivo" readonly>

                        <label for="ubicacionActivo">Ubicacion Especifica</label>
                        <input type="text" class="form-control my-1" id="ubicacionActivo" readonly>

                        <label for="responsableActivo">Responsable del Activo</label>
                        <input type="text" class="form-control my-1" id="responsableActivo" readonly>

                    </div>
                    <div class="form-group col-2">
                        <label for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1" id="marcaActivo" readonly>

                        <label for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1" id="procesoActivo" readonly>

                        <label for="tipoActivo">Tipo activo</label>
                        <input type="text" class="form-control my-1" id="tipoActivo" readonly>

                        <label for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoActivo" readonly>

                    </div>
                </div>
            </form>
        </div>
    `

    return seccion
}

export {
    cambiarClasificacion,
}
