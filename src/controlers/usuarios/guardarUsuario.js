const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js";
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js";

const guardarUsuario = (nodo) => {


    const tipoId = nodo.querySelector('.tipoId').value
    const primerNombre = nodo.querySelector('.primerNombre').value
    const primerApellido = nodo.querySelector('.primerApellido').value
    const email = nodo.querySelector('.email').value
    const contraseña = nodo.querySelector('.contraseña').value
    const numeroDocumento = nodo.querySelector('.numeroDocumento').value
    const segundoNombre = nodo.querySelector('.segundoNombre').value
    const segundoApellido = nodo.querySelector('.segundoApellido').value
    const confirmarContraseña = nodo.querySelector('.confirmarContraseña').value
    const tbody = nodo.querySelector('.proveedoresUsuarios')
    const proveedoresUsuario = tbody.querySelectorAll('tr')
    const checkUsuarios = nodo.querySelector('.checkUsuarios')
    const checkActivos = nodo.querySelector('.checkActivos')
    const checkSolicitudes = nodo.querySelector('.checkSolicitudes')
    const checkReportes = nodo.querySelector('.checkReportes')
    const checkConfguraciones = nodo.querySelector('.checkConfguraciones')
    const checkclasificacion = nodo.querySelector('.checkclasificacion')
    const checkInformes = seccion.querySelector('.checkInformes')
    const imageneFirma = nodo.querySelector('.imageneFirma')
    const imagen = imageneFirma.querySelector('img')

    if (tipoId.length === 0 || tipoId.length > 2) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe seleccionar un tipo de documento' })

    if (tipoId.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe seleccionar un tipo de documento' })

    if (primerNombre.length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Primer Nombre es Obligatorio' })

    if (primerNombre.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Primer Nombre es Obligatorio' })

    if (primerApellido.length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Primer apellido es Obligatorio' })

    if (primerApellido.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Primer apellido es Obligatorio' })

    if (segundoApellido.length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo segundo apellido es Obligatorio' })

    if (segundoApellido.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo segundo apellido es Obligatorio' })

    if (email.length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Email es Obligatorio' })

    if (email.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Email es Obligatorio' })

    if (email.includes('@') === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo segundo Email es Obligatorio' })

    if (numeroDocumento.length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Numero de documento es Obligatorio' })

    if (numeroDocumento.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Numero de documento es Obligatorio' })

    if (numeroDocumento.length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Numero de documento es Obligatorio' })

    if (numeroDocumento.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo Numero de documento es Obligatorio' })

    if (proveedoresUsuario.length == 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El usuario debe estar asociado al menos un porveedor' })

    if (imagen == undefined) return modalMensaje({ titulo: 'ERROR', mensaje: 'El usuario debe tener una firma' })

    if (contraseña.length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo contraseña es Obligatorio' })

    if (contraseña.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo contraseña es Obligatorio' })

    if (contraseña !== confirmarContraseña) return modalMensaje({ titulo: 'ERROR', mensaje: 'las contraseñas no coinciden' })

    const listaProvedores = Array.from(proveedoresUsuario)

    const proveedores = listaProvedores.map((item) => {
        const td = item.querySelector('td')
        return td.textContent
    })
    
    const data = {
        tipoId,//
        primerNombre,//
        primerApellido,//
        email,//
        contraseña,//
        numeroDocumento,//
        segundoNombre,//
        segundoApellido,//
        confirmarContraseña,
        usuarios: checkUsuarios.checked ? true: false,
        activos: checkActivos.checked ? true: false,
        solicitudes: checkSolicitudes.checked ? true: false,
        reportes: checkReportes.checked ? true: false,
        confguraciones: checkConfguraciones.checked ? true: false,
        clasificacion : checkclasificacion.checked ? true: false,
        informes : checkInformes.checked ? true: false,
        proveedores,
        firma:imagen.src

    }

    const usuario = ipcRenderer.sendSync('crearNuevoUsuario', data);
    if(usuario.msg) return modalMensaje({titulo: 'ERROR',mensaje:usuario.msg})

    modalMensaje({titulo: 'exito',mensaje:'Usuario creado correctamente'})
    cargarTapContenido('editarUsuario', usuario.id)

    

}


export { guardarUsuario }