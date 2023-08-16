const { ipcRenderer } = require('electron')
import { modalEleccion, modalMensaje } from "../helpers/modalEleccion.js"
import { mostarSpinner, cerrarSpinner } from "../helpers/modalSpinner.js"
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js"
const eliminarActivo = async e => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    } 

    const contendorbotones = boton.parentNode.parentNode
    const form = contendorbotones.nextSibling.nextSibling
    const codigo = form.querySelector('.codigoInterno').value
    const nombre = form.querySelector('.nombreActivo').value
    const activo = boton.getAttribute('activo')

    const eleccion = await  modalEleccion({titulo:'ELIMINAR ACTIVO', mensaje:`Esta seguro(a) de eliminar el activo ${codigo} - ${nombre} ESTA ACCION ES IRREVERSIBLE Y PERDERA TODOS LOS DATOS DEL ACTIVO`})

    if (!eleccion) return
    mostarSpinner()
    const eliminar = ipcRenderer.sendSync('eliminarActivo', {activo, codigo});


    if (eliminar.msg) {
        mensaje.titulo = "ERROR"
        mensaje.mensaje = eliminar.msg
        cerrarSpinner()
        modalMensaje(mensaje)
        return
    }

    cerrarSpinner()
    modalMensaje({titulo: 'EXITO', mensaje: eliminar.exito})  

    cargarTapContenido('listadoActivo')
}

export {
    eliminarActivo
}