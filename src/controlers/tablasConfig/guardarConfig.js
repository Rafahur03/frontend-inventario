const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"
import { editarArea,
    editarMarca,
    editarTiposActivo,
    editarComponente,
    editarFrecuencia,
    editarProceso,
    editarclasificacionAcivo,
    editarProveedor } from "./editarConfig.js"

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
    if (nombre.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre area es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre area es obligatorio' })
    const data = { id: 'area', area:nombre }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg)  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idarea = tr.querySelector('.idArea').value
    idarea = respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarArea(e)}
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})
    
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
    if (nombre.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre marca es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre marca es obligatorio' })
    const data = { id: 'marca',marca: nombre }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg)  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idMarca = tr.querySelector('.idMarca').value
    idMarca = respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarMarca(e)}
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})
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
    if (nombre.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre tipo activo es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre tipo activo es obligatorio' })
    const data = { id: 'tipoActivo', tipoActivo:nombre }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg)  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idTipoActivo = tr.querySelector('.idTipoActivo').value
    idTipoActivo = respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarTiposActivo(e)}
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})
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
    if (nombre.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre componente es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre componente es obligatorio' })
    const data = { id: 'componente', componente:nombre }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg)  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idComponente = tr.querySelector('.idComponente').value
    idComponente = respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarComponente(e)}
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})
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
    if (nombre.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre frecuencia es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre frecuencia es obligatorio' })
    const dias = tr.querySelector('.frecuenciaDias').value
    if (dias.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Dias es obligatorio' })
    if (dias.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Dias es obligatorio' })
    const data = { id: 'frecuencia', frecuencia:nombre, dias }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg)  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idFrecuencia = tr.querySelector('.idFrecuencia').value
    idFrecuencia = respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarFrecuencia(e)}
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})
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
    if (nombre.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre proceso es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre proceso es obligatorio' })
    const dias = tr.querySelector('.siglasProceso').value
    if (dias.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    if (dias.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    const data = { id: 'proceso', proceso:nombre, dias }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg)  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idProceso = tr.querySelector('.idProceso').value
    idProceso = respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarProceso(e)}
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})
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
    if (nombre.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Clasificacion activo es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Clasificacion activo es obligatorio' })
    console.log(tr)
    const sigla = tr.querySelector('.siglasClasificacion').value
    if (sigla.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    if (sigla.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    const data = { id: 'clasificacionActivo', clasificacion:nombre, sigla }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg)  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idClasificacionActivo = tr.querySelector('.idClasificacionActivo').value
    idClasificacionActivo = respuesta.id
    const i = boton.firstElementChild
    i.className = ''
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    boton.onclick = e => { editarclasificacionAcivo(e)}
    const tbody = tr.parentNode
    tbody.removeChild(tr)
    tbody.appendChild(tr)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})
}
const  guardarProveedor = e => {
    const datosProveedor = document.querySelector('#datosProveedor')
    
    const nitProveedor = datosProveedor.querySelector('.nitProveedor').value
    const dvProveedor = datosProveedor.querySelector('.dvProveedor').value
    const razonProveedor = datosProveedor.querySelector('.razonProveedor').value
    const nombreProveedor = datosProveedor.querySelector('.nombreProveedor').value
    const contactoProveedor = datosProveedor.querySelector('.contactoProveedor').value
    const telefonosProveedor = datosProveedor.querySelector('.telefonosProveedor').value
    const direccionProveedor = datosProveedor.querySelector('.direccionProveedor').value
    const descripcionProveedor = datosProveedor.querySelector('.descripcionProveedor').value

    
    if (nitProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo NIT es obligatorio' })
    if (nitProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo NIT es obligatorio' })
    
    if (dvProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo digito de verificacion es obligatorio' })
    if (dvProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo digito de verificacion es obligatorio' })
    
    if (razonProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Razon Social es obligatorio' })
    if (razonProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Razon Social es obligatorio' })
    
    if (nombreProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Nombre proveedor es obligatorio' })
    if (nombreProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Nombre proveedor es obligatorio' })
    
    if (contactoProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Contacto proveedor es obligatorio' })
    if (contactoProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Contacto proveedor es obligatorio' })
    
    if (telefonosProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Telefono proveedor es obligatorio' })
    if (telefonosProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Telefono proveedor es obligatorio' })
    
    if (direccionProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Direccion proveedor es obligatorio' })
    if (direccionProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Direccion proveedor es obligatorio' })
    
    if (descripcionProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Descripcion proveedor es obligatorio' })
    if (descripcionProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo Descripcion proveedor es obligatorio' })
    
    const data = {
        id:'proveedor',
        nitProveedor,
        dvProveedor,
        razonProveedor,
        proveedor: nombreProveedor,
        contactoProveedor,
        telefonosProveedor,
        direccionProveedor,
        descripcionProveedor
    }

    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg)  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    const idProveedor = datosProveedor.querySelector('.idProveedor').value
    idProveedor = respuesta.id
    const existeBotonCrear = datosProveedor.querySelector('.gridBotonesCrear')
    if(existeBotonCrear !== null)  existeBotonCrear.parentElement.removeChild(existeBotonCrear)
    const existeBotonEditar = datosProveedor.querySelector('.gridBotonesEditar')
    if(existeBotonEditar !== null) return 
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
    botonEditar.onclick = e =>{ editarProveedor(e)}
    contenedorBotones.appendChild(botonEditar)
    gridBortones.appendChild(contenedorBotones)
    datosProveedor.appendChild(gridBortones)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})
}




export {
    guardarArea,
    guardarMarca,
    guardarTiposActivo,
    guardaComponente,
    guardarFrecuencia,
    guardaProceso,
    guardarclasificacionAcivo,
    guardarProveedor
}