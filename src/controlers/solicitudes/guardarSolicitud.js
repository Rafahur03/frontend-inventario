const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js"
import { abrirDatosNuevo } from "../helpers/abrirDatos.js"
import { editarSolicitud } from "../manejoTap/contenidoTap/editarSolicitud.js"

const guardarSolicitud = (e, nodo) =>{
    const activo = e.target.getAttribute('opcionid')
    const idActivo= nodo.querySelector('.idActivo').value

    if(activo !== idActivo) return modalMensaje({titulo:'ERROR', mensaje:'Debe seleccionar un activo valido para poder crear una solicitud'})

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
    const respuesta = ipcRenderer.sendSync('crearSolictud', solicitud);
    if(respuesta.msg)  return modalMensaje({titulo:'ERROR', mensaje:respuesta.msg})

    const tapcontent = nodo.parentNode
    abrirDatosNuevo('Sol')
    editarSolicitud(respuesta, tapcontent)
    

}

export{guardarSolicitud}    