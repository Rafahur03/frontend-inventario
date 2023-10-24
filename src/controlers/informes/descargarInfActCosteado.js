const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'
const descargarInfActCosteado = (e, seccion) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const activo = seccion.querySelector('.idActivo').value
    const codigo = seccion.querySelector('.codigoInterno').value
    if (activo.length == 0 || codigo.length == 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger un  activo de la lista' })
    if (activo.trim().length == 0 || codigo.trim().length == 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger un  activo de la lista' })

    const data = {
        activo,
        codigo
    }

    const descarga = ipcRenderer.sendSync('descargarIfoActCosteado', data);
    if (descarga.msg) return modalMensaje({ titulo: 'error', mensaje: descarga.msg });

    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = descarga.reportePDF;
    link.download = descarga.nombre;

    // Simular un clic en el enlace para abrir el administrador de archivos
    link.click();



}

export {
    descargarInfActCosteado
}