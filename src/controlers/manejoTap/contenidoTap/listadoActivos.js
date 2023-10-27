const { ipcRenderer } = require('electron')
import { cargarListadoActivo } from "../../activos/cargarListadoActivos.js";
import { modalMensaje } from "../../helpers/modalEleccion.js";

const listadoActivos = () => {

    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h2 class="text-center mt-1">Listado Activos</h2>
        <div class="w-100 bg-light p-2">
            <div class="m-1 ">
                <h2>Filtrar por:</h2>
                <p>Selecciones los filtros y luego presione en los binoculares Si no escoge todos los activos la busqueda puede tardar un poco</p>
                <h5>TIPO DE ACTIVO</h5>
                
                <div class ="d-flex flex-nowrap justify-content-around clasificacion">
                    
                </div>
                <div class ="d-flex">
                    <div class="form-check form-switch my-2">
                        <input class="form-check-input checkDadosbaja" type="checkbox" siglas="DB">
                        <label class="form-check-label" for="checkDadosBaja">Incluir Activos Dados de Baja</label>
                    </div>
                    <div class=" ms-auto b border rounded  border-dark">
                        <button type="button" class="btn mt-0 pt-0  busquedaActivos" title="Consultar Activos">
                            <i class="bi bi-binoculars-fill fs-1 text-success"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-50 mb-1">
                <h2>Consultar por:</h2>
                <p>Escriba cuaquiera de estos datos: id equipo, marca, modelo, serie, ubicacion, responsable</p>
                <input class="form-control inputFiltro" type="text" placeholder="Buscar...">
            </div>
        </div>
        <div class="w-100 p-1">
            <table class="table W-100 table-striped table-hover table-responsive">
                <thead>
                    <tr class="text-uppercase text-center">
                        <th scope="col">id activo</th>
                        <th scope="col">nombre</th>
                        <th scope="col">marca</th>
                        <th scope="col">modelo</th>
                        <th scope="col">serie</th>
                        <th scope="col">ubicacion</th>
                        <th scope="col">responsable</th>
                        <th scope="col">estado</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    `
    const listadoClasificacion = ipcRenderer.sendSync('datalist', 'clasificacionActivos')
    if (listadoClasificacion.msg) return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudo consultar el listado de filtros' })

    const clasificacion = seccion.querySelector('.clasificacion')
    listadoClasificacion.forEach((element, index) => {
        const contenedor = document.createElement('div')
        contenedor.classList.add('form-check', 'form-switch', 'm-2')
        const inputcheck = document.createElement('input')
        inputcheck.classList.add('form-check-input')
        inputcheck.type = 'checkbox'
        inputcheck.setAttribute('siglas', element.siglas)
        inputcheck.checked = false
        const label = document.createElement('label')
        label.classList.add('orm-check-label')
        label.textContent = element.siglas + ' - ' + element.nombre
        contenedor.appendChild(inputcheck)
        contenedor.appendChild(label)
        clasificacion.appendChild(contenedor)
    });

    const busquedaActivos = seccion.querySelector('.busquedaActivos')
    busquedaActivos.onclick = () => { cargarListadoActivo(seccion) }


    return seccion
}

export {
    listadoActivos,
}
