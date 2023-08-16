require('dotenv').config()
const urlbase = process.env.API_URL
const {validarDatosComponente} = require('./validarComponentes.js')
const eliminarComponente = async (data, token) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
    }

    try {
        const url = urlbase + '/eliminarComponente'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const guardarComponente = async (datos, token) => {  

    datos.idActivo = datos.idActivo.split('-')[1]
    datos.idNombre = datos.idNombre.split('-')[1]      
    datos.idmarca = datos.idmarca.split('-')[1] 
    const validacion = await validarDatosComponente(datos, token)

    if(validacion.msg) return validacion
    const idActivo = datos.idActivo
    delete datos.idActivo

    data = {
        idActivo,
        componente: datos
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data})
    }

    try {
        const url = urlbase + '/guardarComponente'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    eliminarComponente,
    guardarComponente
}   