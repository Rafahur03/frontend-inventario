const { ipcRenderer } = require('electron')
import { modalMensaje } from '../helpers/modalEleccion.js'
const descargarCronograma = (e, seccion) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const tipo = boton.getAttribute('tipo')
    const clasificacion = seccion.querySelector('.clasificacion')
    const input = clasificacion.querySelectorAll('input')
    const inputs = Array.from(input)

    if (tipo != 'pdf' && tipo != 'excel') return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudo validar el tipo de archivo' })
    const filtros = inputs.map(element => {
        return { id: element.id, valor: element.checked ? true : false }
    })
    if (filtros.every(item => item.valor === false)) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger una Clasificacion de Activo' })

    const year = seccion.querySelector('.selectYear').value
    if (isNaN(parseInt(year))) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger un año de la lista' })

    const data = {
        tipo,
        filtros,
        year
    }

    const descarga = ipcRenderer.sendSync('descargaCronograma', data);
    if (descarga.msg) return modalMensaje({ titulo: 'error', mensaje: descarga.msg })
    // Crear un enlace temporal 

    if (tipo === 'pdf') {
        const link = document.createElement('a');
        link.href = descarga.reportePDF;
        link.download = descarga.nombre;
        // Simular un clic en el enlace para abrir el administrador de archivos
        link.click();
    } else {
        const byteCharacters = atob(descarga.reportePDF);
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
    descargarCronograma
}