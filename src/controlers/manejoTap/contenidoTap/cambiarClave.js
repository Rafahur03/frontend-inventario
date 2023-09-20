const { ipcRenderer } = require('electron')
import { modalMensaje } from '../../helpers/modalEleccion.js';
const cambiarClave = () => {

    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">CAMBIAR CONTRASEÑA</h3>
        <div class="container-fluid w-100 d-flex mx-1">
            <div class="p-2">
                <button type="button" class="btn mt-0 pt-0 cambiarClave" title="Guardar Datos">
                    <i class="bi bi-save2-fill fs-1 text-warning"></i>
                </button>
            </div>
        </div>
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">
                <div class="row justify-content-center">
                    <div class=" col-3">
                        <label for="Nuevaclave">Nueva Contraseña</label>
                        <input type="password" class="form-control my-1 nuevaclave">
                    
                    </div>
                    <div class="col-3">
                    
                        <label for="Confirmarclave">Confirmar Nueva Contraseña</label>
                        <input type="password" class="form-control my-1 confirmarclave">

                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3">
                        <label for="claveActual">contraseña Actual</label>
                        <input type="password" class="form-control my-1 claveActual">
                    </div>
                </div>
            </form>
        </div>
    `

    const cambiarContraseña = seccion.querySelector('.cambiarClave')

    cambiarContraseña.onclick = e => {
        e.preventDefault();
        const nuevaclave = seccion.querySelector('.nuevaclave').value
        const confirmarclave = seccion.querySelector('.confirmarclave').value
        const claveActual = seccion.querySelector('.claveActual').value

        const data = {
            nuevaclave,
            confirmarclave,
            claveActual
        }

        console.log(data)
        const cambiar = ipcRenderer.sendSync('cambiarContraseña', data)
        if (cambiar.msg) return modalMensaje({ titulo: 'ERROR', mensaje: cambiar.msg })
        modalMensaje({ titulo: 'EXITO', mensaje: cambiar.exito })
    }

    return seccion
}

export {
    cambiarClave,
}
