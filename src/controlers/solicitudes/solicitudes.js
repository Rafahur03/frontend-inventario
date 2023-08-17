require('dotenv').config()
const urlbase = process.env.API_URL
const { validarDatosSolicitud } = require('./validarSolicitud.js')
const { validarImagenes } = require('../helpers/validarImagenes.js')

const consultarListadoSolicitudes = async token => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },

    }

    try {
        const url = urlbase + '/consultarSolicitudTodos'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const crearSolicitud = async (datos, token) => {

    const validacion = validarDatosSolicitud(datos)
    if (validacion.msg) return (validacion)

    if (datos.imagenes.length > 0) {
        for (let imagen of datos.imagenes) {
            const validacionImagen = validarImagenes(imagen)
            if (validacionImagen.msg) return validacionImagen
        }
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos)
    }

    try {
        const url = urlbase + '/crearSolicitud'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const consultarSolicitud = async (id, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    }

    try {
        const url = urlbase + '/consultarSolicitud'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const editarSolicitud = async (datos, token) => {
    datos.idActivo = datos.codigo
    const validacion = validarDatosSolicitud(datos)
    if (validacion.msg) return (validacion)
    const solicitud =datos.solicitud.split('-')[1]
    if(solicitud != datos.idSolicitud ) return {msg: 'Error en el ID de la solicitud'}

    delete datos.codigo

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({datos})
    }

    try {
        const url = urlbase + '/editarSolicitud'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const eliminarSolicitud = async (datos, token) => {

    datos.idActivo = datos.codigo
    const solicitud =datos.solicitud.split('-')[1]
    if(solicitud != datos.idSolicitud ) return {msg: 'Error en el ID de la solicitud'}
    delete datos.codigo
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({datos})
    }

    try {
        const url = urlbase + '/eliminarSolicitud'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const descargarSolicitud = async (datos, token) => {

    const solicitud =datos.solicitud.split('-')[1]
    if(solicitud != datos.idSolicitud ) return {msg: 'Error en el ID de la solicitud'}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({datos})
    }

    try {
        const url = urlbase + '/descargarSolicitud'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const guardarImagenSolicitud = async (datos, token) => {

    const solicitud =datos.solicitud.split('-')[1]
    if(solicitud != datos.idSolicitud ) return {msg: 'Error en el ID de la solicitud'}

    const validacionImagen = validarImagenes(datos.imagen)
    if (validacionImagen.msg) return validacionImagen

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({datos})
    }

    try {
        const url = urlbase + '/guardarImagenSolicitud'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const eliminarImagenSolicitud = async (datos, token) => {

    const solicitud =datos.solicitud.split('-')[1]
    if(solicitud != datos.idSolicitud ) return {msg: 'Error en el ID de la solicitud'}

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({datos})
    }

    try {
        const url = urlbase + '/eliminarImagenSolicitud'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}




module.exports = {
    consultarListadoSolicitudes,
    crearSolicitud,
    consultarSolicitud,
    editarSolicitud,
    eliminarSolicitud,
    descargarSolicitud,
    guardarImagenSolicitud,
    eliminarImagenSolicitud
}