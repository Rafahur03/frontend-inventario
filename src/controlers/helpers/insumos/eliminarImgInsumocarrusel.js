

const eliminarImgInsumocarrusel = e => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const carruselItem = boton.parentNode.parentNode.parentNode
    const carruselInner = carruselItem.parentNode
    carruselInner.removeChild(carruselItem)
    const filaGirImagenes = carruselInner.parentNode.parentNode
    const contendorImputImagenesActivo = filaGirImagenes.querySelector('.contendorInputImagenesinsumo')
    if (contendorImputImagenesActivo.classList.contains('d-none')) contendorImputImagenesActivo.classList.remove('d-none')
}

export {
    eliminarImgInsumocarrusel,
}