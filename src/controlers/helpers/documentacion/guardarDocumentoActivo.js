const { ipcRenderer } = require('electron')
import { modalMensaje } from "../modalEleccion.js"
import { eliminarDocumento } from "./eliminardocumentoActivo.js"
import { descargarDocumento } from "./descargarDocumentoActivo.js"

const gudardarDocumento = async e => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const activo = boton.getAttribute('activo')
    const documento = boton.getAttribute('tipo')
    const contenedorPdf = boton.parentNode.parentNode
    const contendorInput = contenedorPdf.nextSibling.nextSibling

    const embed = contenedorPdf.querySelector('embed')
    const response = await fetch(embed.src);
    const blob = await response.blob()
    const file = await readBlobAsBase64(blob)
    
    const data = {
        activo,
        documento,
        file
    }
    const guardarFile = ipcRenderer.sendSync('guardarDocumento', data);
    if (guardarFile.msg) return modalMensaje({ titulo: 'ERROR', mensaje: guardarFile.msg });

    embed.src = guardarFile.data
    contendorInput.classList.add('d-none')
    boton.classList.add('d-none')
    const botonEliminar = contenedorPdf.querySelector('.eliminar')
    botonEliminar.setAttribute('activo',activo)
    botonEliminar.onclick = e => eliminarDocumento(e)
    const botonDescargar = contenedorPdf.querySelector('.descargar')
    botonDescargar.setAttribute('activo',activo)
    botonDescargar.onclick = e => descargarDocumento(e)
    botonDescargar.classList.remove('d-none')
}

function readBlobAsBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}



export {
    gudardarDocumento
}