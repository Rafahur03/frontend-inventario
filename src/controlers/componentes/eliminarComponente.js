const { ipcRenderer } = require('electron')
import { eliminarLineaComponente } from "./eliminarLineaComponente.js"

const eliminarComponente = e => {
    const tagName = e.target.tagName.toLowerCase()
    let tr 
    let componente
    let activo
    if (tagName === 'i') {
        const button = e.target.parentNode
        tr = button.parentNode.parentNode
        componente = button.getAttribute('componente')
        activo = button.getAttribute('activo')
    } else {
        tr = e.target.parentNode.parentNode
        componente = e.target.getAttribute('componente')
        activo =  e.target.getAttribute('activo')
    }
  
    // realizar la peticion de eliminar de la bd

    const idComponente = componente.split('-')[1]
    const idActivo = activo.split('-')[1]

    // eliminar la fila del render
    const eliminando = ipcRenderer.sendSync('eliminarComponente', {idActivo, idComponente});
    if(eliminando.msg) {
        //mostra mensaje en el render
        console.log(eliminando.msg)
        return 
    }
    eliminarLineaComponente(e)
}



export {
    eliminarComponente
}