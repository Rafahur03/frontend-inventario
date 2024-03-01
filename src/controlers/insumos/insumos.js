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
    if (data.insumo !== data.idInsumno) return { msg: 'No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }
    
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

    if (data.insumo !== data.idInsumo) return { msg: 'No es posible validar el insumo ingrese nuevamnete e intentelo de nuevo' }
    console.log(data)

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

    if(!data.insumo || !data.nombre) return {msg: 'No fue posible validar los datos de la solicitu'}
    if(isNaN(parseInt(data.insumo.split('-')[1]))) return {msg: 'Insumo Invalido recargue e intente mas tarde'}
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    try {
        const url = urlbase + '/eliminarFactInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const guardarFactInsumo = async (data, token) => {

    if(data.insumo !== data.idInsumo) return { msg: 'No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    try {
        const url = urlbase + '/actualizarFactInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const descargarFactInsumo = async (data, token) => {

    if (data.insumo !== data.idInsumo) return { msg: 'No es posible validar el insumo ingrese nuevamnete e intentelo de niuevo' }
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    try {
        const url = urlbase + '/descargarFactInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const eliminarImagInsumo = async (data, token) => {

    const id = parseInt(data.insumo.split('-')[1])
    if (id == NaN) return { msg: 'Insumo invalido' }
       
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/eliminarImagInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const guardarImagInsumo = async (data, token) => {

    const id = parseInt(data.insumo.split('-')[1])
    if (id == NaN) return { msg: 'Insumo invalido' }
   
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }


    try {
        const url = urlbase + '/guardarImagInsumo'
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