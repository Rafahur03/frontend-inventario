const mime = require('mime-types')
const { validarDatosActivo } = require('./validarDatosActivo.js')
const { validarDatosComponente } = require('../componentes/validarComponentes.js')
const { validarImagenes } = require('../helpers/validarImagenes.js')
const { validarDocumentos } = require('../helpers/validarDocumentos.js')

const urlbase = process.env.API_URL

const consultarListadoActivos = async (token) => {

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

const consultarlistadoActivoFiltrado = async (data, token) => {

    for (let i = 0; i < data.filtros.length; i++) {
        if(typeof data.filtros[i].id != 'string' ||  typeof data.filtros[i].valor != 'boolean') return {msg: 'Debe escoger una Clasificacion de Activo valida'}
    }
    if(typeof data.dadoBaja != 'boolean') return {msg:'El checkbox dado de baja no es valido'}
    if(data.filtros.every(item => item.valor === false)) return {msg: 'Debe escoger una Clasificacion de Activo'}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data})
    }
    try {
        const url = urlbase + '/consultarlistadoActivoFiltrado'
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

const crearActivo = async (datos, token) => {

    const { imagenes, documentos, componentes, ...datosActivos } = datos
    const validacionCampos = await validarDatosActivo(datosActivos, token, 'crear')
    if (validacionCampos.msg) return validacionCampos

    if (imagenes.length > 0) {
        for (let imagen of imagenes) {
            const validacionImagen = validarImagenes(imagen)
            if (validacionImagen.msg) return validacionImagen
        }
    } else {
        return { msg: 'El activo debe tener al menos una Imagen' }
    }

    if (documentos.length > 0) {
        for (let documento of documentos) {
            const validacionDocumento = validarDocumentos(documento)
            if (validacionDocumento.msg) return validacionDocumento
        }
    }

    if (componentes.length > 0) {
        for (let componente of componentes) {
            componente.idNombre = componente.idNombre.split('-')[1]
            componente.idmarca = componente.idmarca.split('-')[1]
            const validacionComponente = await validarDatosComponente(componente, token, 'crear')
            if (validacionComponente.msg) return validacionComponente
        }
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
    if (sizeInBytes > 6291456) return { msg: 'Solo se aceptan imagenes de tamaño hasta 6 Mb' }

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
        imagen: `${datos.nombre.split('-')[1]}`
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
    if (sizeInBytes > 15000000) return { titulo: 'ERROR', mensaje: 'El documento exede los 15Mb' }

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
        body: JSON.stringify({ id: idActivo })

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
        body: JSON.stringify({ id: idActivo })

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

const consultarActivoCambiarClasificacion = async (id, token) => {
    if(parseInt(id) === NaN) return {msg: 'El ID del activo no es valido'}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    }

    try {
        const url = urlbase + '/consultarActivoCambiarClasificacion'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }
}

const modificarClasificacion = async (data, token) => {

    if(parseInt(data.id) === NaN) return {msg: 'El ID del activo no es valido'}
    if(parseInt(data.siglas.split('-')[1]) === NaN) return {msg: 'La clasificacion No es valida, debe escoger una clasificacion del listado'}
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data})
    }


    try {
        const url = urlbase + '/cambiarClasificacion'
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
    consultarDatosActivoReportePrev,
    consultarActivoCambiarClasificacion,
    modificarClasificacion,
    consultarlistadoActivoFiltrado
}