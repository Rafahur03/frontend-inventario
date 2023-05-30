require('dotenv').config()
const mime = require('mime-types')
const urlbase = process.env.API_URL

const consultarListadoActivos = async token => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
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
        body: JSON.stringify({ id })

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


    const mimeType = datos.dataImagen.split(',')[0].split(';')[0].split(':')[1]
    const extensiones = ['png', 'jpg', 'jpeg']
    if (!extensiones.includes(mime.extension(mimeType))) return { msg: 'Solo se aceptan imagenes en formato png, jpg o jpeg' }

    const imgBase64 = datos.dataImagen.split(',')[1]
    const decodedData = Buffer.from(imgBase64, 'base64');
    const sizeInBytes = decodedData.length
    if (sizeInBytes > 3145728) return { msg: 'Solo se aceptan imagenes de tamaño hasta 3 Mb' }
    
    const data = {
        id: datos.id,
        codigo: datos.codigo,
        Imagen: datos.dataImagen
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
    }

    try {
        const url = urlbase + '/guardarImagenActivo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const eliminarImagenActivo = async (datos, token) => {

    const data = {
        id: datos.activo.split('-')[1],
        codigo: datos.codigo,
        imagen: datos.nombre.split('-')[1]
    }
    
    const options = {   
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
    }

    try {
        const url = urlbase + '/eliminarImagenActivo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}


module.exports = {
    consultarListadoActivos,
    consultarActivo,
    guardarImagenActivo,
    eliminarImagenActivo
}