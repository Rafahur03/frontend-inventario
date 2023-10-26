const { ipcRenderer } = require('electron')
import { modalMensaje } from "../../helpers/modalEleccion.js";
import { cargarListadoSolicitud } from "../../solicitudes/cargarListadoSolicitud.js";
const listadoSolicitudes = () => {

    
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
    <h2 class="text-center mt-1">Listado Solicitudes</h2>
        <div class="w-100 bg-light my-2 p-2">
            <div class="m-1 ">
                <h2>Filtrar por:</h2>
                <p>Selecciones los filtros y luego presione en los binoculares Si no escoge una fecha la consulta puede tardar, el rango de fecha maximo es de 6 meses</p>
                <h5>FECHA</h5>
                <div class ="container-fluid w-100 d-flex">
                    <div class= "mr-2">
                        <label for="fechaInicialSolicitud">Fecha Inical Mtto</label>
                        <input type="date" class="form-control my-1 fechaInicialSolicitud">
                    </div>
                    <div class= "ms-2">
                        <label for="fechaFinalReporte">Fecha Final</label>
                        <input type="date" class="form-control my-1 fechaFinalSolicitud">
                    </div>
                    <div class=" ms-auto  border rounded  border-dark">
                        <button type="button" class="btn mt-0 pt-0  busquedaSolicitud" title="Consultar Solicitud">
                            <i class="bi bi-binoculars-fill fs-1 text-success"></i>
                        </button>
                    </div>
                </div>
                <h5>TIPO DE ACTIVO</h5>
                <div class ="d-flex flex-nowrap justify-content-around clasificacion">
                </div>
                <div class ="d-flex flex-nowrap justify-content-end">
                    
                </div>
            </div>
            
            <div class="w-50 mb-1">
                <h2>Filtrar por:</h2>
                <p>Escriba cuaquiera de estos datos: id equipo, Id solicitud, Nombre del activo marca, modelo, serie, ubicacion, responsable</p>
                <input class="form-control inputFiltro" type="text" placeholder="Buscar...">
            </div>
        </div>
        <div class="w-100 p-3">
            <table class="table W-100 table-striped table-hover table-responsive">
                <thead>
                    <tr class="text-uppercase text-center">
                        <th scope="col">Id Solicitud</th>
                        <th scope="col">Codigo Activo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Solicitud</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Estado</th>
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

    const busquedaSolicitud = seccion.querySelector('.busquedaSolicitud')
    busquedaSolicitud.onclick= ()=>{cargarListadoSolicitud(seccion)}
    return seccion
}

export {    
    listadoSolicitudes,
}
