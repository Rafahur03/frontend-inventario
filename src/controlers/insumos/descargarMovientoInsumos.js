const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'
const descargarMovimientoInsumo = (e) =>{

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }    
    const tipo = boton.getAttribute('tipo') 
    const insumo = boton.getAttribute('insumo')
  

    if(tipo !='pdf' && tipo !='excel') return  modalMensaje({titulo: 'ERROR', mensaje: 'No se pudo validar el tipo de archivo'})
  
    
    const data = {
        tipo,
        insumo
    }

    const descarga = ipcRenderer.sendSync('descargarMovimientoInsumo', data);
    if(descarga.msg) return modalMensaje({titulo:'error', mensaje:descarga.msg});
    
    // Crear un enlace temporal
    if (tipo === 'pdf') {
        const link = document.createElement('a');
        link.href = descarga.movimientos; 
        link.download = descarga.nombre;
        // Simular un clic en el enlace para abrir el administrador de archivos
        link.click();
    } else {
        const byteCharacters = atob(descarga.movimientos);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = descarga.nombre;
        // Simular un clic en el enlace para abrir el administrador de archivos
        link.click();
    }
      
}

export {
    descargarMovimientoInsumo
}