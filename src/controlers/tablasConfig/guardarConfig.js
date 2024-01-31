const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"
import { opcionId } from "../helpers/activos/listasId.js"
import {
    editarArea,
    editarMarca,
    editarTiposActivo,
    editarComponente,
    editarFrecuencia,
    editarProceso,
    editarclasificacionAcivo,
    editarProveedor,
    editarInsumo
} from "./editarConfig.js"

const guardarArea = e => {
    let boton
    const tagName = e.target.tagName.toLowerCase()
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const idTr = boton.getAttribute('idtr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreArea').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre area es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre area es obligatorio' })
    const data = { id: 'area', area: nombre }
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idarea = tr.querySelector('.idArea')
    idarea.value = 'Ar-' + respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    i.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarArea(e) }
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    const estado = tr.querySelector('.estadoArea')
    estado.onblur = e => { opcionId(e) }
    estado.readOnly = false
    estado.setAttribute('opcionId', ' Es-1')
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })

}

const guardarMarca = e => {
    let boton
    const tagName = e.target.tagName.toLowerCase()
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const idTr = boton.getAttribute('idtr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreMarca').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre marca es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre marca es obligatorio' })
    const data = { id: 'marca', marca: nombre }
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idMarca = tr.querySelector('.idMarca')
    idMarca.value = 'Ma-' + respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    i.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarMarca(e) }
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    const estado = tr.querySelector('.estadoMarca')
    estado.onblur = e => { opcionId(e) }
    estado.readOnly = false
    estado.setAttribute('opcionId', ' Es-1')
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const guardarTiposActivo = e => {
    let boton
    const tagName = e.target.tagName.toLowerCase()
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const idTr = boton.getAttribute('idtr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreTipoActivo').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre tipo activo es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre tipo activo es obligatorio' })
    const data = { id: 'tipoActivo', tipoActivo: nombre }
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idTipoActivo = tr.querySelector('.idTipoActivo')
    idTipoActivo.value = 'Ta-' + respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    i.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarTiposActivo(e) }
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    const estado = tr.querySelector('.estadoMarca')
    estado.onblur = e => { opcionId(e) }
    estado.readOnly = false
    estado.setAttribute('opcionId', ' Es-1')
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const guardaComponente = e => {
    let boton
    const tagName = e.target.tagName.toLowerCase()
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const idTr = boton.getAttribute('idtr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreComponente').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre componente es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre componente es obligatorio' })
    const data = { id: 'componente', componente: nombre }
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idComponente = tr.querySelector('.idComponente')
    idComponente.value = 'Com-' + respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    i.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarComponente(e) }
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    const estado = tr.querySelector('.estadoMarca')
    estado.onblur = e => { opcionId(e) }
    estado.readOnly = false
    estado.setAttribute('opcionId', ' Es-1')
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const guardarFrecuencia = e => {
    let boton
    const tagName = e.target.tagName.toLowerCase()
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const idTr = boton.getAttribute('idtr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreFrecuencia').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre frecuencia es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre frecuencia es obligatorio' })
    const dias = tr.querySelector('.diasFrecuencia').value
    if (dias.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Dias es obligatorio' })
    if (dias.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Dias es obligatorio' })
    const data = { id: 'frecuencia', frecuencia: nombre, dias }
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idFrecuencia = tr.querySelector('.idFrecuencia')
    idFrecuencia.value = 'Fre-' + respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    i.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarFrecuencia(e) }
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    const estado = tr.querySelector('.estadoMarca')
    estado.onblur = e => { opcionId(e) }
    estado.readOnly = false
    estado.setAttribute('opcionId', ' Es-1')
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const guardaProceso = e => {
    let boton
    const tagName = e.target.tagName.toLowerCase()
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const idTr = boton.getAttribute('idtr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreProceso').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre proceso es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre proceso es obligatorio' })
    const sigla = tr.querySelector('.siglasProceso').value
    if (sigla.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    if (sigla.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    const data = { id: 'proceso', proceso: nombre, sigla }
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idProceso = tr.querySelector('.idProceso')
    idProceso.value = 'Proc-' + respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    i.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarProceso(e) }
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    const estado = tr.querySelector('.estadoMarca')
    estado.onblur = e => { opcionId(e) }
    estado.readOnly = false
    estado.setAttribute('opcionId', ' Es-1')
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const guardarclasificacionAcivo = e => {
    let boton
    const tagName = e.target.tagName.toLowerCase()
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const idTr = boton.getAttribute('idtr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreClasificacionActivo').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Clasificacion activo es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Clasificacion activo es obligatorio' })
    const sigla = tr.querySelector('.siglasClasificacion').value
    if (sigla.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    if (sigla.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    const data = { id: 'clasificacionActivo', clasificacion: nombre, sigla }
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idClasificacionActivo = tr.querySelector('.idClasificacionActivo')
    idClasificacionActivo.value = 'Cla-' + respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    i.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarclasificacionAcivo(e) }
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    const estado = tr.querySelector('.estadoMarca')
    estado.onblur = e => { opcionId(e) }
    estado.readOnly = false
    estado.setAttribute('opcionId', ' Es-1')
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const guardarProveedor = e => {
    const datosProveedor = document.querySelector('#datosProveedor')

    const nitProveedor = datosProveedor.querySelector('.nitProveedor').value
    const dvProveedor = datosProveedor.querySelector('.dvProveedor').value
    const razonProveedor = datosProveedor.querySelector('.razonProveedor').value
    const nombreProveedor = datosProveedor.querySelector('.nombreProveedor').value
    const contactoProveedor = datosProveedor.querySelector('.contactoProveedor').value
    const telefonosProveedor = datosProveedor.querySelector('.telefonosProveedor').value
    const direccionProveedor = datosProveedor.querySelector('.direccionProveedor').value
    const descripcionProveedor = datosProveedor.querySelector('.descripcionProveedor').value


    if (nitProveedor.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo NIT es obligatorio' })
    if (nitProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo NIT es obligatorio' })

    if (dvProveedor.length < 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo digito de verificacion es obligatorio' })
    if (dvProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo digito de verificacion es obligatorio' })

    if (razonProveedor.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Razon Social es obligatorio' })
    if (razonProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Razon Social es obligatorio' })

    if (nombreProveedor.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Nombre proveedor es obligatorio' })
    if (nombreProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Nombre proveedor es obligatorio' })

    if (contactoProveedor.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Contacto proveedor es obligatorio' })
    if (contactoProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Contacto proveedor es obligatorio' })

    if (telefonosProveedor.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Telefono proveedor es obligatorio' })
    if (telefonosProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Telefono proveedor es obligatorio' })

    if (direccionProveedor.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Direccion proveedor es obligatorio' })
    if (direccionProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Direccion proveedor es obligatorio' })

    if (descripcionProveedor.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Descripcion proveedor es obligatorio' })
    if (descripcionProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Descripcion proveedor es obligatorio' })

    const data = {
        id: 'proveedor',
        nitProveedor,
        dvProveedor,
        razonProveedor,
        proveedor: nombreProveedor,
        contactoProveedor,
        telefonosProveedor,
        direccionProveedor,
        descripcionProveedor
    }

    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idProveedor = datosProveedor.querySelector('.idProveedor')
    idProveedor.value = 'Pro-' + respuesta.id
    const existeBotonCrear = datosProveedor.querySelector('.gridBotonesCrear')
    if (existeBotonCrear !== null) existeBotonCrear.parentElement.removeChild(existeBotonCrear)
    const existeBotonEditar = datosProveedor.querySelector('.gridBotonesEditar')
    if (existeBotonEditar !== null) return
    const gridBortones = document.createElement('div')
    gridBortones.classList.add('col-4', 'align-self-center', 'gridBotonesEditar')
    const contenedorBotones = document.createElement('div')
    contenedorBotones.classList.add('d-flex', 'justify-content-center')
    const botonEditar = document.createElement('button')
    botonEditar.classList.add('btn', 'mt-0', 'pt-0')
    botonEditar.type = 'button'
    botonEditar.title = 'Editar Proveedor'
    const iCrear = document.createElement('i')
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    botonEditar.appendChild(iCrear)
    botonEditar.onclick = e => { editarProveedor(e) }
    contenedorBotones.appendChild(botonEditar)
    gridBortones.appendChild(contenedorBotones)
    datosProveedor.appendChild(gridBortones)
    const dataList = document.querySelector('#listbuscarProveedor')
    const option = document.createElement('option')
    option.value = 'Pro-' + respuesta.id + '--' + nombreProveedor.trim() + '--' + razonProveedor.trim() + '--' + nitProveedor.trim() + '--' + dvProveedor.trim() + '--' + contactoProveedor.trim() + '--' + telefonosProveedor.trim() + '--' + direccionProveedor.trim() + '--' + descripcionProveedor.trim() + '--' + 'Activo'
    option.textContent = respuesta.id
    dataList.appendChild(option)

    datosProveedor.querySelector('.estadoProveedor')
    datosProveedor.readOnly = false
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const guardarInsumo = e => {
    let boton
    const tagName = e.target.tagName.toLowerCase()
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const idTr = boton.getAttribute('idtr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreinsumos').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo del insumo es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo del insumo es obligatorio' })
    const data = { id: 'insumo', insumo: nombre }
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })

    const idInsumo = tr.querySelector('.idinsumos')
    idInsumo.value = 'Ins-' + respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    i.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarInsumo(e) }
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    const estado = tr.querySelector('.estadoinsumos')
    estado.onblur = e => { opcionId(e) }
    estado.readOnly = false
    estado.setAttribute('opcionId', ' Es-1')
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })

}


export {
    guardarArea,
    guardarMarca,
    guardarTiposActivo,
    guardaComponente,
    guardarFrecuencia,
    guardaProceso,
    guardarclasificacionAcivo,
    guardarProveedor,
    guardarInsumo
}