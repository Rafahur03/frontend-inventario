const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js"

const guardarSolicitud = (e, nodo) =>{

    // const tagName = e.target.tagName.toLowerCase()
    // let boton
    // if (tagName === 'i') {
    //     boton = e.target.parentNode
    // } else {
    //     boton = e.target
    // }
    // const activo = boton.getAttribute('opcionid')
    const idActivo = nodo.querySelector('.idActivo').value


    // if(activo !== idActivo) return modalMensaje({titulo:'ERROR', mensaje:'Debe seleccionar un activo valido para poder crear una solicitud'})

    const contenedorImagenes = nodo.querySelector('.imagenesSolicitud')
    const listImagenes = contenedorImagenes.querySelectorAll('img')
    let imagenes = []
    if (listImagenes.length > 0){
        if(listImagenes.length > 4) return modalMensaje({titulo:'ERROR', mensaje:'Solo puede cargar un maximo de 4 imagenes'})
        
        for (let i = 0; i < listImagenes.length; i++){
            imagenes.push(listImagenes[i].src)
        }

    }
    const descripcion = nodo.querySelector('.descripcionSolicitud').value
    if(descripcion.length == 0) return modalMensaje({titulo:'ERROR', mensaje:'la descripcion no puede estar vacia'})
    if(descripcion.trim() == '') return modalMensaje({titulo:'ERROR', mensaje:'la descripcion no puede estar vacia'})
    
    const solicitud = {
        idActivo,
        imagenes,
        descripcion        
    }
    const respuesta = ipcRenderer.sendSync('crearSolicitud', solicitud);
    if(respuesta.msg)  return modalMensaje({titulo:'ERROR', mensaje:respuesta.msg})

    cargarTapContenido('consultarSolicitud', respuesta.id)
    

}

export{guardarSolicitud}    