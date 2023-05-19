import { eliminarLineaComponente } from "./eliminarLineaComponente.js"

const eliminarComponente = e => {
    const tagName = e.target.tagName.toLowerCase()
    let tr 
    let componente
    if (tagName === 'i') {
        const button = e.target.parentNode
        tr = button.parentNode.parentNode
        componente = button.getAttribute('componente')
    } else {
        tr = e.target.parentNode.parentNode
        componente = e.target.getAttribute('componente')
    }
  
    // realizar la peticion de eliminar de la bd
    console.log(componente)
    const id = componente.split('-')[1]
    console.log(id)

    // eliminar la fila del render

    eliminarLineaComponente(e)
}



export {
    eliminarComponente
}