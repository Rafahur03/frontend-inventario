
import { cagarNuevaVista } from "../manejoTap/cargarTapContenido.js"
import { cargarDatosActivo } from "../activos/cargarDatosActivo.js"
const abrirDatos = (e) => {
    const vista={
        Act:'editarActivo',
        Sol: 'consultarSolicitud',
        Rep: 'consultarReporte'
    }
    const nodo = e.target
    let tr
    if(nodo.parentNode.tagName.toLowerCase() === 'tr'){
        tr = nodo.parentNode
    }else{
        tr = nodo
    }

    const contenido = tr.id.split('-')[0]
    const id = tr.id.split('-')[1]
    const contenedor = cagarNuevaVista( vista[contenido], contenido)
    cargarDatosActivo(id, contenedor)
    
  
}

export { abrirDatos } 