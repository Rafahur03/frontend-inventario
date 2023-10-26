const urlbase = process.env.API_URL
const { validarDatosSolicitud } = require('./validarSolicitud.js')
const { validarImagenes } = require('../helpers/validarImagenes.js')

const consultarListadoSolicitudes = async (data, token) => {
    
    for (let i = 0; i < data.filtros.length; i++) {
        if(typeof data.filtros[i].id != 'string' ||  typeof data.filtros[i].valor != 'boolean') return {msg: 'Debe escoger una Clasificacion de Activo valida'}
    }

    if(data.filtros.every(item => item.valor === false)) return {msg: 'Debe escoger una Clasificacion de Activo'}
    const patrondefecha = /^\d{4}-\d{2}-\d{2}$/
    if(data.fechaInicialSolicitud != '') if(!patrondefecha.test(data.fechaInicialSolicitud)) return {msg: 'La fecha de inicio no es valida'}
    if(data.fechaFinalSolicitud != '') if(!patrondefecha.test(data.fechaFinalSolicitud)) return {msg: 'La fecha de Final no es valida'}


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data})
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
    if (parseInt(id) == NaN) return ({msg: 'Debe ingresar un id valido'})
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
const consultarSolicitudReporte = async (id, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    }
    
    try {
        const url = urlbase + '/consultarSolicitudReporte'
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
    eliminarImagenSolicitud,
    consultarSolicitudReporte
}