const { ipcRenderer } = require('electron')
import { modalMensaje } from '../modalEleccion.js'
const descargarDocumento = async e => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const activo = boton.getAttribute('activo')
    const documento = boton.getAttribute('tipo')
    const data = {
        activo,
        documento
    }
    const descarga = ipcRenderer.sendSync('descargaDocumento', data);
    if(descarga.msg) return modalMensaje({titulo:'error', mensaje:descarga.msg});
    console.log(descarga)
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = descarga.buffer;
    link.download = `${descarga.nombre}.pdf`;

    // Simular un clic en el enlace para abrir el administrador de archivos
    link.click();
}

export {
    descargarDocumento
}