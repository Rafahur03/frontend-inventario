const mime = require('mime-types')
import { gudardarDocumento } from "./guardarDocumento.js"
import { quitarDocumento } from "./quitarDocumento.js"
import { modalMensaje } from "../modalEleccion.js"

const cargarDocumento =  async e => {

    const file = e.target.files[0]
    
    if (file.type !== 'application/pdf') return modalMensaje({title:'ERROR', mensaje:'El documento debe ser en formato pdf'})
    if (file.size > 3145728) return modalMensaje({title:'ERROR', mensaje:'El documento exede los 3Mb'})

    const contenerdorInput = e.target.parentNode.parentNode
    const contenedorpdf = contenerdorInput.previousSibling.previousSibling

    const embed = contenedorpdf.querySelector('embed')
    const reader = new FileReader()
    reader.onload = function (e) {
        embed.src= e.target.result  
    }
    reader.readAsDataURL(file)
    
    const activo = e.target.getAttribute('activo')
    const botonGudardar = contenedorpdf.querySelector('.guardar')
    botonGudardar.setAttribute('activo',activo)
    botonGudardar.classList.remove('d-none')
    botonGudardar.onclick = (e) => gudardarDocumento(e)
    const botonEliminar = contenedorpdf.querySelector('.eliminar')
    botonEliminar.onclick = (e) => quitarDocumento(e)
    const botonDescargar = contenedorpdf.querySelector('.descargar')
    botonDescargar.classList.add('d-none')
    contenedorpdf.classList.remove('d-none')
    contenerdorInput.classList.add('d-none')

}

export{
    cargarDocumento
}