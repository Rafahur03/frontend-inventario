const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'
import { eliminarProvUsuarioBd } from './eliminarProveUsuario.js'
const guardarProveedor =  async (e, nodo) => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const proveedor = boton.getAttribute('opcionId')
    if(parseInt(proveedor.split('-')[1]) == NaN)  return modalMensaje({ titulo: 'ERROR', mesaje: 'El id del proveedor no es valido' })

    const guardado = ipcRenderer.sendSync('guardarProveedorUsuario', proveedor)
    if (guardado.msg) return modalMensaje({ titulo: 'ERROR', mesaje: guardado.msg })

    const contenedorBotones = boton.parentNode
    contenedorBotones.removeChild(boton)
    const botoneliminar = contenedorBotones.querySelector('button')
    botoneliminar.onclick = (e) => eliminarProvUsuarioBd(e, nodo)

    modalMensaje({ titulo: 'ERROR', mesaje: guardado.exito })
}

export{
    guardarProveedor
}