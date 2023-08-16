const { ipcRenderer } = require('electron')
import { eliminarImagenSolicitud } from "./eliminarImagenSolicitud.js"
const guardarImagenSolicitud = (e, nodo) =>{
    console.log(e)
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const solicitud = nodo.querySelector('.idSolicitud')
    const codigo = nodo.querySelector('.idActivo')
    const imagen = boton.parentNode.previousSibling.src
    const data = {
        solicitud,
        imagen,
        codigo        
    }
    const respuesta = ipcRenderer.sendSync('guardarImagenSolicitud', data);
    if(respuesta.msg)  return modalMensaje({titulo:'ERROR', mensaje:respuesta.msg})

    if(respuesta.msg)  return modalMensaje({titulo:'EXITO', mensaje:'Imagen guardada correctamente'})    
    const contenedorBoton = boton.parentNode
    contenedorBoton.removechild(boton)
    botonEliminar = contenedorBoton.querySelector('button')
    botonEliminar.onclick = e=> eliminarImagenSolicitud(e, nodo)

    
}

export {
    guardarImagenSolicitud
}