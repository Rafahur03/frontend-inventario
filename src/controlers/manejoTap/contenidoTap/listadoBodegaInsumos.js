const { ipcRenderer } = require('electron')
import { cargarListadoActivo } from "../../activos/cargarListadoActivos.js";
import { modalMensaje } from "../../helpers/modalEleccion.js";

const listadoBodegaInsumos = () => {

    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h2 class="text-center mt-1">Listado Bodega de Insumos</h2>
        <div class="w-100 bg-light p-2">
            <div class="w-50 mb-1">
                <h2>Consultar por:</h2>
                <p>Escriba cuaquiera de estos datos: Nombre, Marca, Modelo, Serie</p>
                <input class="form-control inputFiltro" type="text" placeholder="Buscar...">
            </div>
        </div>
        <div class="w-100 p-1">
            <table class="table W-100 table-striped table-hover table-responsive">
                <thead>
                    <tr class="text-uppercase text-center">
                        <th scope="col">Id Insumo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Serie</th>
                        <th scope="col">Ubicacion</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    `

    


    return seccion
}

export {
    listadoBodegaInsumos,
}
