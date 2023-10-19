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
    const idTr = boton.getAttribute('idTr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreArea').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre area es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre area es obligatorio' })
    const idArea = tr.querySelector('.idArea').value
    if (idArea.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id  del Area no valido' })
    if (idArea.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Area no valido'})
    const estadoArea = tr.querySelector('.estadoArea')
    const estado = estadoArea.getAttribute('opcionId')
    if (estado.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'el Estado del Area no es valido' })
    if (estado.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El estado del Area no es valido'})
    const data = { id: 'area', area: nombre, idArea, estado}
    const respuesta = ipcRenderer.sendSync('editarConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
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
    const idTr = boton.getAttribute('idTr');
    const tr = document.querySelector('#' + idTr)
    const nombre = tr.querySelector('.nombreMarca').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre marca es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre marca es obligatorio' })
    const idMarca = tr.querySelector('.idMarca').value
    if (idMarca.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Marca no valido' })
    if (idMarca.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Marca no valido'})
    const estadMarca = tr.querySelector('.estadoMarca')
    const estado = estadMarca.getAttribute('opcionId')
    if (estado.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'El Estado de la Marca no es valido' })
    if (estado.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El estado de la Marca no es valido'})
    const data = { id: 'marca', marca: nombre, idMarca, estado }
    const respuesta = ipcRenderer.sendSync('editarConfig', data)
    if (respuesta.msg) return  modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
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
    const idTr = boton.getAttribute('idTr');
    const tr = document.querySelector('#' + idTr)   
    const nombre = tr.querySelector('.nombretipoActivo').value
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Tipo Activo es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Tipo Activo es obligatorio' })
    const idTipoActivo = tr.querySelector('.idTipoActivo').value
    if (idTipoActivo.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Tipo Activo no valido' })
    if (idTipoActivo.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Tipo Activo no valido'})
    const estadoTipoActivo = tr.querySelector('.estadotipoActivo')
    const estado = estadoTipoActivo.getAttribute('opcionId')
    if (estado.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'El Estado del Tipo de activo no es valido' })
    if (estado.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El estado del Tipo de activo no es valido'})
    const data = { id: 'tipoActivo', tipoActivo: nombre, idTipoActivo, estado  }
    const respuesta = ipcRenderer.sendSync('editarConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
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
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre componente es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre componente es obligatorio' })
    const idComponente = tr.querySelector('.idComponente').value
    if (idComponente.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Componente no valido' })
    if (idComponente.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Componente  no valido'})
    const estadoComponente = tr.querySelector('.estadoComponente')
    const estado = estadoComponente.getAttribute('opcionId')
    if (estado.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'El Estado del Componente no es valido' })
    if (estado.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El estado del Componente no es valido'})
    
    const data = { id: 'componente', componente: nombre, idComponente, estado }
    const respuesta = ipcRenderer.sendSync('editarConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
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
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' El campo nombre frecuencia es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' El campo nombre frecuencia es obligatorio' })
    const dias = tr.querySelector('.diasFrecuencia').value
    if (dias.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' El campo Dias es obligatorio' })
    if (dias.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' El campo Dias es obligatorio' })
    const idFrecuencia = tr.querySelector('.idFrecuencia').value
    if (idFrecuencia.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id de la Frecuencia no valido' })
    if (idFrecuencia.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id de la Frecuencia  no valido'})
    const estadoFrecuencia = tr.querySelector('.estadoFrecuencia')
    const estado = estadoFrecuencia.getAttribute('opcionId')
    if (estado.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'El Estado de la Frecuencia no es valido' })
    if (estado.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El estado de la Frecuencia no es valido'})
    
    const data = { id: 'frecuencia', frecuencia: nombre, dias,idFrecuencia, estado }
    const respuesta = ipcRenderer.sendSync('editarConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    
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
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre proceso es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre proceso es obligatorio' })
    const sigla = tr.querySelector('.siglasProceso').value
    if (sigla.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    if (sigla.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
     const idProceso = tr.querySelector('.idProceso').value
    if (idProceso.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Proceso no valido' })
    if (idProceso.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Proceso  no valido'})
    const estadoProceso = tr.querySelector('.estadoProceso')
    const estado = estadoProceso.getAttribute('opcionId')
    if (estado.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'El Estado del Proceso no es valido' })
    if (estado.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El estado del Proceso no es valido'})
    
    const data = { id: 'proceso', proceso: nombre, sigla, idProceso, estado }

    const respuesta = ipcRenderer.sendSync('editarConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
   
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
    if (nombre.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Clasificacion activo es obligatorio' })
    if (nombre.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo nombre Clasificacion activo es obligatorio' })
    const sigla = tr.querySelector('.siglasClasificacion').value
    if (sigla.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    if (sigla.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: ' el campo siglas es obligatorio' })
    const idClasificacionActivo = tr.querySelector('.idClasificacionActivo').value
    if (idClasificacionActivo.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Clasificacion Activo no valido' })
    if (idClasificacionActivo.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del Clasificacion Activo  no valido'})
    const estadoClasificacionActivo = tr.querySelector('.estadoClasificacionActivo')
    const estado = estadoClasificacionActivo.getAttribute('opcionId')
    if (estado.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'El Estado de la Clasificacion Activo  no es valido' })
    if (estado.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El estado de la Clasificacion Activo no es valido'})
    
    const data = { id: 'clasificacionActivo', clasificacion: nombre, sigla, idClasificacionActivo, estado }

    const respuesta = ipcRenderer.sendSync('editarConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
    
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
    const estadoProveedor = datosProveedor.querySelector('.estadoProveedor')
    const estado = estadoProveedor.getAttribute('opcionId')
    
    if (idProveedor.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del del proveedor no valido' })
    if (idProveedor.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'Id del del proveedor  no valido'})
   
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
    
    if (estado.length <= 1) return modalMensaje({ titulo: 'ERROR', mensaje: 'El Estado del Proveedor  no es valido' })
    if (estado.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'El estado del Proveedor no es valido'})

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
        descripcionProveedor,
        estado
    }
    const respuesta = ipcRenderer.sendSync('editarConfig', data)
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
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