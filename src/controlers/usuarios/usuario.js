require('dotenv').config()
const urlbase = process.env.API_URL
const {validarDatosUsuario} = require('./validarDatosUsuario.js')
const {validarImagenes} = require('../helpers/validarImagenes.js')



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
    if(validacion.msg) return validacion

    const validarImg = validarImagenes(data.firma)
    if(validarImg.msg) return validarImg

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
    
    if(parseInt(id) == NaN) return {msg: 'El ID del usuario es invalido'}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id})
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


const guardarEdicionUsuario = async data => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

module.exports =  {
    iniciarSesion,
    crearNuevoUsuario,
    guardarEdicionUsuario,
    consultarUsuario
}