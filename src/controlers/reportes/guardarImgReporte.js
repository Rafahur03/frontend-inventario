const { ipcRenderer } = require('electron')
import { eliminarImgReporte } from './eliminarImgReporte.js'
import { modalMensaje } from "../helpers/modalEleccion.js"
const guardarImgReporte = (e, nodo) =>{

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const reporte = boton.getAttribute('reporte')
    const codigo = nodo.querySelector('.idActivo').value
    const idSolicitud = nodo.querySelector('.idSolicitud').value.split('-')[1]
    const img = boton.parentNode.previousSibling
    const imagen =img.src
 
    const data = {
        reporte,
        codigo,
        idSolicitud,
        imagen,      
    }

    const respuesta = ipcRenderer.sendSync('guardarImagenReporte', data);
    if(respuesta.msg)  return modalMensaje({titulo:'ERROR', mensaje:respuesta.msg})
 
    const contenedorBoton = boton.parentNode
    contenedorBoton.removeChild(boton)
    const botonEliminar = contenedorBoton.querySelector('button')
    botonEliminar.setAttribute('imagen', respuesta.nombre)  
    botonEliminar.setAttribute('reporte', reporte)
    botonEliminar.onclick = e=> eliminarImgReporte(e, nodo)
    const contenedorImagen = img.parentNode
    contenedorImagen.setAttribute('nombre', 'Img-'+ respuesta.nombre)  
    modalMensaje({titulo:'EXITO', mensaje:'Image guardada correctamente' })
    
}

export {
    guardarImgReporte
}