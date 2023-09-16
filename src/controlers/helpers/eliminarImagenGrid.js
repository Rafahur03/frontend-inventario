import { cargarImagenGridReporte } from "./cargaImagenGrid.js"
const eliminarImagen = (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const imagen = boton.getAttribute('imagen')

    const divImagen = nodo.querySelector("div[nombre='Img-" + imagen + "']")
    const contendorImagenes = divImagen.parentNode
    contendorImagenes.removeChild(divImagen)

    const botonImagenes = nodo.querySelector('.imagenesSoporte')
    const contendorImput = nodo.querySelector('.contendorInput')

    const imagenes = contendorImagenes.querySelectorAll('img')

    if (imagenes.length < 4) {
        if (contendorImput.classList.contains('d-none')) {
            contendorImput.classList.remove('d-none')

        }
        botonImagenes.textContent = `Selecione ${4 - imagenes.length} imagenes`
    }

}


const eliminarImagenReporte = (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const imagen = boton.getAttribute('imagen')

    const divImagen = nodo.querySelector("div[nombre='Img-" + imagen + "']")
    const contendorImagenes = divImagen.parentNode
    contendorImagenes.removeChild(divImagen)

    const botonImagenes = nodo.querySelector('.imagenesSoporte')
    const contendorInput = nodo.querySelector('.contendorInput')
    const input = contendorInput.querySelector('input')
    input.onchange = e => cargarImagenGridReporte(e, nodo)
    const imagenes = contendorImagenes.querySelectorAll('img')

    if (imagenes.length < 4) {
        if (contendorInput.classList.contains('d-none')) {
            contendorInput.classList.remove('d-none')
        }
        botonImagenes.textContent = `Selecione ${4 - imagenes.length} imagenes`
    }

}



export { eliminarImagen, eliminarImagenReporte }

