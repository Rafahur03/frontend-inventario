require('dotenv').config()
const mime = require('mime-types')
const { validarDatosActivo } = require('./validarDatosActivo.js')
const { validarDatosComponente } = require('../componentes/validarComponentes.js')
const {validarImagenes} = require('../helpers/validarImagenes.js')
const {validarDocumentos} = require('../helpers/validarDocumentos.js')

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

const actualizarDatosActivos = async (datos, token) => {

    const validacion = await validarDatosActivo(datos, token)
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
        const url = urlbase + '/actualizarActivo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const crearActivo = async (data, token) => {

    const imagenes = data.imagenes
    const componentes = data.componentes
    const documentos = data.documentos
    const campos = data
    delete campos.imagenes
    delete campos.componentes
    delete campos.documentos

    const validacionCampos = await validarDatosActivo(campos, token, 'crear')
    if (validacionCampos.msg) return validacionCampos

    if (imagenes.length > 0) {
        for(let imagen of imagenes){
            const validacionImagen = validarImagenes(imagen)
            if(validacionImagen.msg) return validacionImagen
        }
    } else {
        return { msg: 'El activo debe tener almenos una Imagen' }
    }

    if (documentos.length > 0) {
        for(let documento of documentos){
            const validacionDocumento = validarDocumentos(documento)
            if(validacionDocumento.msg) return validacionDocumento
        }
    }

    if (componentes.length > 0) {
        for(let componente of componentes){
            componente.idNombre = componente.idNombre.split('-')[1]      
            componente.idmarca = componente.idmarca.split('-')[1] 
            const validacionComponente = await validarDatosComponente(componente, token, 'crear')
            if(validacionComponente.msg) return validacionComponente
        }
    }   

    const datos= campos 
    datos.imagenes = imagenes
    datos.documentos = documentos
    datos.componentes = componentes


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ datos })
    }
    try {
        const url = urlbase + '/crearActivos'
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
        imagen: `${datos.nombre.split('-')[1]}-${datos.nombre.split('-')[2]}`
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

const eliminarDocumento = async (datos, token) => {

    const data = {
        id: datos.activo.split('-')[1],
        documento: datos.documento,
    }

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    try {
        const url = urlbase + '/eliminarDocumento'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud verifique mas tarde o intente mas tarde' })
    }

}

const descargarDocumento = async (datos, token) => {

    const data = {
        id: datos.activo.split('-')[1],
        documento: datos.documento,
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
        const url = urlbase + '/descargarDocumento'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}

const guardarDocumento = async (datos, token) => {
    const mimeType = datos.file.split(',')[0].split(';')[0].split(':')[1]
    if (mime.extension(mimeType) !== 'pdf') return { msg: 'Solo se aceptan documentos en formato pdf' }

    const imgBase64 = datos.file.split(',')[1]
    const decodedData = Buffer.from(imgBase64, 'base64');
    const sizeInBytes = decodedData.length
    if (sizeInBytes > 3145728) return { msg: 'Solo se aceptan documentos de tamaño menor de 3 Mb' }

    const data = {
        id: datos.activo.split('-')[1],
        documento: datos.documento,
        file: datos.file
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
        const url = urlbase + '/guardarDocumento'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud verifique mas tarde o intente mas tarde' })
    }

}

const descargarHojaDeVida = async (datos, token) => {
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
        const url = urlbase + '/descargarHojaDeVida'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}

const eliminarActivo = async (datos, token) => {

    const data = {
        id: datos.activo.split('-')[1],
        codigo: datos.codigo,
    }

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    try {
        const url = urlbase + '/eliminarActivo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud verifique mas tarde o intente mas tarde' })
    }

}

const consultarDatosActivoSolicitud = async (id, token) => {
    const idActivo = id.split('-')[1]
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id:idActivo })

    }


    try {
        const url = urlbase + '/consultarDatosActivoSolicitud'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const consultarDatosActivoReportePrev = async (id, token) => {
    const idActivo = id.split('-')[1]
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id:idActivo })

    }


    try {
        const url = urlbase + '/consultarDatosActivoReportePrev'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}


module.exports = {
    consultarListadoActivos,
    actualizarDatosActivos,
    consultarActivo,
    guardarImagenActivo,
    eliminarImagenActivo,
    eliminarDocumento,
    descargarDocumento,
    guardarDocumento,
    descargarHojaDeVida,
    eliminarActivo,
    crearActivo,
    consultarDatosActivoSolicitud,
    consultarDatosActivoReportePrev
}