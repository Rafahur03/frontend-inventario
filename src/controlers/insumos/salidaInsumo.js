const { ipcRenderer } = require('electron')
import { modalMensaje, modalEleccion } from '../helpers/modalEleccion.js'

const salidaInsumo = async (e, nodo) => {

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
    const usuario = nodo.querySelector('.usuarioDestino')
    const usuarioDestino = usuario.getAttribute('opcionId')
    if(cantidad.value == '' || isNaN(parseFloat(cantidad.value))) return modalMensaje({titulo:'ERROR', mensaje:'El campo cantidad no puede estar vacio y debe ser un numero'})
    if(ObservacionesInsumo.value == '') return modalMensaje({titulo:'ERROR', mensaje:'El campo observación no puede estar vacio'})
    if(parseFloat(cantidad.value) > parseFloat(cantidadActual)) return  modalMensaje({titulo:'ERROR', mensaje:'La cantidad a mover no puede ser mayor a la cantidad actual en inventario'})
    if(usuarioDestino == 'Us--0') return modalMensaje({titulo:'ERROR', mensaje: 'El campo usuario es obligatorio'})

    const eleccion = await  modalEleccion({titulo:'SALIDA INSUMO', mensaje:`Esta seguro(a) de realizar la Salida del insumo por ${cantidad.value} Unidades`})

    if (!eleccion) return
    const salida = {
        insumo,
        idInsumno,
        cantidad:cantidad.value,
        ObservacionesInsumo:ObservacionesInsumo.value,
        usuarioDestino
    }

    const respuesta = ipcRenderer.sendSync('salidaInsumo', salida)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })

    cantidad.value = null
    ObservacionesInsumo.value = ''
    usuario.value =''
    usuario.setAttribute('opcionId','us--0')

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
    tdCantidad.classList.add('text-danger')
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
    salidaInsumo
}