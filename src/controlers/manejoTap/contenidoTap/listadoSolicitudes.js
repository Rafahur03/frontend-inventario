const { ipcRenderer } = require('electron')
import { filtroBusqueda } from "../../helpers/filtroBusqueda.js";
import { abrirDatos } from "../../helpers/abrirDatos.js"
import { modalMensaje } from "../../helpers/modalEleccion.js";

const listadoSolicitudes = () => {

    
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
    <h2 class="text-center mt-1">Listado Solicitudes</h2>
        <div class="w-100 bg-light my-2 p-2">
            <form class="w-50 mb-4">
                <h2>Filtrar por:</h2>
                <p>Escriba cuaquiera de estos datos: id equipo, Id solicitud, Nombre del activo marca, modelo, serie, ubicacion, responsable</p>
                <input class="form-control inputFiltro" type="text" placeholder="Buscar...">
            </form>
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
    const tbody = seccion.querySelector('tbody')
    const listado = ipcRenderer.sendSync('listadoSolicitud');
    if(listado.msg)  return modalMensaje( {titulo :'ERROR', mensaje: listado.msg})

    listado.forEach(element => {
        const tr = document.createElement('tr')

        const tdId= document.createElement('td')
        const tdcodigo = document.createElement('td')
        const tdnombreActivo = document.createElement('td')
        const tdmarca = document.createElement('td')
        const tdmodelo = document.createElement('td')
        const tdSolicitud = document.createElement('td')
        const tdFecha = document.createElement('td')
        const tdestado = document.createElement('td')
        tr.id = `Sol-${element.id}`
        tdId.textContent= element.id
        tdcodigo.textContent = element.codigoInterno
        tdnombreActivo.textContent = element.nombreActivo
        tdmarca.textContent = element.marca
        tdmodelo.textContent = element.modelo
        tdSolicitud.textContent = element.solicitud
        tdFecha.textContent = element.fecha_solicitud
        tdestado.textContent = element.estado
        tr.appendChild(tdId)
        tr.appendChild(tdcodigo)
        tr.appendChild(tdnombreActivo)
        tr.appendChild(tdmarca)
        tr.appendChild(tdmodelo)
        tr.appendChild(tdSolicitud)
        tr.appendChild(tdFecha)
        tr.appendChild(tdestado)
        tbody.appendChild(tr)
        tr.ondblclick = e => {abrirDatos(e)}
    });

    const filtro = seccion.querySelector('.inputFiltro')
    filtro.oninput = e => { filtroBusqueda(e) }

    return seccion
}

export {
    listadoSolicitudes,
}
