const { ipcRenderer } = require('electron')
import { modalMensaje } from "../../helpers/modalEleccion.js";
import { abrirDatos } from "../../helpers/abrirDatos.js"

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
                        <th scope="col">Area</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody class="tbody-insumos text-center">
                </tbody>
            </table>
        </div>
    `

    const insumos = ipcRenderer.sendSync('listadoInsumos', 'Insumos')
    if (insumos.msg) {
        modalMensaje({ titulo: 'ERROR', mensaje: insumos.msg })
    } else {
        const tbodyinsumos = seccion.querySelector('.tbody-insumos')
        insumos.forEach(element => {
            const tr = document.createElement('tr')
            const tdId = document.createElement('td')
            const tdnombre = document.createElement('td')
            const tdmarca = document.createElement('td')
            const tdmodelo = document.createElement('td')
            const tdserie = document.createElement('td')
            const tdubicacion = document.createElement('td')
            const tdCantidad = document.createElement('td')

            tr.id = element.id
            tdId.textContent = element.id
            tdnombre.textContent = element.nombre
            tdmarca.textContent = element.marca
            tdmodelo.textContent = element.modelo
            tdserie.textContent = element.serie
            tdubicacion.textContent = element.area
            tdCantidad.textContent = element.cantidad
            tr.appendChild(tdId)
            tr.appendChild(tdnombre)
            tr.appendChild(tdmarca)
            tr.appendChild(tdmodelo)
            tr.appendChild(tdserie)
            tr.appendChild(tdubicacion)
            tr.appendChild(tdCantidad)
            tbodyinsumos.appendChild(tr)
            tr.ondblclick = e => { abrirDatos(e) }

        });
    }


    return seccion
}

export {
    listadoBodegaInsumos,
}
