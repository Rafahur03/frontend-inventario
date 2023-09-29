const { ipcRenderer } = require('electron')
import { filtroBusqueda } from "../../helpers/filtroBusqueda.js";
import { abrirDatos } from "../../helpers/abrirDatos.js"

const listadoActivos = () => {
    
    const listado = ipcRenderer.sendSync('listadoActivo');
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h2 class="text-center mt-1">Listado Activos</h2>
        <div class="w-100 bg-light p-2">
            <form class="w-50 mb-1">
                <h2>Filtrar por:</h2>
                <p>Escriba cuaquiera de estos datos: id equipo, marca, modelo, serie, ubicacion, responsable</p>
                <input class="form-control inputFiltro" type="text" placeholder="Buscar...">
            </form>
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
    const tbody = seccion.querySelector('tbody')
    listado.forEach(element => {
        const tr = document.createElement('tr')
        const tdcodigo = document.createElement('td')
        const tdnombreActivo = document.createElement('td')
        const tdmarca = document.createElement('td')
        const tdmodelo = document.createElement('td')
        const tdserie = document.createElement('td')
        const tdubicacion = document.createElement('td')
        const tdnombreResponsable = document.createElement('td')
        const tdestado = document.createElement('td')
        tr.id = `Act-${element.id}`
        tdcodigo.textContent = element.codigoInterno
        tdnombreActivo.textContent = element.nombreActivo
        tdmarca.textContent = element.marca
        tdmodelo.textContent = element.modelo
        tdserie.textContent = element.serie
        tdubicacion.textContent = element.ubicacion
        tdnombreResponsable.textContent = element.nombreResponsable
        tdestado.textContent = element.estado
        tr.appendChild(tdcodigo)
        tr.appendChild(tdnombreActivo)
        tr.appendChild(tdmarca)
        tr.appendChild(tdmodelo)
        tr.appendChild(tdserie)
        tr.appendChild(tdubicacion)
        tr.appendChild(tdnombreResponsable)
        tr.appendChild(tdestado)
        tbody.appendChild(tr)
        tr.ondblclick = e => {abrirDatos(e)}
    });

    const filtro = seccion.querySelector('.inputFiltro')
    filtro.oninput = e => { filtroBusqueda(e) }
    filtro.onkeyup = e => {
        e.preventDefault()
        if (e.keyCode === 13) return
    }

    return seccion
}

export {
    listadoActivos,
}
