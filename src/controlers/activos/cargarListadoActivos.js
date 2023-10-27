const { ipcRenderer } = require('electron')
import { abrirDatos } from "../helpers/abrirDatos.js";
import { filtroBusqueda } from "../helpers/filtroBusqueda.js";
import { modalMensaje } from "../helpers/modalEleccion.js";

const cargarListadoActivo = seccion => {

    const clasificacion = seccion.querySelector('.clasificacion')
    const input = clasificacion.querySelectorAll('input')
    const inputs = Array.from(input)

    const filtros = inputs.map(element => {
        return { id: element.getAttribute('siglas'), valor: element.checked ? true : false }
    })

    if (filtros.every(item => item.valor === false)) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger una Clasificacion de Activo' })
    const DeBaja = seccion.querySelector('.checkDadosbaja')
    const data = { filtros, dadoBaja: DeBaja.checked ? true : false }


    const listado = ipcRenderer.sendSync('listadoActivoFiltrado', data);
    if (listado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: listado.msg })
    const tbody = seccion.querySelector('tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
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
        tr.ondblclick = e => { abrirDatos(e) }
    });

    const filtro = seccion.querySelector('.inputFiltro')
    filtro.oninput = e => { filtroBusqueda(e) }
    filtro.onkeyup = e => {
        e.preventDefault()
        if (e.keyCode === 13) return
    }

}

export { cargarListadoActivo }