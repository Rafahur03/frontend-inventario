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


// carga las vistas en un nodo de contenido existente.
const cargarTapContenido = id => {

    const contenido = {
        'nuevoUsuario': crearUsuario,// abre la ventana para crear un nuevo Usuario
        'editarUsuario': editarUsuario, // abre la ventana para editar un usuario
        'editarclave': cambiarClave, // abre la ventana de cambiar clave
        'listadoActivo': listadoActivos, // habre la ventana de listado activos
        'crearActivo': crearActivo, // abre la ventanan de crear un activo
        'editarActivo': editarActivo, // abre la ventana de editar o conultar u activo es la misma
        'cambiarClasificacion': cambiarClasificacion, // abre la ventana de cambiar clasificacion
        'listadoSolicitud': listadoSolicitudes, // abre la ventana de listado de solcitud 
        'crearSolicitud': crearSolicitud, // abre ventana crear solicitud
        'consultarSolicitud': editarSolicitud, // abre ventana editar o consultar solicitud
        'verReportes': listadoReportes, // abre ventana de listado de reportes
        'crearReporte': crearReporte, // abrre ventana de crearReporte
        'consultarReporte': editarReporte, //abre ventana de consultar o editar un reporte
        'configuracion': configuracionVista //abre ventana de configuracion

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

// carga el contenido de una vista pero agregando una nueva pestaña y con un nueco content.

const cargarNuevaVista = (id, dato) => {
    const contenido = {
        'editarActivo': editarActivo,
        'crearSolicitud': crearSolicitud,
        'consultarSolicitud': editarSolicitud,
        'crearReporte': crearReporte,
        'consultarReporte': editarReporte,
    }

    const contenidoTap = agregarTap(document.querySelector('#nueva-tap'))
    const atribute = document.createAttribute('tipoVista')
    atribute.value = id
    contenidoTap.setAttributeNode(atribute)
    contenidoTap.appendChild(contenido[id](dato));
    return contenidoTap
}

export {
    cargarTapContenido,
    cargarNuevaVista
}