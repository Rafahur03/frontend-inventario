const { ipcRenderer } = require('electron')
import { eliminarLineaComponente } from "./eliminarLineaComponente.js"
import { modalEleccion, modalMensaje } from "../helpers/modalEleccion.js"
import { mostarSnipper, cerrarSnipper } from "../helpers/modalSnipper.js"

const eliminarComponente = async e => {
    const tagName = e.target.tagName.toLowerCase()
    let tr
    let componente
    let activo
    if (tagName === 'i') {
        const button = e.target.parentNode
        tr = button.parentNode.parentNode
        componente = button.getAttribute('componente')
        activo = button.getAttribute('activo')
    } else {
        tr = e.target.parentNode.parentNode
        componente = e.target.getAttribute('componente')
        activo = e.target.getAttribute('activo')
    }

    // realizar la peticion de eliminar de la bd

    const idComponente = componente.split('-')[1]
    const idActivo = activo.split('-')[1]

    const mensaje = {
        titulo: "ELIMINAR COMPONENTE",
        mensaje: "Esta seguro(a) de eliminar el componente. Por favor confirme la accion"
    }

    const eleccion = await modalEleccion(mensaje)
    if (!eleccion) return
    mostarSnipper()
    const eliminando = ipcRenderer.sendSync('eliminarComponente', { idActivo, idComponente });


    if (eliminando.msg) {
        mensaje.titulo = "ERROR"
        mensaje.mensaje = eliminando.msg
        cerrarSnipper()
        modalMensaje(mensaje)
        return
    }

    eliminarLineaComponente(e)
    mensaje.titulo = "EXITO"
    mensaje.mensaje = eliminando
    cerrarSnipper()
    modalMensaje(mensaje)

}

export {
    eliminarComponente
}