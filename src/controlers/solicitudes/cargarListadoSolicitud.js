const { ipcRenderer } = require('electron')
import { abrirDatos } from "../helpers/abrirDatos.js"
import { filtroBusqueda } from "../helpers/filtroBusqueda.js"
import { modalMensaje, modalEleccion } from "../helpers/modalEleccion.js"

const cargarListadoSolicitud = async seccion => {

    const clasificacion = seccion.querySelector('.clasificacion')
    const input = clasificacion.querySelectorAll('input')
    const inputs = Array.from(input)

    const filtros = inputs.map(element => {
        return { id: element.getAttribute('siglas'), valor: element.checked ? true : false }
    })
    if (filtros.every(item => item.valor === false)) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger una Clasificacion de Activo' })
    const fechaInicialSolicitud = seccion.querySelector('.fechaInicialSolicitud').value
    const fechaFinalSolicitud = seccion.querySelector('.fechaFinalSolicitud').value
    if (fechaInicialSolicitud == '' || fechaFinalSolicitud == '') {
        const respuesta = await modalEleccion({ titulo: 'Advertencia', mensaje: 'Falta una de las fechas de inicio o final o ambas, si continua se consultaran los datos de los ultimos seis meses o los seis meses anteriores o posteriores acorde a una de las fechas Ingresada' })
        if (!respuesta) return
    }

    const data = {
        filtros,
        fechaInicialSolicitud,
        fechaFinalSolicitud
    }

    const listado = ipcRenderer.sendSync('listadoSolicitud', data);
    if (listado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: listado.msg })

    const tbody = seccion.querySelector('tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    listado.forEach(element => {
        const tr = document.createElement('tr')

        const tdId = document.createElement('td')
        const tdcodigo = document.createElement('td')
        const tdnombreActivo = document.createElement('td')
        const tdmarca = document.createElement('td')
        const tdmodelo = document.createElement('td')
        const tdSolicitud = document.createElement('td')
        const tdFecha = document.createElement('td')
        const tdestado = document.createElement('td')
        tr.id = `Sol-${element.id}`
        tdId.textContent = element.id
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
        tr.ondblclick = e => { abrirDatos(e) }
    });

    const filtro = seccion.querySelector('.inputFiltro')
    filtro.oninput = e => { filtroBusqueda(e) }

}

export { cargarListadoSolicitud }