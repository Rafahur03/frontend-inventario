import { modalMensaje } from "./modalEleccion.js"
const eliminarImgActivo = e => {
    const tagName = e.target.tagName.toLowerCase()

    if (tagName === 'i') {
        const padre = e.target.parentNode
        console.log('eliminar imagen', padre.id)
        return
    }

    console.log(' eliminar imagen', e.target.id)
}

const eliminarImgCarrusel = e => {
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
    const carruselItemTodos = carruselInner.querySelectorAll('.carousel-item')
    const cantidad = carruselItemTodos.length
    if(cantidad !==0){
        carruselItemTodos[0].classList.add('active')
        
    }
   const filaGirImagenes =carruselInner.parentNode.parentNode
   const bottonSeleccion =filaGirImagenes.querySelector('.buttonImagenesActivo')
   bottonSeleccion.textContent = `Selecione Max ${ 6 - cantidad} Imagenes`
   const contendorImputImagenesActivo = filaGirImagenes.querySelector('.contendorImputImagenesActivo')  
   if (contendorImputImagenesActivo.classList.contains('d-none')) contendorImputImagenesActivo.classList.remove('d-none')
}

export {
    eliminarImgActivo,
    eliminarImgCarrusel
}