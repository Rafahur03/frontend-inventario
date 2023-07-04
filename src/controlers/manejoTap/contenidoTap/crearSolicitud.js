const crearSolicitud = (id) => {
    console.log(id);
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">CREAR SOLICITUD</h3>
        <div class="container-fluid w-100 d-flex mx-1">
            <div class="p-1"><button type="button" class="btn btn-success crear">Crear</button></div>
        </div>
        <h4 class="text-center mt-1">Datos de Activo</h4>
        <div class="container-fluid w-100 m-0 p-0 mb-3 dataActivo">
            <form class="w-100 position-relative">
                <div class="row mx-3 align-items-center ">
                    <div class="form-group col-4 p-4">
                        <img class="img-fluid"
                            src="https://www.lenovo.com/medias/IdeaPad-3-14ITL6-CT1-01-1060x596px.png?context=bWFzdGVyfHJvb3R8MzU3OTAxfGltYWdlL3BuZ3xoZGEvaGJiLzE0Nzg3OTEyMjY5ODU0LnBuZ3xlMGUyY2EzYzc3YjFmZGU5NjlhNTU5ZGFlZGEzYzk1ZjY5ODg3MjY5YjY4YThiZmNiMzJmZWQwMjAwOTAzY2Nl"
                            alt="">
                    </div>
                    <div class="form-group col-2">

                        <label for="idActivo"> Id Activo</label>
                        <input type="text" class="form-control my-1 " id="idActivo" list="listActivos">
                        <datalist id="listActivos"></datalist>

                        <label for="codigoInterno">Codigo Interno</label>
                        <input type="text" class="form-control my-1" id="codigoInterno" readonly>

                        <label for=" modeloActivo">Modelo</label>
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

                        <label for="estadoctivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoActivo" readonly>

                    </div>
                    <div class="form-group col-3">

                        <label for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1" id="marcaActivo" readonly>

                        <label for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1" id="procesoActivo" readonly>

                        <label for="responsable">Responsable</label>
                        <input type="text" class="form-control my-1" id="responsable" readonly>

                        <label for="imagenesSoporte">Soporte Fotografico</label>
                        <div class="contendorInput position-relative" >
                            <button id="imagenesSoporte" type="button"
                                class="btn btn-secondary fs-6 btn-lg h-25">Seleccionar Max 4 Imagenes</button>
                            <input class="opacity-0 w-75 position-absolute top-0 start-0" type="file"
                                id="inputImagenSoporte" accept="image/png, image/jpeg, image/jpg" style="box-sizing:content-box">
                        </div>
                    </div>
                    <!-- div para las imagenes -->
                    <div class="form-group row d-flex align-content-center"></div>
                    <div class="row m-2 align-items-center">
                        <div class="form-group col d-flex flex-column">
                            <label class="text-center fw-bold" for="descripcionSolicitud">DESCRIPCION DE
                                LA SOLICITUD O FALLO DEL EQUIPO</label>
                            <p class="m-0" id="caracteressolicitud">Maximo 1000 caracteres</p>
                            <textarea class="form-control" id="descripcionSolicitud" rows="4"
                                readonly></textarea>
                        </div>
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
