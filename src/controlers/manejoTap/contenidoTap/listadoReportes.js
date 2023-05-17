const { ipcRenderer } = require('electron')
import { filtroBusqueda } from "../../helpers/filtroBusqueda.js";
import { abrirDatos } from "../../helpers/abrirDatos.js"

const listadoReportes = () => {
    const listado = ipcRenderer.sendSync('listadoReportes');
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
    <h2 class="text-center mt-1">Listado Reportes</h2>
        <div class="w-100 bg-light my-2 p-2">
            <form class="w-50 mb-4">
                <h2>Filtrar por:</h2>
                <p>Escriba cuaquiera de estos datos: id equipo, Id Reporte, Nombre del activo marca, modelo, serie, ubicacion, responsable</p>
                <input class="form-control inputFiltro" type="text" placeholder="Buscar...">
            </form>
        </div>
        <div class="w-100 p-3">
            <table class="table W-100 table-striped table-hover table-responsive">
                <thead>
                    <tr class="text-uppercase text-center">
                        <th scope="col">Id Reporte</th>
                        <th scope="col">Id Solicitud</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">nombre</th>
                        <th scope="col">marca</th>
                        <th scope="col">modelo</th>
                        <th scope="col">ubicacion</th>
                        <th scope="col">Solicitante</th>
                        <th scope="col">Fecha Reporte</th>
                        <th scope="col">estado</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>        
    `
    const tbody = seccion.querySelector('tbody')
    listado.forEach(element => {
        const tr = document.createElement('tr')
        const tdIdReporte= document.createElement('td')
        const tdIdSolicitud = document.createElement('td')
        const tdcodigo = document.createElement('td')
        const tdnombreActivo = document.createElement('td')
        const tdmarca = document.createElement('td')
        const tdmodelo = document.createElement('td')
        const tdubicacion = document.createElement('td')
        const tdnombreResponsable = document.createElement('td')
        const tdFechaReporte = document.createElement('td')
        const tdestado = document.createElement('td')
        tr.id = `Rep-${element.idReporte}`
        tdIdReporte.textContent = element.idReporte
        tdIdSolicitud.textContent = element.idSolicitud
        tdcodigo.textContent = element.codigoInterno
        tdnombreActivo.textContent = element.nombreACtivo
        tdmarca.textContent = element.marca
        tdmodelo.textContent = element.modelo
        tdubicacion.textContent = element.ubicacion
        tdnombreResponsable.textContent = element.solicitante
        tdFechaReporte.textContent = element.fechareporte
        tdestado.textContent = element.estado
        tr.appendChild(tdIdReporte)
        tr.appendChild(tdIdSolicitud)
        tr.appendChild(tdcodigo)
        tr.appendChild(tdnombreActivo)
        tr.appendChild(tdmarca)
        tr.appendChild(tdmodelo)
        tr.appendChild(tdubicacion)
        tr.appendChild(tdnombreResponsable)
        tr.appendChild(tdFechaReporte)
        tr.appendChild(tdestado)
        tbody.appendChild(tr)
        tr.ondblclick = e => {abrirDatos(e)}
    });

    const filtro = seccion.querySelector('.inputFiltro')
    filtro.oninput = e => { filtroBusqueda(e) }

    return seccion
}

export {
    listadoReportes,
}
