const { ipcRenderer } = require('electron')
import { modalEleccion, modalMensaje } from '../helpers/modalEleccion.js'
const eliminarProvUsuario = (e, nodo) => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const tbody = nodo.querySelector('.proveedoresUsuarios')
    const trs = tbody.querySelectorAll('tr')
    const linea = parseInt(boton.getAttribute('linea'))
    tbody.removeChild(trs[linea])
    

    for (let i = (linea + 1); i < trs.length; i++){
        const th = trs[i].querySelector('th')
        const botonEliminar = trs[i].querySelector('button')
        th.textContent = i
        botonEliminar.setAttribute('linea', (i - 1))
    }

}

const eliminarProvUsuarioBd =  async (e, nodo) => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const proveedor = boton.getAttribute('opcionId')
    if(parseInt(proveedor.split('-')[1]) == NaN)  return modalMensaje({ titulo: 'ERROR', mesaje: 'La eliminacion del proveedor no es valida' })
   
    const eleccion = await modalEleccion({ titulo: 'ELIMINAR PROVEEDRO', mensaje:'Esta seguro(a) de eliminar la asociacion del proveedor '+ proveedor +' al usuario' })
    if(!eleccion) return

    const id = nodo.querySelector('.numeroDocumento').value
    const usuario = boton.getAttribute('usuario')
    const eliminado = ipcRenderer.sendSync('eliminarProveedorUsuario', {proveedor, id, usuario})
    
    if (eliminado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: eliminado.msg })

    modalMensaje({ titulo: 'EXITO', mensaje: eliminado.exito })

    eliminarProvUsuario(e, nodo)

}


export {
    eliminarProvUsuario,
    eliminarProvUsuarioBd
}