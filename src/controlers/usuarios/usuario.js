const urlbase = process.env.API_URL
const { validarDatosUsuario } = require('./validarDatosUsuario.js')
const { validarImagenes } = require('../helpers/validarImagenes.js')

const iniciarSesion = async data => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(urlbase, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const crearNuevoUsuario = async (data, token) => {
    const validacion = validarDatosUsuario(data)
    if (validacion.msg) return validacion

    const validarImg = validarImagenes(data.firma)
    if (validarImg.msg) return validarImg

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    try {
        const url = urlbase + '/crearUsuario'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const consultarUsuario = async (id, token) => {

    if (parseInt(id) == NaN) return { msg: 'El ID del usuario es invalido' }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    }

    try {
        const url = urlbase + '/consultarUsuario'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}


const guardarEdicionUsuario = async (data, token) => {

    const validacion = validarDatosUsuario(data)
    if (validacion.msg) return validacion

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },

        body: JSON.stringify({ data })
    }

    try {
        const url = urlbase + '/actualizaPerfil'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const cambiarFirma = async (data, token) => {


    if (parseInt(data.usuario.split('-')[1]) == NaN) return { msg: 'El usuario no es valido' }
    if (parseInt(data.id.split('-')[1]) == NaN) return { msg: 'El Numero de usuario no es valido' }
    if (!data.firma) return { msg: 'La firma es obligatoria' }
    const validarImg = validarImagenes(data.firma)
    if (validarImg.msg) return validarImg

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
    }

    try {
        const url = urlbase + '/cambiarFirma'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const guardarProveedorUsuario = async (data, token) => {

    if (parseInt(data.usuario.split('-')[1]) == NaN) return { msg: 'El usuario no es valido' }
    if (parseInt(data.id) == NaN) return { msg: 'El Numero de usuario no es valido' }
    if (parseInt(data.proveedor.split('-')[1]) == NaN) return { msg: 'El Proveedor no es valido' }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
    }

    try {
        const url = urlbase + '/guardarProveedorUsuario'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}


const eliminarProveedorUsuario = async (data, token) => {

    if (parseInt(data.usuario.split('-')[1]) == NaN) return { msg: 'El usuario no es valido' }
    if (parseInt(data.id) == NaN) return { msg: 'El Numero de usuario no es valido' }
    if (parseInt(data.proveedor.split('-')[1]) == NaN) return { msg: 'El Proveedor no es valido' }


    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
    }

    try {
        const url = urlbase + '/eliminarProveedorUsuario'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const cambiarClave = async (data, token) => {

    if (parseInt(data.usuario) == NaN) return { msg: 'El usuario no es valido' }

    if (data.claveActual.length === 0) return { msg: 'El campo Contraseña Actual no puede estar vacio' }

    if (data.claveActual.includes(' ')) if (data.claveActual.trim() == '') return { msg: 'El campo Contraseña Actual no puede estar vacio' }

    if (data.nuevaclave.length === 0) return { msg: 'El campo Nuevacampo Nueva Contraseña no puede estar vacio' }
   
    if (data.nuevaclave.includes(' ')) if (data.nuevaclave.trim() == '') return { msg: 'El campo Nueva Contraseña no puede estar vacio' }

    if (data.nuevaclave.includes(' ')) return { msg: 'El campo Nueva Contraseña no puede contener espacios' }

    if (data.nuevaclave !== data.confirmarclave) return { msg: 'Las contraseñas no conciden' }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
    }
    try {
        const url = urlbase + '/cambiarClave'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}


module.exports = {
    iniciarSesion,
    crearNuevoUsuario,
    guardarEdicionUsuario,
    consultarUsuario,
    cambiarFirma,
    guardarProveedorUsuario,
    eliminarProveedorUsuario,
    cambiarClave
}