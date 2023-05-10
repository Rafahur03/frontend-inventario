const consultarSolicitud = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <div class="container-fluid w-100 d-flex mb-3 mt-3">
            <div class="p-2"><button type="button" class="btn btn-warning actualizar">Actualizar</button></div>
            <div class="p-2"> <button type="button" class="btn btn-primary print">Print</button></div>
            <div class="p-2 ms-auto"><button type="button" class="btn btn-danger eliminar ">Eliminar</button></div>
        </div>

        <div class="container-fluid w-100 m-0 p-0 mb-3 dataActivo">
            <form class="container-fluid w-100 position-relative">
                <div class="mx-5 w-25 d-flex flex-column justify-content-start idSolicitud ">
                    <label for="idactivo">Id activo</label>
                    <input type="text" class="form-control my-1 " id="idactivo" list="listActivos">
                    <datalist id="listActivos"></datalist>
                </div>
                <div class="row mx-3 align-items-center">
                    <div class="form-group col-4 p-4">
                        <img class="img-fluid"
                            src="https://www.lenovo.com/medias/IdeaPad-3-14ITL6-CT1-01-1060x596px.png?context=bWFzdGVyfHJvb3R8MzU3OTAxfGltYWdlL3BuZ3xoZGEvaGJiLzE0Nzg3OTEyMjY5ODU0LnBuZ3xlMGUyY2EzYzc3YjFmZGU5NjlhNTU5ZGFlZGEzYzk1ZjY5ODg3MjY5YjY4YThiZmNiMzJmZWQwMjAwOTAzY2Nl"
                            alt="">
                    </div>
                    <div class="form-group col-3">
                        <label for="codigoInterno">Codigo interno</label>
                        <input type="text" class="form-control my-1" id="codigoInterno" readonly ">
                        

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

                    </div>
                    <div class="form-group col-2">

                        <label for="marcaActivo">Marca</label>
                        <input type="text" class="form-control my-1" id="marcaActivo" readonly>

                        <label for="procesoActivo">Proceso</label>
                        <input type="text" class="form-control my-1" id="procesoActivo" readonly>

                        <label for="estadoActivo">Estado</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoActivo" readonly>
                    </div>
                </div>
                <div class="row mx-3 align-items-center">
                    <div class="form-group col-1">
                        <label for="idSolicitud">ID solicitud</label>
                        <input type="text" class="form-control my-1" id="idSolicitud" list="listSolicitudes">
                        <datalist id="listSolicitudes"></datalist>
                    </div>

                    <div class="form-group col-1">
                        <label for="fechaSolicitud">Fecha de solicitud</label>
                        <input type="datetime" class="form-control my-1" id="fechaSolicitud" readonly>
                    </div>

                    <div class="form-group col-2 p-1">
                        <label for="estadoSolicitud">Estado de la solicitud</label>
                        <input type="text" class="form-control my-1 fw-bold" id="estadoSolicitud" readonly>
                    </div>  

                    <div class="form-group col-1">
                        <label for="idReporte">ID reporte</label>
                        <input type="text" class="form-control my-1" id="idReporte" list="listReporte">
                        <datalist id="listReporte"></datalist>
                    </div>

                    <div class="form-group col-2">
                        <label for="fechaReporte">Fecha de reporte</label>
                        <input type="datetime" class="form-control my-1 fw-bold" id="fechaReporte" readonly>
                    </div>

                    <div class="form-group col-2">
                        <label for="tipoActivo">Tipo activo</label>
                        <input type="text" class="form-control my-1" id="tipoActivo" readonly>
                    </div>
                    
                    <div class="form-group col-2">
                        <label for="tipoMantenimiento">Tipo de Mtto</label>
                        <input type="text" class="form-control my-1" id="tipoMantenimiento" readonly>
                    </div>

                </div>
                <div class="row m-3 align-items-center">
                    <div class="form-group col">
                    <label class="justify-content-center" for="descripcionSolicitud">Descripcion solicitud</label>
                    <textarea class="form-control m-1" id="descripcionSolicitud" rows="6" readonly></textarea>
                    </div>
                </div>   
            </form>
        </div>

        
    `

    return seccion
}

export {
    consultarSolicitud,
}
