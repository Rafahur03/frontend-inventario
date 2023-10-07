const { ipcRenderer } = require('electron')
import { modalEleccion, modalMensaje } from '../helpers/modalEleccion.js'
import { mostarSpinner, cerrarSpinner } from '../helpers/modalSpinner.js'

const guardarEditarActivo = async e => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const contenedorBotones = boton.parentNode.parentNode
    const form = contenedorBotones.nextSibling.nextSibling
    const activo = boton.getAttribute('activo')
    const codigoInterno = form.querySelector('.codigoInterno')
    const modeloActivo = form.querySelector('.modeloActivo')
    const areaActivo = form.querySelector('.areaActivo')
    const nombreActivo = form.querySelector('.nombreActivo')
    const serieActivo = form.querySelector('.serieActivo')
    const ubicacionActivo = form.querySelector('.ubicacionActivo')
    const marcaActivo = form.querySelector('.marcaActivo')
    const procesoActivo = form.querySelector('.procesoActivo')
    const estadoActivo = form.querySelector('.estadoActivo')
    const proveedorActivo = form.querySelector('.proveedorActivo')
    const nitProveedor = form.querySelector('.nitProveedor')
    const responsableActivo = form.querySelector('.responsableActivo')
    const tipoActivo = form.querySelector('.tipoActivo')
    const facturaActivo = form.querySelector('.facturaActivo')
    const valorActivo = form.querySelector('.valorActivo')
    const ingresoActivo = form.querySelector('.ingresoActivo')
    const fechaCompra = form.querySelector('.fechaCompra')
    const garantiaActivo = form.querySelector('.garantiaActivo')
    const frecuenciaMtto = form.querySelector('.frecuenciaMtto')
    const proximoMtto = form.querySelector('.proximoMtto')
    const descripcionActivo = form.querySelector('.descripcionActivo')
    const recomendacionActivo = form.querySelector('.recomendacionActivo')
    const observacionActivo = form.querySelector('.observacionActivo')
    const registroInvimaActivo = form.querySelector('.registroInvimaActivo')
    const riesgoActivo = form.querySelector('.riesgoActivo')


    const data = {
        activo,
        codigoInterno: codigoInterno.value,
        modeloActivo: modeloActivo.value,
        areaActivo: areaActivo.value,
        areaId: areaActivo.getAttribute('opcionId'),
        nombreActivo: nombreActivo.value,
        serieActivo: serieActivo.value,
        ubicacionActivo: ubicacionActivo.value,
        marcaActivo: marcaActivo.value,
        marcaId: marcaActivo.getAttribute('opcionId'),
        procesoActivo: procesoActivo.value,
        procesoId: procesoActivo.getAttribute('opcionId'),
        estadoActivo: estadoActivo.value,
        estadoId: estadoActivo.getAttribute('opcionId'),
        proveedorActivo: proveedorActivo.value,
        proveedorId: proveedorActivo.getAttribute('opcionId'),
        responsableActivo: responsableActivo.value,
        responsableId: responsableActivo.getAttribute('opcionId'),
        tipoActivo: tipoActivo.value,
        tipoId: tipoActivo.getAttribute('opcionId'),
        facturaActivo: facturaActivo.value,
        valorActivo: valorActivo.value,
        ingresoActivo: ingresoActivo.value,
        fechaCompra: fechaCompra.value,
        garantiaActivo: garantiaActivo.value,
        frecuenciaMtto: frecuenciaMtto.value,
        frecuecniaId: frecuenciaMtto.getAttribute('opcionId'),
        proximoMtto: proximoMtto.value,
        descripcionActivo: descripcionActivo.value,
        recomendacionActivo: recomendacionActivo.value,
        observacionActivo: observacionActivo.value,
        registroActivo: registroInvimaActivo.value,
        riesgoId: riesgoActivo.getAttribute('opcionId'),
        riesgoActivo: riesgoActivo.value
    }
    
    const mensaje = {
        titulo: "ACTUALIZAR ACTIVO",
        mensaje: "Esta seguro(a) de actualizar los datos del activo, favor Confirme la accion"
    }

    const eleccion = await modalEleccion(mensaje)
    if (!eleccion) return

    const actualizar = ipcRenderer.sendSync('actualizarDatosActivos', data);
    if (actualizar.msg) return modalMensaje({ titulo: "ERROR", mensaje: actualizar.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: actualizar.exito })
    const activoActualizado = actualizar.activo

    codigoInterno.value = activoActualizado.codigo
    codigoInterno.setAttribute('codigo-activo', `Act-${activoActualizado.id}`)
    form.setAttribute('form-activo', `Act-${activoActualizado.id}`)
    modeloActivo.value = activoActualizado.modelo
    areaActivo.value = activoActualizado.area
    areaActivo.setAttribute('opcionId', `Ar-${activoActualizado.area_id}`)
    nombreActivo.value = activoActualizado.nombre
    serieActivo.value = activoActualizado.serie
    ubicacionActivo.value = activoActualizado.ubicacion
    marcaActivo.value = activoActualizado.marca
    marcaActivo.setAttribute('opcionId', `Ma-${activoActualizado.marca_id}`)
    procesoActivo.value = activoActualizado.proceso
    procesoActivo.setAttribute('opcionId', `Pr-${activoActualizado.proceso_id}`)
    estadoActivo.value = activoActualizado.estado
    estadoActivo.setAttribute('opcionId', `Es-${activoActualizado.estado_id}`)
    proveedorActivo.value = activoActualizado.provedor
    proveedorActivo.setAttribute('opcionId', `Pro-${activoActualizado.proveedor_id}`)
    nitProveedor.value = activoActualizado.nit
    responsableActivo.value = activoActualizado.responsable
    responsableActivo.setAttribute('opcionId', `Re-${activoActualizado.responsableId}`)
    tipoActivo.value = activoActualizado.tipoActivo
    tipoActivo.setAttribute('opcionId', `Ta-${activoActualizado.tipo_activo_id}`)
    facturaActivo.value = activoActualizado.numero_factura
    valorActivo.value = activoActualizado.valor
    ingresoActivo.value = activoActualizado.fecha_creacion
    fechaCompra.value = activoActualizado.fecha_compra
    garantiaActivo.value = activoActualizado.vencimiento_garantia
    frecuenciaMtto.value = activoActualizado.frecuencia
    frecuenciaMtto.setAttribute('opcionId', `Fr-${activoActualizado.frecuencia_id}`)
    proximoMtto.value = activoActualizado.fecha_proximo_mtto
    descripcionActivo.value = activoActualizado.descripcion
    recomendacionActivo.value = activoActualizado.recomendaciones_Mtto
    observacionActivo.value = activoActualizado.obervacion
    registroInvimaActivo.value = activoActualizado.invima
    riesgoActivo.value = activoActualizado.riesgo
    riesgoActivo.setAttribute('opcionId', `Ris-${activoActualizado.riesgoId}`)
}


export {
    guardarEditarActivo
}