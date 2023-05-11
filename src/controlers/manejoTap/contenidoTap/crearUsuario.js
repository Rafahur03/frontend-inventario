const crearUsuario = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">CREAR USUARIOO</h3>
        <div class="container-fluid w-100 d-flex mx-1">
            <div class="p-1"><button type="button" class="btn btn-success crear">Crear</button></div>
        </div>
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">
                <div class="row  justify-content-center">
                    <div class=" col-3">
                        <label for="marcaActivo">Tipo Id</label>
                        <input type="text" class="form-control my-1" id="marcaActivo"
                            list="listadoTipoId">
                        <datalist id="listadoTipoId"></datalist>
                        <label for="marcaActivo">Primer Nombre</label>
                        <input type="text" class="form-control my-1" id="marcaActivo">
                        <label for="marcaActivo">Primer Apellido</label>
                        <input type="text" class="form-control my-1" id="marcaActivo">
                        <label for="marcaActivo">email</label>
                        <input type="email" class="form-control my-1" id="marcaActivo"
                            pattern=".+@globex\.com" size="30" required>
                        <label for="marcaActivo">contraseña</label>
                        <input type="text" class="form-control my-1" id="marcaActivo">
                        <label for="marcaActivo">Proveedores</label>
                        <input type="text" class="form-control my-1" id="marcaActivo"
                            list="listadoEstadoUsuario">
                        <datalist id="listadoEstadoUsuario"></datalist>
                    </div>
                    <div class="col-3">
                        <label for="marcaActivo">Numero Id</label>
                        <input type="text" class="form-control my-1" id="marcaActivo">
                        <label for="marcaActivo">Segundo Nombre</label>
                        <input type="text" class="form-control my-1" id="marcaActivo">
                        <label for="marcaActivo">Segundo Apellido</label>
                        <input type="text" class="form-control my-1" id="marcaActivo">
                        <label for="marcaActivo">Estado</label>
                        <input type="text" class="form-control my-1" id="marcaActivo"
                            list="listadoEstadoUsuario">
                        <datalist id="listadoEstadoUsuario"></datalist>
                        <label for="marcaActivo">Confirmar contraseña</label>
                        <input type="text" class="form-control my-1" id="marcaActivo">
                        <label for="marcaActivo">Permisos</label>
                        <input type="text" class="form-control my-1" id="marcaActivo"
                            list="listadoEstadoUsuario">
                        <datalist id="listadoEstadoUsuario"></datalist>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3">
                        <label for="imagenesSoporte" class="text-center">Firma Digital Del
                            Usuario</label>
                        <div class="contendorInput position-relative">
                            <button id="imagenesSoporte" type="button"
                                class="btn btn-secondary fs-6 btn-lg h-25">Seleccione una Firma</button>
                            <input class="opacity-0 w-75 position-absolute top-0 start-0" type="file"
                                id="inputImagenSoporte" accept="image/png, image/jpeg, image/jpg">
                        </div>
                    </div>
                </div>
                <!-- AQUI VA LA FIRMA -->
                <div class="row justify-content-center">
                    
                </div>
            </form>
        </div>
    `

    return seccion
}

export {
    crearUsuario,
}
