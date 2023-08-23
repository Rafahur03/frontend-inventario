const { ipcRenderer } = require('electron')
import { modalMensaje, modalEleccion } from "../helpers/modalEleccion.js"
import { abrirDatosNuevo } from "../helpers/abrirDatos.js"
import { editarReporte } from "../manejoTap/contenidoTap/editarReporte.js"

const nuevoReporte = async (e, nodo) => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const solicitud = boton.getAttribute('solicitud')
    const codigo = nodo.querySelector('.codigoInterno').value
    const idSolicitud = nodo.querySelector('.idSolicitud').value
    const estadoActivo = nodo.querySelector('.estadoActivo').value
    const tipoMantenimiento = nodo.querySelector('.tipoMantenimiento').value
    const provedorMtto = nodo.querySelector('.provedorMtto').value
    const recibidoConforme = nodo.querySelector('.recibidoConforme').value
    const estadoSolicitud = nodo.querySelector('.estadoSolicitud').value
    const fechaReporte = nodo.querySelector('.fechaReporte').value
    const fechaSolicitud = nodo.querySelector('.fechaSolicitud').value
    const hallazgos = nodo.querySelector('.descripcionHallazgos').value
    const reporte = nodo.querySelector('.descripcionReporte').value
    const recomendaciones = nodo.querySelector('.recomendaciones').value
    const costoMo = nodo.querySelector('.costoMo').value
    const costoMp = nodo.querySelector('.costoMp').value
    const contenedorImagenes = nodo.querySelector('.imagenesReporte')
    const estadoActivoId= nodo.querySelector('.estadoActivo').getAttribute('opcionId')
    const tipoMantenimientoId= nodo.querySelector('.tipoMantenimiento').getAttribute('opcionId')
    const provedorMttoId= nodo.querySelector('.provedorMtto').getAttribute('opcionId')
    const recibidoConformeId= nodo.querySelector('.recibidoConforme').getAttribute('opcionId')
    const estadoSolicitudId= nodo.querySelector('.estadoSolicitud').getAttribute('opcionId')
    const listImagenes = contenedorImagenes.querySelectorAll('img')


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
        const eleccion = await modalEleccion({ titulo: 'Advertencia', mensaje: 'La fecha del reporte será tomada como el dia de hoy ya que no se selecciono una' })
        if(!eleccion) return
    }

    if (fechaReporte > fecha.toJSON().slice(0, 10)) return modalMensaje({ titulo: 'ERROR', mensaje: 'La fecha del reporte no puede ser mayor al dia de hoy' })

    if (fechaReporte < fechaSolicitud) return modalMensaje({ titulo: 'ERROR', mensaje: 'La fecha del reporte no puede ser menor a la fecha de solicitud' })


    let imagenes = []
    if (listImagenes.length > 0) {
        if (listImagenes.length > 4) return modalMensaje({ titulo: 'ERROR', mensaje: 'Solo puede cargar un maximo de 4 imagenes' })
        for (let i = 0; i < listImagenes.length; i++) {
            imagenes.push(listImagenes[i].src)
        }

    }

    const data = {
        solicitud,
        codigo,
        idSolicitud,
        estadoActivoId,
        estadoActivo,
        tipoMantenimientoId,
        tipoMantenimiento,
        provedorMttoId,
        provedorMtto,
        recibidoConformeId,
        recibidoConforme,
        estadoSolicitudId,
        estadoSolicitud,
        fechaReporte,
        hallazgos,
        reporte,
        recomendaciones,
        costoMo,
        costoMp,
        imagenes

    }

    const nuevoReporte = ipcRenderer.sendSync('nuevoReporte', data)
    if (nuevoReporte.msg) return modalMensaje({ titulo: 'ERROR', mensaje: nuevoReporte.msg })

    return console.log(nuevoReporte)

    abrirDatosNuevo('Rep')
    editarReporte(55555)

}

export {
    nuevoReporte
}