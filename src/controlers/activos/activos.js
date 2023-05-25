require('dotenv').config()
const mime = require('mime-types')
const urlbase = process.env.API_URL

const consultarListadoActivos = async token => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        

    }
    try {
        const url = urlbase + '/consultarActivosTodos'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const consultarActivo = async (id, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id})

    }
    try {
        const url = urlbase + '/consultarActivo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const guardarImagenActivo = async (datos, token) => {

    console.log(datos)
    const formData = new FormData()
    const mimeType = datos.file.split(',')[0].split(';')[0].split(':')[1]
    const Image = new File([Buffer.from(datos.file, 'base64')], nombre + '.' + mime.extension(mimeType), { type: mimeType })
    formData.append('Image', datos.file)

    const data = {
        id : datos.id,
        codigo : datos.codigo
    }

    formData.append('data',JSON.stringify(data))

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: formData
    }

    console.log(options)
    return {msg:'ya casi perro desde activos'}
    // try {
    //     const url = urlbase + '/consultarActivo'
    //     const response = await fetch(url, options);
    //     const json = await response.json();
    //     return (json)
    // } catch (error) {
    //     console.error(error);
    // }

}

module.exports = {
    consultarListadoActivos,
    consultarActivo,
    guardarImagenActivo
}