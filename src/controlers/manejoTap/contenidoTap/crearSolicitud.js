const crearSolicitud = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1">Crear Solicitud</h3>
        <div class="container-fluid w-100 d-flex mb-3 mt-3">
            <div class="p-2"><button type="button" class="btn btn-success crear">Crear</button></div>
        </div>
        <div class="container-fluid w-100 m-0 p-0 mb-3 dataActivo">
            <form class="w-100 position-relative">
                <div class="row mx-3 align-items-center ">
                    <div class="form-group col-2">
                        <div class="d-none idSolicitud">
                            <label for="idSolicitud">Id Solicitud</label>
                            <input type="text" class="form-control my-1" id="idSolicitud" readonly>
                        </div>
                    </div>
                    <div class="form-group col-2">
                        <div class=" ms-5 idActivo">
                            <label for="idActivo"> Id Activo</label>
                            <input type="text" class="form-control my-1 " id="idActivo" list="listActivos">
                            <datalist id="listActivos"></datalist>
                        </div>
                    </div>
                </div>
                <div class="row mx-3 align-items-center ">
                    <div class="form-group col-4 p-4">
                        <img class="img-fluid"
                            src="https://www.lenovo.com/medias/IdeaPad-3-14ITL6-CT1-01-1060x596px.png?context=bWFzdGVyfHJvb3R8MzU3OTAxfGltYWdlL3BuZ3xoZGEvaGJiLzE0Nzg3OTEyMjY5ODU0LnBuZ3xlMGUyY2EzYzc3YjFmZGU5NjlhNTU5ZGFlZGEzYzk1ZjY5ODg3MjY5YjY4YThiZmNiMzJmZWQwMjAwOTAzY2Nl"
                            alt="">
                    </div>
                    <div class="form-group col-3">
                        <label for="codigoInterno">Codigo Interno</label>
                        <input type="text" class="form-control my-1" id="codigoInterno" readonly>

                        <label for=" modeloActivo">Modelo</label>
                        <input type="text" class="form-control my-1" id="modeloActivo" readonly>

                        <label for="areaActivo">Area</label>
                        <input type="text" class="form-control my-1" id="areaActivo" readonly>

                        <label class="d-none usuarioSolicitud" for="usuarioSolicitud">Usuario que solicito</label>
                        <input type="text" class="form-control my-1 d-none" id="usuarioSolicitud" readonly>

                    </div>
                    <div class="form-group col-3">
                        <label for="nombreActivo">Nombre</label>
                        <input type="text" class="form-control my-1" id="nombreActivo" readonly>

                        <label for="serieActivo">Serie</label>
                        <input type="text" class="form-control my-1" id="serieActivo" readonly>

                        <label for="ubicacionActivo">Ubicacion Especifica</label>
                        <input type="text" class="form-control my-1" id="ubicacionActivo" readonly>

                        <label class="d-none fechaSolicitud" for="fechaSolicitud">Fecha de solcitud</label>
                        <input type="datetime" class="form-control my-1 fw-bold d-none" id="fechaSolicitud" readonly>

                    </div>
                    <div class="form-group col-2">

                        <label for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1" id="marcaActivo" readonly>

                        <label for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1" id="procesoActivo" readonly>

                        <label for="responsable">Responsable</label>
                        <input type="text" class="form-control my-1" id="responsable" readonly>

                        <label for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoActivo" readonly>

                    </div>
                </div>
                <div class="row m-2 align-items-center">
                    <div class="form-group col">
                        <label class="text-center" for="descripcionSolicitud">Descripcion de la solictud o fallo del
                            equipo</label>
                        <p class="m-0" id="caracteressolicitud">Maximo 1000 caracteres</p>
                        <textarea class="form-control" id="descripcionSolicitud" rows="8" readonly></textarea>
                    </div>
                </div>
                <div class="row m-2 align-items-center">
                    <div class="form-group">
                        <img class="img-fluid"
                            src="https://4ddig.tenorshare.com/es/images/otros/documentos/word-danado.jpg?w=715&h=450"
                            alt="">
                    </div>
                </div>
            </form>
        </div>    
    `

    return seccion
}

export {
    crearSolicitud,
}
