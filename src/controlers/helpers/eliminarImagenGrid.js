

const eliminarImagen = (e, nodo) => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }

    const imagen = boton.getAttribute('imagen')

    const divImagen = nodo.querySelector('div[nombre=Img-' + imagen + ']')
    const contendorImagenes = divImagen.parentNode

    contendorImagenes.removeChild(divImagen)


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

export { eliminarImagen }

