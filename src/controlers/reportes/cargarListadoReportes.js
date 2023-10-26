const { ipcRenderer } = require('electron')
import { modalMensaje, modalEleccion } from "../helpers/modalEleccion.js"
import { abrirDatos } from "../helpers/abrirDatos.js"
import { filtroBusqueda } from "../helpers/filtroBusqueda.js"


const cargarListadoReporte = async seccion => {
    const clasificacion = seccion.querySelector('.clasificacion')
    const input = clasificacion.querySelectorAll('input')
    const inputs = Array.from(input)

    const filtros = inputs.map(element => {
        return { id: element.getAttribute('siglas'), valor: element.checked ? true : false }
    })
    if (filtros.every(item => item.valor === false)) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger una Clasificacion de Activo' })
    const fechaInicialReporte = seccion.querySelector('.fechaInicialReporte').value
    const fechaFinalReporte = seccion.querySelector('.fechaFinalReporte').value
    if (fechaInicialReporte == '' || fechaFinalReporte == '') {
        const respuesta = await modalEleccion({ titulo: 'Advertencia', mensaje: 'Falta una de las fechas de inicio o final o ambas, si continua se consultaran los datos de los ultimos seis meses o los seis meses anteriores o posteriores acorde a una de las fechas Ingresada' })
        if (!respuesta) return
    }
    const data = {
        filtros,
        fechaInicialReporte,
        fechaFinalReporte
    }

    const listado = ipcRenderer.sendSync('listadoReportes', data);
    if (listado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: listado.msg})

    const tbody = seccion.querySelector('tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    listado.forEach(element => {
        const tr = document.createElement('tr')
        const tdIdReporte = document.createElement('td')
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
        tr.ondblclick = e => { abrirDatos(e) }
    });

    const filtro = seccion.querySelector('.inputFiltro')
    filtro.oninput = e => { filtroBusqueda(e) }
}

export {
    cargarListadoReporte
}