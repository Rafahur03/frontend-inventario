const { ipcRenderer } = require('electron')
import { eliminarImagen } from "../helpers/eliminarImagenGrid.js"
const eliminarImagenSolicitud = async (e, nodo) => {

    console.log(e)
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const solicitud = nodo.querySelector('.idSolicitud')
    const codigo = nodo.querySelector('.idActivo')
    const imagen = boton.getAttribute('imagen')

    const eleccion = await modalEleccion({ titulo: 'ELIMINAR IMAGEN SOLICITUD', mensaje: `Esta seguro(a) de eliminar la imagen, esta accion es irreversible` })

    if (!eleccion) return
    mostarSpinner()

    const data = {
        solicitud,
        codigo,
        imagen
    }
    const eliminar = ipcRenderer.sendSync('eliminarImagenSolicitud', data);


    if (eliminar.msg) {
        mensaje.titulo = "ERROR"
        mensaje.mensaje = eliminar.msg
        cerrarSpinner()
        modalMensaje(mensaje)
        return
    }

    eliminarImagen(e, nodo)
    
    const botonImagenes = nodo.querySelector('.imagenesSoporte')
    const contendorImput = nodo.querySelector('.contendorInput')
    const labelImput = nodo.querySelector('.labelSeleccionarImagen')

    const imagenes = nodo.querySelectorAll('.imagenesSolicitud img')
    if (imagenes.length < 4) {
        if (contendorImput.classList.contains('d-none')) {
            contendorImput.classList.remove('d-none')
            labelImput.classList.remove('d-none')
        }
        console.log(imagenes)
        botonImagenes.textContent = `Selecione ${4 - imagenes.length} imagenes`
    }
}

export {
    eliminarImagenSolicitud
}