import { modalEleccion } from "../helpers/modalEleccion.js"
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js"
const eliminarSolicitud = async (e, seccion) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const solicitud = boton.getAttribute('solicitud')
    const codigo = seccion.querySelector('.idActivo').value
    const idSolicitud = seccion.querySelector('.idSolicitud')

    const eleccion = await modalEleccion({ titulo: 'ELIMINAR SOLICITUD', mensaje: `Esta seguro(a) de eliminar la solicitud numero ${solicitud} esta accion es irreversible` })

    if (!eleccion) return
    mostarSpinner()

    const data = {
        solicitud,
        codigo,
        idSolicitud
    }
    const eliminar = ipcRenderer.sendSync('eliminarSolicitud', data);


    if (eliminar.msg) {
        mensaje.titulo = "ERROR"
        mensaje.mensaje = eliminar.msg
        cerrarSpinner()
        modalMensaje(mensaje)
        return
    }

    cerrarSpinner()
    modalMensaje({ titulo: 'EXITO', mensaje: eliminar.exito })

    cargarTapContenido('listadoSolicitud')
}

export {
    eliminarSolicitud
}