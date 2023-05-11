const cambiarClave = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">CAMBIAR CONTRASEÑA</h3>
        <div class="container-fluid w-100 d-flex mx-1">
            <div class="p-2"><button type="button" class="btn btn-warning actualizar">Actualizar</button></div>
        </div>
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">
                <div class="row justify-content-center">
                    <div class=" col-3">
                        <label for="Nuevaclave">Nueva Contraseña</label>
                        <input type="password" class="form-control my-1" id="Nuevaclave">
                    
                    </div>
                    <div class="col-3">
                    
                        <label for="Confirmarclave">Confirmar Nueva Contraseña</label>
                        <input type="password" class="form-control my-1" id="Confirmarclave">

                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3">
                        <label for="claveActual">contraseña Actual</label>
                        <input type="password" class="form-control my-1" id="claveActual">
                    </div>
                </div>
            </form>
        </div>
    `

    return seccion
}

export {
    cambiarClave,
}
