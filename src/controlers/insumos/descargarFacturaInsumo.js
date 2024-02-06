const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'
const descargarFacturaInsumo = (e, nodo) =>{

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const insumo = boton.getAttribute('insumo')
    const idInsumo = nodo.querySelector('.insumo').getAttribute('insumo')

    const data = {
        insumo,
        idInsumo
    }

    const descarga = ipcRenderer.sendSync('descargarFacturaInsumo', data);
    if(descarga.msg) return modalMensaje({titulo:'error', mensaje:descarga.msg});
    
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = descarga.facturaInsumo;
    link.download = `${descarga.nombre}.pdf`;

    // Simular un clic en el enlace para abrir el administrador de archivos
    link.click();
  

    
}

export {
    descargarFacturaInsumo
}