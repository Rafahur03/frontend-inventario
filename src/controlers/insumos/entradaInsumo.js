const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'

const entradaInsumo = (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const insumo = boton.getAttribute('insumo')

    const nombreInsumo = nodo.querySelector('.insumo')
    const idInsumno = nombreInsumo.getAttribute('insumo')
    const cantidad = nodo.querySelector('.cantidadMover').value
    const ObservacionesInsumo = nodo.querySelector('.ObservacionesInsumo').value

    const entrada = {
        insumo,
        idInsumno,
        cantidad,
        ObservacionesInsumo
    }

    const respuesta = ipcRenderer.sendSync('entradaInsumo', entrada)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })

    cantidad.value = ''
    ObservacionesInsumo.value = ''

    const cantidadActualInsumo = nodo.querySelector('.CantidadActualInsumo')
    cantidadActualInsumo.value = respuesta.cantidadActual

    const tbodyMovimiento = nodo.querySelector('.tbody-histroial')
    const trMoviento = document.createElement('tr')
    const tdId = document.createElement('td')
    const tdFecha = document.createElement('td')
    const tdCantidad = document.createElement('td')
    const tdMovimiento = document.createElement('td')
    const tdObservacion = document.createElement('td')
    
    tdId.value = respuesta.idMovimiento
    tdFecha.value = respuesta.fechaMovimiento
    tdCantidad.value = respuesta.cantidadMovimiento
    tdMovimiento.value = respuesta.tipoMovimiento
    tdObservacion.value = respuesta.observacionMovimiento

    trMoviento.appendChild(tdId)
    trMoviento.appendChild(tdFecha)
    trMoviento.appendChild(tdCantidad)
    trMoviento.appendChild(tdMovimiento)
    trMoviento.appendChild(tdObservacion)

    tbodyMovimiento.insertBefore(trMoviento, tbodyMovimiento.firstChild)

}

export {
    entradaInsumo
}