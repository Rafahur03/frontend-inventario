const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js"


const nuevoActivo = async nodo => {


    const clasificacionActivo = nodo.querySelector('.clasificacionActivo')
    const modeloActivo = nodo.querySelector('.modeloActivo')
    const areaActivo = nodo.querySelector('.areaActivo')
    const nombreActivo = nodo.querySelector('.nombreActivo')
    const serieActivo = nodo.querySelector('.serieActivo')
    const ubicacionActivo = nodo.querySelector('.ubicacionActivo')
    const marcaActivo = nodo.querySelector('.marcaActivo')
    const procesoActivo = nodo.querySelector('.procesoActivo')
    const proveedorActivo = nodo.querySelector('.proveedorActivo')
    const responsableActivo = nodo.querySelector('.responsableActivo')
    const tipoActivo = nodo.querySelector('.tipoActivo')
    const facturaActivo = nodo.querySelector('.facturaActivo')
    const valorActivo = nodo.querySelector('.valorActivo')
    const ingresoActivo = nodo.querySelector('.ingresoActivo')
    const fechaCompra = nodo.querySelector('.fechaCompra')
    const garantiaActivo = nodo.querySelector('.garantiaActivo')
    const frecuenciaMtto = nodo.querySelector('.frecuenciaMtto')
    const proximoMtto = nodo.querySelector('.proximoMtto')
    const descripcionActivo = nodo.querySelector('.descripcionActivo')
    const recomendacionActivo = nodo.querySelector('.recomendacionActivo')
    const observacionActivo = nodo.querySelector('.observacionActivo')
    const carouselInner = nodo.querySelector('.carousel-inner')
    const containerDocumentacion = nodo.querySelector('.containerDocumentacion')
    const componentesbody = nodo.querySelector('.componentes').querySelector('tbody')
    const registroInvimaActivo = nodo.querySelector('.registroInvimaActivo')
    const riesgoActivo = nodo.querySelector('.riesgoActivo')

    const data = {
        clasificacionActivo: clasificacionActivo.value.trim(),
        clasificacionId: clasificacionActivo.getAttribute('opcionId') == 'Cla--1' ? '' : clasificacionActivo.getAttribute('opcionId'),
        modeloActivo: modeloActivo.value.trim(),
        areaActivo: areaActivo.value.trim(),
        areaId: areaActivo.getAttribute('opcionId') == 'Ar--1' ? '' : areaActivo.getAttribute('opcionId'),
        nombreActivo: nombreActivo.value.trim(),
        serieActivo: serieActivo.value.trim(),
        ubicacionActivo: ubicacionActivo.value.trim(),
        marcaActivo: marcaActivo.value.trim(),
        marcaId: marcaActivo.getAttribute('opcionId') == 'Ma--1' ? '' : marcaActivo.getAttribute('opcionId'),
        procesoActivo: procesoActivo.value.trim(),
        procesoId: procesoActivo.getAttribute('opcionId') == 'Pr--1' ? '' : procesoActivo.getAttribute('opcionId'),
        proveedorActivo: proveedorActivo.value.trim(),
        proveedorId: proveedorActivo.getAttribute('opcionId') == 'Pro--1' ? '' : proveedorActivo.getAttribute('opcionId'),
        responsableActivo: responsableActivo.value.trim(),
        responsableId: responsableActivo.getAttribute('opcionId') == 'Re--1' ? '' : responsableActivo.getAttribute('opcionId'),
        tipoActivo: tipoActivo.value.trim(),
        tipoId: tipoActivo.getAttribute('opcionId') == 'Ta--1' ? '' : tipoActivo.getAttribute('opcionId'),
        facturaActivo: facturaActivo.value.trim(),
        valorActivo: valorActivo.value.trim(),
        ingresoActivo: ingresoActivo.value,
        fechaCompra: fechaCompra.value,
        garantiaActivo: garantiaActivo.value,
        frecuenciaMtto: frecuenciaMtto.value.trim(),
        frecuecniaId: frecuenciaMtto.getAttribute('opcionId') == 'Fr--1' ? '' : frecuenciaMtto.getAttribute('opcionId'),
        proximoMtto: proximoMtto.value,
        descripcionActivo: descripcionActivo.value.trim(),
        recomendacionActivo: recomendacionActivo.value.trim(),
        observacionActivo: observacionActivo.value.trim(),
        registroActivo: registroInvimaActivo.value,
        riesgoId: riesgoActivo.getAttribute('opcionId'),
        riesgoActivo: riesgoActivo.value
    }

    const timestamp = Date.now();
    const fechaActual = new Date(timestamp).toISOString().substring(0, 10)

    if (data.ingresoActivo == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo fecha de ingreso es obligatorio' })
    if (data.fechaCompra == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo fecha de compra es obligatorio' })
    if (data.garantiaActivo == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo fecha de vencimiento de la garantia es obligatorio' })
    if (data.proximoMtto == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo fecha de proximo mantenimiento es obligatorio' })

    if (data.ingresoActivo !== fechaActual) return modalMensaje({ titulo: 'ERROR', mensaje: 'La fecha de ingreso no puede ser diferente del dia de hoy' })
    if (data.fechaCompra > fechaActual) return modalMensaje({ titulo: 'ERROR', mensaje: 'La fecha de compra no puede ser superior al dia de hoy' })
    if (data.garantiaActivo < data.fechaCompra) return modalMensaje({ titulo: 'ERROR', mensaje: 'la fecha de vencimiento de la garantia no puede ser menor a la fecha de compra' })
    if (data.proximoMtto < fechaActual) return modalMensaje({ titulo: 'ERROR', mensaje: 'la fecha del proximo mantenimeinto no puede ser inferior a el dia de hoy' })

    const keys = Object.keys(data);

    for (let key of keys) {
        if (key !== 'observacionActivo' && key !== 'descricaoActivo' && key !== 'recomendaActivo'&& key !== 'registroActivo') {
            if (data[key] == '') {
                if (key.includes('Id')) {
                    return modalMensaje({ titulo: 'ERROR', mensaje: ` EL campo '${key.replace('Id', '').toUpperCase()} debe escoger un item de la lista` })
                    break
                } else {
                    return modalMensaje({ titulo: 'ERROR', mensaje: ` EL campo '${key.replace('Activo', '').toUpperCase()} obligatorio` })
                    break
                }
            }
        }
    }

    data.documentos = {}
    data.imagenes = []
    data.componentes = []

    const imagenes = carouselInner.querySelectorAll('img')
    if (imagenes.length < 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'El activo debe tener al menos una imagen' })
    imagenes.forEach(element => {
        if (element.src.includes('data:image/')) data.imagenes.push(element.src)
    });

    const documentos = containerDocumentacion.querySelectorAll('embed')
    documentos.forEach(element => {
        const tipo = element.getAttribute('tipo')
        if (element.src.includes('application/pdf;base64')) data.documentos[tipo] = element.src
    });


    const componentes = componentesbody.querySelectorAll('tr')
    if (componentes.length > 0) {
        componentes.forEach(element => {
            const nombre = element.querySelector('.nombrecomponente')
            const marca = element.querySelector('.marcaComponente')
            if (nombre.value.trim() !== '' || marca.value.trim() !== '') {
                data.componentes.push({
                    nombre: nombre.value,
                    idNombre: nombre.getAttribute('opcionId'),
                    marca: marca.value,
                    idmarca: marca.getAttribute('opcionId'),
                    modelo: element.querySelector('.modeloComponente').value,
                    serie: element.querySelector('.serieComponente').value,
                    capacidad: element.querySelector('.capacidadComponente').value
                })
            }
        });
    }

    const guardar = ipcRenderer.sendSync('crearActivo', data)

    if (guardar.msg) return modalMensaje({ titulo: 'error', mensaje: guardar.msg })
    cargarTapContenido('editarActivo', guardar.id)

}

export {
    nuevoActivo
}