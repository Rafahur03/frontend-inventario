import { agregarTap } from "./agregarTap.js"
import { agregarActivo } from "./contenidoTap/agregarActivo.js"
import { editarActivo } from "./contenidoTap/editarActivo.js"
import { listadoActivos } from "./contenidoTap/listadoActivos.js"
import { consultarSolicitud } from "./contenidoTap/consultarSolicitud.js"
import { crearSolicitud } from "./contenidoTap/crearSolicitud.js"
import { listadoSolicitudes } from "./contenidoTap/listadoSolicitudes.js"
import { listadoReportes } from "./contenidoTap/listadoReportes.js"
import { crearReporte } from "./contenidoTap/crearReporte.js"
import { editarReporte } from "./contenidoTap/editarReporte.js"

const cagarTapContenido = id => {

    const contenido = {
        'nuevoUsuario': 1,
        'editarUsuario': 1,
        'listadoActivo': listadoActivos(),
        'crearActivo': agregarActivo(),
        'editarActivo': editarActivo(),
        'cambiarClasificacion': 1,
        'listadoSolicitud': listadoSolicitudes(),
        'crearSolicitud': crearSolicitud(),
        'consultarSolicitud': consultarSolicitud(),
        'verReportes': listadoReportes(),
        'crearReporte': crearReporte(),
        'consultarReporte':editarReporte(),
        'configuracion': 1

    }
    const bodyTap = document.querySelector('#bodyTap')
    if (bodyTap.querySelectorAll('.tab-pane').length == 0) {
        const contenidoTap = agregarTap(document.querySelector('#nueva-tap'))
        contenidoTap.appendChild(contenido[id]);
        return
    } contenido[id]

    const contenActivo = bodyTap.querySelector('#TabContent .active')
    if (contenActivo.firstChild !== null) {
        while (contenActivo.firstChild) {
            contenActivo.removeChild(contenActivo.firstChild);
        }
    }
    contenActivo.appendChild(contenido[id]);

}

export {
    cagarTapContenido
}