require('dotenv').config()
const urlbase = process.env.API_URL
const {validarDatosSolicitud} = require('./validarSolicitud.js')
const {validarImagenes} = require('../helpers/validarImagenes.js')

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

const crearSolictud = async (datos, token) => {

    const validacion = validarDatosSolicitud(datos)
    if(validacion.msg) return(validacion) 

    if (datos.imagenes.length > 0) {
        for(let imagen of datos.imagenes){
            const validacionImagen = validarImagenes(imagen)
            if(validacionImagen.msg) return validacionImagen
        }
    }
    const data = datos
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
        body: JSON.stringify({id})
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



module.exports = {
    consultarListadoSolicitudes,
    crearSolictud,
    consultarSolicitud
}