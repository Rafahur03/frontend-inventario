
import { cargarNuevaVista } from "../manejoTap/cargarTapContenido.js"
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js"

const abrirDatos =  (e) => {
    const vista = {
        Act: 'editarActivo',
        Sol: 'consultarSolicitud',
        Rep: 'consultarReporte',
        Ins: 'consultarInsumo'
    }
    const nodo = e.target
    let tr
    if (nodo.parentNode.tagName.toLowerCase() === 'tr') {
        tr = nodo.parentNode
    } else {
        tr = nodo
    }
    
    const contenido = tr.id.split('-')[0]
    const id = tr.id.split('-')[1]
    cargarNuevaVista(vista[contenido], id)



}

export { abrirDatos } 