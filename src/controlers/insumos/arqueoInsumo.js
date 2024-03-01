const { ipcRenderer } = require('electron')
import { modalMensaje, modalEleccion } from '../helpers/modalEleccion.js'

const arqueoInsumo = async (e, nodo) => {

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
    const cantidad = nodo.querySelector('.cantidadMover')
    const ObservacionesInsumo = nodo.querySelector('.ObservacionesInsumo')
    const cantidadActual = nodo.querySelector('.CantidadActualInsumo').value
    if(cantidad.value == '' || isNaN(parseFloat(cantidad.value))) return modalMensaje({titulo:'ERROR', mensaje:'El campo cantidad no puede estar vacio y debe ser un numero'})
    if(ObservacionesInsumo.value == '') return modalMensaje({titulo:'ERROR', mensaje:'El campo observación no puede estar vacio'})
    const eleccion = await  modalEleccion({titulo:'ARQUEO INSUMO', mensaje:`Esta seguro(a) de realizar el arqueo, la cantidad del insumo pasara de ${cantidadActual} a ${cantidad.value}`})
    if (!eleccion) return

    const entrada = {
        insumo,
        idInsumno,
        cantidad: cantidad.value,
        ObservacionesInsumo:ObservacionesInsumo.value
    }

    const respuesta = ipcRenderer.sendSync('arqueoInsumo', entrada)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })

    cantidad.value = ''
    ObservacionesInsumo.value = ''

    const cantidadActualInsumo = nodo.querySelector('.CantidadActualInsumo')
    cantidadActualInsumo.value = respuesta.cantidadActual

    const tbodyMovimiento = nodo.querySelector('.tbody-historial')
    const trMoviento = document.createElement('tr')
    const tdId = document.createElement('td')
    const tdFecha = document.createElement('td')
    const tdCantidad = document.createElement('td')
    const tdMovimiento = document.createElement('td')
    const tdUsuario = document.createElement('td')
    const tdObservacion = document.createElement('td')
    
    tdId.textContent = respuesta.idMovimiento
    tdFecha.textContent = respuesta.fechaMovimiento
    tdCantidad.textContent = respuesta.cantidadMovimiento
    tdMovimiento.textContent = respuesta.tipoMovimiento
    tdUsuario.textContent = respuesta.usuarioDestino
    tdObservacion.textContent = respuesta.observacionMovimiento

    trMoviento.appendChild(tdId)
    trMoviento.appendChild(tdFecha)
    trMoviento.appendChild(tdCantidad)
    trMoviento.appendChild(tdMovimiento)
    trMoviento.appendChild(tdUsuario)
    trMoviento.appendChild(tdObservacion)

    tbodyMovimiento.insertBefore(trMoviento, tbodyMovimiento.firstChild)

}

export {
    arqueoInsumo
}