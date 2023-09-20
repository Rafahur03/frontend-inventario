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
    const id = nodo.querySelector('.numeroDocumento').value
    const usuario = boton.getAttribute('usuario')
    const guardado = ipcRenderer.sendSync('guardarProveedorUsuario', {proveedor, id, usuario})

    if (guardado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: guardado.msg })

    const contenedorBotones = boton.parentNode
    contenedorBotones.removeChild(boton)
    const botoneliminar = contenedorBotones.querySelector('button')
    botoneliminar.setAttribute('usuario', usuario)
    botoneliminar.onclick = (e) => eliminarProvUsuarioBd(e, nodo)

    modalMensaje({ titulo: 'EXITO', mensaje: guardado.exito })
}

export{
    guardarProveedor
}