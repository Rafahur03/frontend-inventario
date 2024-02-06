const urlbase = process.env.API_URL

const consultarListadoInsumos = async (token) => {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
    }
    try {
        const url = urlbase + '/consultarInsumosBodega'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const consultarUnInsumo = async (id, token) => {

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    }
    try {
        const url = urlbase + '/consultarUnInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const movimientoInsumo = async (data, token) => {

    const id = parseInt(data.cantidad)
    if (id == NaN) return { msg: 'El campo cantidad debe ser numerico' }
    console.log(data)
    if (data.insumo !== data.idInsumno) return { msg: 'El No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }
    
    return { msg: 'desde main actualizar insumo' }
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/movimientoInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const actualizarInsumosBodega = async (data, token) => {

    const id = parseInt(data.cantidad)
    if (id == NaN) return { msg: 'El campo cantidad debe ser numerico' }

    if (data.insumo !== data.idInsumno) return { msg: 'El No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }
    console.log(data)

    return { msg: 'desde main actualizar insumo' }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/actualizarInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const eliminarFactInsumo = async (data, token) => {

    console.log(data)

    if (data.insumo !== data.idInsumno) return { msg: 'El No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }


    return { msg: 'eliminar main factura insumo' }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/actualizarInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}
const guardarFactInsumo = async (data, token) => {

    console.log(data)

    if (data.insumo !== data.idInsumno) return { msg: 'El No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }


    return { msg: 'guardar main factura insumo' }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/actualizarInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const descargarFactInsumo = async (data, token) => {

    console.log(data)

    if (data.insumo !== data.idInsumno) return { msg: 'El No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }


    return { msg: 'descargar main factura insumo' }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/actualizarInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const eliminarImagInsumo = async (data, token) => {

    console.log(data)


    if (data.insumo !== data.idInsumno) return { msg: 'El No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }


    return { msg: 'eliminar main Imagen insumo' }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/actualizarInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const guardarImagInsumo = async (data, token) => {

    console.log(data)
    return { msg: 'guardar main imagen insumo' }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/actualizarInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    consultarListadoInsumos,
    consultarUnInsumo,
    movimientoInsumo,
    actualizarInsumosBodega,
    eliminarFactInsumo,
    guardarFactInsumo,
    descargarFactInsumo,
    eliminarImagInsumo,
    guardarImagInsumo
}