const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'
const imprimirSolicitud = (e, idSolicitud) =>{

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const solicitud = boton.getAttribute('solicitud')

    const data = {
        solicitud,
        idSolicitud
    }
    const descarga = ipcRenderer.sendSync('descargarSolicitud', data);
    if(descarga.msg) return modalMensaje({titulo:'error', mensaje:descarga.msg});

    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = descarga.solicitud;
    link.download = `${descarga.nombre}.pdf`;

    // Simular un clic en el enlace para abrir el administrador de archivos
    link.click();
  

    
}

export {
    imprimirSolicitud
}