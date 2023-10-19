const { ipcRenderer } = require('electron')
import { modalMensaje } from "../helpers/modalEleccion.js";
import { cargarTapContenido } from "../manejoTap/cargarTapContenido.js";

const guardarEdicionUsuarioPropio = (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const usuario = boton.getAttribute('usuario')

    const tipoId = nodo.querySelector('.tipoId').value
    const primerNombre = nodo.querySelector('.primerNombre').value
    const primerApellido = nodo.querySelector('.primerApellido').value
    const email = nodo.querySelector('.email').value
    const segundoNombre = nodo.querySelector('.segundoNombre').value
    const segundoApellido = nodo.querySelector('.segundoApellido').value


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

    const data = {
        usuario,
        tipoId,//
        primerNombre,//
        primerApellido,//
        email,//
        segundoNombre,//
        segundoApellido,//

    }

    const edicion = ipcRenderer.sendSync('guardarEdicionUsuario', data);
    if (edicion.msg) return modalMensaje({ titulo: 'ERROR', mensaje: edicion.msg })
    modalMensaje({ titulo: 'exito', mensaje: 'Usuario creado correctamente' })
    cargarTapContenido('editarUsuario', edicion.id)

}

const guardarEdicionUsuarioExterno = (e, nodo) => {

    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const usuario = boton.getAttribute('usuario')
    const tipoId = nodo.querySelector('.tipoId').value
    const primerNombre = nodo.querySelector('.primerNombre').value
    const primerApellido = nodo.querySelector('.primerApellido').value
    const email = nodo.querySelector('.email').value
    const contraseña = nodo.querySelector('.contraseña').value
    const numeroDocumento = nodo.querySelector('.numeroDocumento').value
    const segundoNombre = nodo.querySelector('.segundoNombre').value
    const segundoApellido = nodo.querySelector('.segundoApellido').value
    const confirmarContraseña = nodo.querySelector('.confirmarContraseña').value
    const estado = nodo.querySelector('.estado').getAttribute('opcionId')
    const checkUsuarios = nodo.querySelector('.checkUsuarios')
    const checkActivos = nodo.querySelector('.checkActivos')
    const checkSolicitudes = nodo.querySelector('.checkSolicitudes')
    const checkReportes = nodo.querySelector('.checkReportes')
    const checkConfguraciones = nodo.querySelector('.checkConfguraciones')
    const checkclasificacion = nodo.querySelector('.checkclasificacion')
    const checkInformes = nodo.querySelector('.checkInformes')

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

    if (contraseña.length !== 0) {

        if (contraseña.trim().length === 0) return modalMensaje({ titulo: 'ERROR', mensaje: 'El campo contraseña es Obligatorio' })

        if (contraseña !== confirmarContraseña) return modalMensaje({ titulo: 'ERROR', mensaje: 'las contraseñas no coinciden' })
    }

    if (estado == 'Es--00') return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe seleccionar un estado del usuario' })


    const data = {
        usuario,
        tipoId,//
        primerNombre,//
        primerApellido,//
        email,//
        contraseña,//
        numeroDocumento,//
        segundoNombre,//
        segundoApellido,//
        confirmarContraseña,
        estado,
        usuarios: checkUsuarios.checked ? true : false,
        activos: checkActivos.checked ? true : false,
        solicitudes: checkSolicitudes.checked ? true : false,
        reportes: checkReportes.checked ? true : false,
        confguraciones: checkConfguraciones.checked ? true : false,
        clasificacion: checkclasificacion.checked ? true : false,
        informes: checkInformes.checked ? true : false,
    }
   

    const edicion = ipcRenderer.sendSync('guardarEdicionUsuarioExt', data);
    if (edicion.msg) return modalMensaje({ titulo: 'ERROR', mensaje: edicion.msg })
    modalMensaje({ titulo: 'exito', mensaje: 'Usuario editado correctamente' })
    cargarTapContenido('editarUsuario', edicion.id)

}

export { guardarEdicionUsuarioPropio, guardarEdicionUsuarioExterno }