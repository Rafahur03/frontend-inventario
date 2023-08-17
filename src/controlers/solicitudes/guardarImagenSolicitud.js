const { ipcRenderer } = require('electron')
import { eliminarImagenSolicitud } from "./eliminarImagenSolicitud.js"
import { modalMensaje } from "../helpers/modalEleccion.js"
const guardarImagenSolicitud = (e, nodo) =>{
    e.preventDefault()
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const solicitud = boton.getAttribute('solicitud')
    const codigo = nodo.querySelector('.idActivo').value
    const idSolicitud = nodo.querySelector('.idSolicitud').value.split('-')[1]
    const img = boton.parentNode.previousSibling
    const imagen =img.src
 
    const data = {
        solicitud,
        imagen,
        codigo,
        idSolicitud        
    }
 
    const respuesta = ipcRenderer.sendSync('guardarImagenSolicitud', data);
    if(respuesta.msg)  return modalMensaje({titulo:'ERROR', mensaje:respuesta.msg})
 
    const contenedorBoton = boton.parentNode
    contenedorBoton.removeChild(boton)
    const botonEliminar = contenedorBoton.querySelector('button')
    botonEliminar.setAttribute('imagen', respuesta.nombre)  
    botonEliminar.setAttribute('solicitud', solicitud)
    botonEliminar.onclick = e=> eliminarImagenSolicitud(e, nodo)
    const contenedorImagen = img.parentNode
    contenedorImagen.setAttribute('nombre', 'Img-'+ respuesta.nombre)  
    modalMensaje({titulo:'EXITO', mensaje:'Image guardada correctamente' })
    
}

export {
    guardarImagenSolicitud
}