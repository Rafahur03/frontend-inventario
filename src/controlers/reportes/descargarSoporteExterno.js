const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'
const descargarReporteExterno = (e, idReporte) =>{

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const reporte = boton.getAttribute('reporte')

    const data = {
        reporte,
        idReporte
    }
    const descarga = ipcRenderer.sendSync('descargarReporteExterno', data);
    if(descarga.msg) return modalMensaje({titulo:'error', mensaje:descarga.msg});

    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = descarga.reportePDF;
    link.download = `${descarga.nombre}.pdf`;

    // Simular un clic en el enlace para abrir el administrador de archivos
    link.click();
  

    
}

export {
    descargarReporteExterno
}