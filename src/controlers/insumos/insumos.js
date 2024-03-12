const urlbase = process.env.API_URL

const consultartablasInsumo = async (token) => {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
    }
    try {
        const url = urlbase + '/consultartablasInsumo'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const consultarListadoInsumos = async (token, id) => {

    if (!id.includes('--')) return { msg: 'Debe escoger una BODEGA del listado' }
    if (!id.split('--')[0].includes('-')) return { msg: 'Debe escoger una BODEGA del listado' }
    if (isNaN(parseInt(id.split('--')[0].split('-')[1]))) return { msg: 'Debe escoger una BODEGA del listado' }
    const idBodega = parseInt(id.split('--')[0].split('-')[1])

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({id:idBodega})
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

const ingresoInicalInsumo = async (data, token) => {

    if (data.insumo.includes('--') || data.insumo == '' || data.insumo.trim() == '') return { msg: 'Debe escoger un INSUMO de listado' }
    if (data.bodega.includes('--') | data.bodega == '' || data.bodega.trim() == '') return { msg: 'Debe escoger una BODEGA de listado' }
    if (data.marca.includes('--') | data.marca == '' || data.marca.trim() == '') return { msg: 'Debe escoger un marca de listado' }
    if (data.proveedor.includes('--') | data.proveedor == '' || data.proveedor.trim() == '') return { msg: 'Debe escoger un PROVEEDOR de listado' }
    if (data.factura == '' || data.factura.trim() == '') return { msg: 'El campo Factura es obligatorio' }
    if (data.cantidad == '') return { msg: 'El campo CANTIDAD INSUMO debe ser un numero, puede tener decimales' }
    if (isNaN(parseFloat(data.cantidad))) return { msg: 'El campo CANTIDAD INSUMO debe ser un numero, puede tener decimales' }
    if (parseFloat(data.cantidad) <= 0) return { msg: 'El campo CANTIDAD INSUMO debe ser mayor que 0' }
    if (data.valor == '') return { msg: 'El campo VALOR INSUMO no puede estar vacio' }
    if (isNaN(parseFloat(data.valor))) return { msg: 'El campo VALOR UNITARIO debe ser un numero, puede tener decimales' }
    if (data.valor <= 0) return { msg: 'El campo VALOR INSUMO debe ser mayor que 0' }
    if (data.imagen != '') if (!data.imagen.includes('data:image')) return { msg: 'La IMAGEN no es valida' }
    if (data.facturaPdf != '') if (!data.facturaPdf.includes('data:application/pdf;base64,')) return { msg: 'La FACTURA no es valida' }

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    try {
        const url = urlbase + '/ingresoInicalInsumo'
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

    if (!data.insumo || !data.nombre) return { msg: 'No fue posible validar los datos de la solicitu' }
    if (isNaN(parseInt(data.insumo.split('-')[1]))) return { msg: 'Insumo Invalido recargue e intente mas tarde' }
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
    ingresoInicalInsumo,
    movimientoInsumo,
    actualizarInsumosBodega,
    eliminarFactInsumo,
    guardarFactInsumo,
    descargarFactInsumo,
    eliminarImagInsumo,
    guardarImagInsumo,
    consultartablasInsumo
}