import { cargarNuevaVista } from "../manejoTap/cargarTapContenido.js"

const solicitarMttoActivo = e =>{
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const activo = boton.getAttribute('activo')
    
    cargarNuevaVista('crearSolicitud', activo)


}

export{
    solicitarMttoActivo
}