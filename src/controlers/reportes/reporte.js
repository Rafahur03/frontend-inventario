const urlbase = process.env.API_URL

const { validarDatosReporte, validarDatosReportePrev } = require('./validarDatosReporte.js')
const { validarImagenes } = require('../helpers/validarImagenes.js')
const { validarDocumentos } = require('../helpers/validarDocumentos.js')

const consultarListadoReportes = async token => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },

    }

    try {
        const url = urlbase + '/consultarReportesTodos'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const descargarListaMtto = async (datos, token) => {
    const data = {
        id: datos.activo.split('-')[1],
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    try {
        const url = urlbase + '/descargarListaMtto'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}
const crearNuevoReporte = async (datos, token) => {


    const validacion = await validarDatosReporte(datos, token)
    if (validacion.msg) return validacion

    if (datos.imagenes.length > 0) {
        for (let imagen of datos.imagenes) {
            const validacionImagen = validarImagenes(imagen)
            if (validacionImagen.msg) return validacionImagen
        }
    }

    if (datos.reportePDF != null) {
        const validacionDocumento = validarDocumentos(datos.reportePDF)
        if (validacionDocumento.msg) return validacionDocumento
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/crearReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error al intentar conectar con el servidor intente mas tarde' })
    }

}

const guardarReportePrev = async (datos, token) => {


    const validacion = await validarDatosReportePrev(datos, token)
    if (validacion.msg) return validacion

    if (datos.imagenes.length > 0) {
        for (let imagen of datos.imagenes) {
            const validacionImagen = validarImagenes(imagen)
            if (validacionImagen.msg) return validacionImagen
        }
    }

    if (datos.reportePDF != null) {
        const validacionDocumento = validarDocumentos(datos.reportePDF)
        if (validacionDocumento.msg) return validacionDocumento
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/guardarReportePrev'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error al intentar conectar con el servidor intente mas tarde' })
    }

}

const editarReporte = async (datos, token) => {


    const validacion = await validarDatosReporte(datos, token)
    if (validacion.msg) return validacion

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/editarReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error al intentar conectar con el servidor intente mas tarde' })
    }

}
const consultarReporte = async (id, token) => {

    if (parseInt(id) == NaN) return ({ msg: 'Debe ingresar un id valido' })
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    }

    try {
        const url = urlbase + '/consultarReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}
const eliminarReporte = async (datos, token) => {

    datos.idActivo = datos.codigo
    delete datos.codigo
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }
    try {
        const url = urlbase + '/eliminarReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}
const eliminarImagenReporte = async (datos, token) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/eliminarImagenReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}
const guardarImagenReporte = async (datos, token) => {

    const validacionImagen = validarImagenes(datos.imagen)
    if (validacionImagen.msg) return validacionImagen

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/guardarImagenReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}
const descargarReporte = async (datos, token) => {

    const reporte = datos.reporte.split('-')[1]
    if (reporte != datos.idReporte) return { msg: 'Error en el ID del reporte' }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/descargarReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}
const descargarReporteExterno = async (datos, token) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/descargarReporteExterno'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}
const guardarSoporteExtReporte = async (datos, token) => {

    const validacionDocumento = validarDocumentos(datos.soportePDF)
    if (validacionDocumento.msg) return validacionDocumento

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/guardarSoporteExtReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}
const eliminarSoporteExtReporte = async (datos, token) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }

    try {
        const url = urlbase + '/eliminarSoporteExtReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    consultarListadoReportes,
    descargarListaMtto,
    crearNuevoReporte,
    consultarReporte,
    eliminarReporte,
    eliminarImagenReporte,
    guardarImagenReporte,
    editarReporte,
    descargarReporte,
    descargarReporteExterno,
    guardarSoporteExtReporte,
    eliminarSoporteExtReporte,
    guardarReportePrev
}