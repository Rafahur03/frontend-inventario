
const { ipcRenderer } = require('electron')
import { modalMensaje, modalEleccion } from "../helpers/modalEleccion.js"
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js"

const modificarReporte = async (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const reporteId = boton.getAttribute('reporte')
    const codigo = nodo.querySelector('.idActivo').value
    const idSolicitud = nodo.querySelector('.idSolicitud').value
    const estadoActivo = nodo.querySelector('.estadoActivo').value
    const tipoMantenimiento = nodo.querySelector('.tipoMantenimiento').value
    const provedorMtto = nodo.querySelector('.provedorMtto').value
    const recibidoConforme = nodo.querySelector('.recibidoConforme').value
    const estadoSolicitud = nodo.querySelector('.estadoSolicitud').value
    const fechaReporte = nodo.querySelector('.fechaReporte').value
    const fechaSolicitud = nodo.querySelector('.fechaSolicitud').value
    const fechaproximoMtto = nodo.querySelector('.fechaproximoMtto').value 
    const hallazgos = nodo.querySelector('.descripcionHallazgos').value
    const reporte = nodo.querySelector('.descripcionReporte').value
    const recomendaciones = nodo.querySelector('.recomendaciones').value
    const costoMo = nodo.querySelector('.costoMo').value
    const costoMp = nodo.querySelector('.costoMp').value
    const estadoActivoId= nodo.querySelector('.estadoActivo').getAttribute('opcionId')
    const tipoMantenimientoId= nodo.querySelector('.tipoMantenimiento').getAttribute('opcionId')
    const provedorMttoId= nodo.querySelector('.provedorMtto').getAttribute('opcionId')
    const recibidoConformeId= nodo.querySelector('.recibidoConforme').getAttribute('opcionId')
    const realizoReporteId= nodo.querySelector('.usuarioReporte').getAttribute('opcionId')
    const estadoSolicitudId= nodo.querySelector('.estadoSolicitud').getAttribute('opcionId')




    if (recomendaciones.length < 0) {
        return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo recomendaciones es obligatorio' })
    } else {
        if (recomendaciones.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo recomendaciones es obligatorio' })
    }

    if (reporte.length < 0) {
        return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo reporte es obligatorio' })
    } else {
        if (reporte.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo reporte es obligatorio' })
    }

    if (hallazgos.length < 0) {
        return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo hallazgos es obligatorio' })
    } else {
        if (hallazgos.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo hallazgos es obligatorio' })
    }

    if (costoMo.length < 0) {
        return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo costo de mano de obra es obligatorio' })
    } else {
        if (costoMo.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo costo de mano de obra es obligatorio' })
    }

    if (costoMp.length < 0) {
        return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo costo de materia prima es obligatorio' })
    } else {
        if (costoMp.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo costo de materia prima es obligatorio' })
    }

    if (costoMp.length < 0) {
        return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo costo de materia prima es obligatorio' })
    } else {
        if (costoMp.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo costo de materia prima es obligatorio' })
    }

    if (tipoMantenimientoId.includes('--')) return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo tipo de mantenimiento es obligatorio' })

    if (provedorMttoId.includes('--')) return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo proveedor de mantenimiento es obligatorio' })

    if (recibidoConformeId.includes('--')) return modalMensaje({ titulo: 'ERROR', mensaje: 'el campo recibido conforme es obligatorio' })

    const fecha = new Date
 
    if (fechaReporte == fecha.toJSON().slice(0, 10)) {
        const eleccion = await modalEleccion({ titulo: 'Advertencia', mensaje: 'La fecha del reporte será tomada como el ' + fechaReporte +' y la del proximo Mantenimeinto el '+ fechaproximoMtto + ' ya se que no se ha seleccionado otra' })
        if(!eleccion) return
    }  

    if (fechaReporte > fecha.toJSON().slice(0, 10)) return modalMensaje({ titulo: 'ERROR', mensaje: 'La fecha del reporte no puede ser mayor al dia de hoy' })

    if (fechaReporte < fechaSolicitud) return modalMensaje({ titulo: 'ERROR', mensaje: 'La fecha del reporte no puede ser menor a la fecha de solicitud' })

    if (fechaproximoMtto < fechaReporte) return modalMensaje({ titulo: 'ERROR', mensaje: 'La fecha del proximo mantenimeinto no puede ser menor a la fecha de reporte' })

    const data = {
        reporteId,
        codigo,
        idSolicitud,
        estadoActivoId,
        estadoActivo,
        tipoMantenimientoId,
        tipoMantenimiento,
        provedorMttoId,
        provedorMtto,
        recibidoConformeId,
        realizoReporteId,
        recibidoConforme,
        estadoSolicitudId,
        estadoSolicitud,
        fechaReporte,
        hallazgos,
        reporte,
        recomendaciones,
        costoMo,
        costoMp,
        fechaproximoMtto
    }

    const respuesta = ipcRenderer.sendSync('editarReporte', data) 
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
    cargarTapContenido('consultarReporte', respuesta.idReporte)
    //editarReporte(respuesta.idReporte)

}

export {
    modificarReporte
}