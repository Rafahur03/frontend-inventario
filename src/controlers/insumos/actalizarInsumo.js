const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'

const actualizarInsumoBodega = (e, nodo) => {

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
    const modeloInsumo = nodo.querySelector('.modeloInsumo').value
    const areaInsumo = nodo.querySelector('.areaInsumo')
    const marcaInsumo = nodo.querySelector('.marcaInsumo')
    const sereiInsumo = nodo.querySelector('.serieInsumo').value
    const facturaInsumo = nodo.querySelector('.facturaInsumo').value
    const costoInsumo = nodo.querySelector('.costoInsumo').value
    const fechaCompraInsumo = nodo.querySelector('.fechaCompraInsumo').value
    const proveedorInsumo = nodo.querySelector('.proveedorInsumo')
    const areaId = areaInsumo.getAttribute('opcionid')
    const marcaId = marcaInsumo.getAttribute('opcionid')
    const proveedorId = proveedorInsumo.getAttribute('opcionid')

    const data = {
        insumo,
        idInsumno,
        modeloInsumo,
        sereiInsumo,
        facturaInsumo,
        costoInsumo,
        fechaCompraInsumo,
        areaId,
        marcaId,
        proveedorId

    }

    const respuesta = ipcRenderer.sendSync('actualizarInsumo', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })

}

export {
    actualizarInsumoBodega
} 