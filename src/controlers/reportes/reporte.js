require('dotenv').config()
const urlbase = process.env.API_URL

const { validarDatosReporte } = require('./validarDatosReporte.js')
const { validarImagenes } = require('../helpers/validarImagenes.js')

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

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({datos})
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

module.exports = {
    consultarListadoReportes,
    descargarListaMtto,
    crearNuevoReporte
}