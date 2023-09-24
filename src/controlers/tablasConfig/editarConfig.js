const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"

const editarArea = e => {
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
    const idArea = tr.querySelector('.idArea').value
    if (idArea.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id  del Area no valido' })
    if (idArea.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Area no valido'})
    const data = { id: 'area', area: nombre, idArea}
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })

}

const editarMarca = e => {
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
    const idMarca = tr.querySelector('.idMarca').value
    if (idMarca.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Marca no valido' })
    if (idMarca.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Marca no valido'})
    const data = { id: 'marca', marca: nombre, idMarca }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const editarTiposActivo = e => {
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
    if (nombre.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Tipo Activo es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Tipo Activo es obligatorio' })
    const idTipoActivo = tr.querySelector('.idTipoActivo').value
    if (idTipoActivo.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Tipo Activo no valido' })
    if (idTipoActivo.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Tipo Activo no valido'})
   
    const data = { id: 'tipoActivo', tipoActivo: nombre }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const editarComponente = e => {
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
    const idComponente = tr.querySelector('.idComponente').value
    if (idComponente.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Componente no valido' })
    if (idComponente.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Componente  no valido'})
    
    const data = { id: 'componente', componente: nombre, idComponente }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const editarFrecuencia = e => {
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
    const idFrecuencia = tr.querySelector('.idFrecuencia').value
    if (idFrecuencia.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Frecuencia no valido' })
    if (idFrecuencia.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Frecuencia  no valido'})
   
    const data = { id: 'frecuencia', frecuencia: nombre, dias,idFrecuencia }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const editarProceso = e => {
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
     const idProceso = tr.querySelector('.idProceso').value
    if (idProceso.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Proceso no valido' })
    if (idProceso.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Proceso  no valido'})

    const data = { id: 'proceso', proceso: nombre, dias, idProceso }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
   
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const editarclasificacionAcivo = e => {
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
    const idClasificacionActivo = tr.querySelector('.idClasificacionActivo').value
    if (idClasificacionActivo.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Clasificacion Activo no valido' })
    if (idClasificacionActivo.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Clasificacion Activo  no valido'})
   
    const data = { id: 'clasificacionActivo', clasificacion: nombre, sigla, idClasificacionActivo }
    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}

const editarProveedor = e => {
    const datosProveedor = document.querySelector('#datosProveedor')
    const nitProveedor = datosProveedor.querySelector('.nitProveedor').value
    const dvProveedor = datosProveedor.querySelector('.dvProveedor').value
    const razonProveedor = datosProveedor.querySelector('.razonProveedor').value
    const nombreProveedor = datosProveedor.querySelector('.nombreProveedor').value
    const contactoProveedor = datosProveedor.querySelector('.contactoProveedor').value
    const telefonosProveedor = datosProveedor.querySelector('.telefonosProveedor').value
    const direccionProveedor = datosProveedor.querySelector('.direccionProveedor').value
    const descripcionProveedor = datosProveedor.querySelector('.descripcionProveedor').value
    const idProveedor = datosProveedor.querySelector('.idProveedor').value

    if (idProveedor.lenth <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del del proveedor no valido' })
    if (idProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del del proveedor  no valido'})
   
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
        idProveedor,
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

    console.log(data)
    const respuesta = ipcRenderer.sendSync('nuevaConfig', data)
    if (respuesta.msg) modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito })
}




export {
    editarArea,
    editarMarca,
    editarTiposActivo,
    editarComponente,
    editarFrecuencia,
    editarProceso,
    editarclasificacionAcivo,
    editarProveedor
}