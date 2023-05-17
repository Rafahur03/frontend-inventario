import { agregarTap } from "./agregarTap.js"
import { crearActivo } from "./contenidoTap/crearActivo.js"
import { editarActivo } from "./contenidoTap/editarActivo.js"
import { listadoActivos } from "./contenidoTap/listadoActivos.js"
import { editarSolicitud } from "./contenidoTap/editarSolicitud.js"
import { crearSolicitud } from "./contenidoTap/crearSolicitud.js"
import { listadoSolicitudes } from "./contenidoTap/listadoSolicitudes.js"
import { listadoReportes } from "./contenidoTap/listadoReportes.js"
import { crearReporte } from "./contenidoTap/crearReporte.js"
import { editarReporte } from "./contenidoTap/editarReporte.js"
import { crearUsuario } from "./contenidoTap/crearUsuario.js"
import { editarUsuario } from "./contenidoTap/editarUsuario.js"
import { cambiarClave } from "./contenidoTap/cambiarClave.js"
import { configuracionVista } from "./contenidoTap/configuracionVista.js"
import { cambiarClasificacion } from "./contenidoTap/cambiarClasificacion.js"

const cagarTapContenido = id => {

    const contenido = {
        'nuevoUsuario': crearUsuario,
        'editarUsuario': editarUsuario,
        'editarclave': cambiarClave,
        'listadoActivo': listadoActivos,
        'crearActivo': crearActivo,
        'editarActivo': editarActivo,
        'cambiarClasificacion': cambiarClasificacion,
        'listadoSolicitud': listadoSolicitudes,
        'crearSolicitud': crearSolicitud,
        'consultarSolicitud': editarSolicitud,
        'verReportes': listadoReportes,
        'crearReporte': crearReporte,
        'consultarReporte': editarReporte,
        'configuracion': configuracionVista

    }
    const bodyTap = document.querySelector('#bodyTap')
    if (bodyTap.querySelectorAll('.tab-pane').length == 0) {
        const contenidoTap = agregarTap(document.querySelector('#nueva-tap'))
        const atribute = document.createAttribute('tipoVista')
        atribute.value = id
        contenidoTap.setAttributeNode(atribute)
        contenidoTap.appendChild(contenido[id]());
        return
    }

    const contenActivo = bodyTap.querySelector('#TabContent .active')
    if (contenActivo.firstChild !== null) {
        while (contenActivo.firstChild) {
            contenActivo.removeChild(contenActivo.firstChild);
        }
    }

    if (!contenActivo.tipoVista) {
        const atribute = document.createAttribute('tipoVista')
        atribute.value = id
        contenActivo.setAttributeNode(atribute)
    }
    contenActivo.appendChild(contenido[id]());


}

const cagarNuevaVista = id => {

    const contenido = {

        'editarActivo': editarActivo,
        'crearSolicitud': crearSolicitud,
        'consultarSolicitud': editarSolicitud,
        'crearReporte': crearReporte,
        'consultarReporte': editarReporte,
    }
    const bodyTap = document.querySelector('#bodyTap')

    const contenidoTap = agregarTap(document.querySelector('#nueva-tap'))
    const atribute = document.createAttribute('tipoVista')
    atribute.value = id
    contenidoTap.setAttributeNode(atribute)
    contenidoTap.appendChild(contenido[id]());
}

export {
    cagarTapContenido,
    cagarNuevaVista
}