const mime = require('mime-types')
import { gudardarDocumento } from "./guardarDocumentoActivo.js"
import { quitarDocumento } from "./quitarDocumento.js"
import { modalMensaje } from "../modalEleccion.js"

const cargarDocumento = async (e, crear = null) => {

    const file = e.target.files[0]

    if (file.type !== 'application/pdf') return modalMensaje({ titulo: 'ERROR', mensaje: 'El documento debe ser en formato pdf' })
    if (file.size > 15000000) return modalMensaje({ titulo: 'ERROR', mensaje: 'El documento exede los 15Mb' })

    const contenerdorInput = e.target.parentNode.parentNode
    const contenedorpdf = contenerdorInput.previousSibling.previousSibling

    const embed = contenedorpdf.querySelector('embed')
     embed.src = URL.createObjectURL(file)
    const botonEliminar = contenedorpdf.querySelector('.eliminar')
    const botonDescargar = contenedorpdf.querySelector('.descargar')
    botonDescargar.classList.add('d-none')
    contenedorpdf.classList.remove('d-none')
    contenerdorInput.classList.add('d-none')

    if (crear === null) {
        botonEliminar.onclick = (e) => quitarDocumento(e)
        const activo = e.target.getAttribute('activo')
        const botonGudardar = contenedorpdf.querySelector('.guardar')
        botonGudardar.setAttribute('activo', activo)
        botonGudardar.classList.remove('d-none')
        botonGudardar.onclick = (e) => gudardarDocumento(e)
    } else {
        botonEliminar.onclick = (e) => quitarDocumento(e, 'crear')
    }
    e.target.value = ''


}

export {
    cargarDocumento
}