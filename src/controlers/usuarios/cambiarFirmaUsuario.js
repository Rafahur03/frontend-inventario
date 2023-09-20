
const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"
const cambiarFirmaUsuario = (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const img = boton.parentNode.previousSibling
    const firma = img.src
    const usuario = nodo.querySelector('.editarUsuario').getAttribute('usuario')
    const id = nodo.querySelector('.numeroDocumento').value

    const data = {
        usuario,
        id,
        firma,
    }
  
    const respuesta = ipcRenderer.sendSync('cambiarFirma', data);
    if (respuesta.msg) return modalMensaje({ titulo: 'ERROR', mensaje: respuesta.msg })
  
    const contenedorBoton = boton.parentNode
    contenedorBoton.removeChild(boton)
    const contenedorImagen = img.parentNode
    contenedorImagen.setAttribute('nombre', 'Img-' + respuesta.nombre)
    modalMensaje({ titulo: 'EXITO', mensaje: respuesta.exito})

}

export {
    cambiarFirmaUsuario
}