
const urlbase = process.env.API_URL

const descargaCronograma = async (datos, token) => {

    if (datos.tipo !== 'pdf' && datos.tipo !== 'excel') return { msg: 'No se pudo validar el tipo de archivo' }
    if (datos.filtros.every(item => item.valor === false)) return { msg: 'Debe escoger una Clasificacion de Activo' }
    if (isNaN(parseInt(datos.year))) return { msg: 'Debe escoger un año de la lista' }


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: datos })
    }

    try {
        const url = urlbase + '/descargaCronograma'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}

const informelistadoAct = async (datos, token) => {

    if (datos.tipo !== 'pdf' && datos.tipo !== 'excel') return { msg: 'No se pudo validar el tipo de archivo' }
    if (datos.filtros.every(item => item.valor === false)) return { msg: 'Debe escoger una Clasificacion de Activo' }
    if (typeof datos.estado !== 'boolean') return { msg: 'Debe Selecconar un filtro de estado valido' }


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: datos })
    }

    try {
        const url = urlbase + '/informelistadoAct'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}

const informelistadoActCost = async (datos, token) => {
    if (datos.tipo !== 'pdf' && datos.tipo !== 'excel') return { msg: 'No se pudo validar el tipo de archivo' }
    if (datos.filtros.every(item => item.valor === false)) return { msg: 'Debe escoger una Clasificacion de Activo' }
    if (typeof datos.estado !== 'boolean') return { msg: 'Debe Selecconar un filtro de estado valido' }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: datos })
    }

    try {
        const url = urlbase + '/informelistadoActCost'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}

const descargarIfoActCosteado = async (datos, token) => {

    if (datos.activo.length == 0 || datos.codigo.length == 0) return { msg: 'Debe escoger un  activo de la lista' }
    if (datos.activo.trim().length == 0 || datos.codigo.trim().length == 0) return { msg: 'Debe escoger un  activo de la lista' }
    if (isNaN(parseInt(datos.activo.split('-')[1]))) return { msg: 'Activo no valido escoja un Activo de la lista' }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: datos })
    }

    try {
        const url = urlbase + '/descargarIfoActCosteado'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}

const informelistadoReportes = async (datos, token) => {
    for (let i = 0; i < datos.filtros.length; i++) {
        if (typeof datos.filtros[i].id != 'string' || typeof datos.filtros[i].valor != 'boolean') return { msg: 'Debe escoger una Clasificacion de Activo valida' }
    }

    if (datos.filtros.every(item => item.valor === false)) return { msg: 'Debe escoger una Clasificacion de Activo' }
    const patrondefecha = /^\d{4}-\d{2}-\d{2}$/
    if (datos.fechaInicialReporte != '') if (!patrondefecha.test(datos.fechaInicialReporte)) return { msg: 'La fecha de inicio no es valida' }
    if (datos.fechaFinalReporte != '') if (!patrondefecha.test(datos.fechaFinalReporte)) return { msg: 'La fecha de Final no es valida' }


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: datos })
    }

    try {
        const url = urlbase + '/informelistadoReportes'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}

const informelistadoSolicitudes = async (datos, token) => {

    for (let i = 0; i < datos.filtros.length; i++) {
        if (typeof datos.filtros[i].id != 'string' || typeof datos.filtros[i].valor != 'boolean') return { msg: 'Debe escoger una Clasificacion de Activo valida' }
    }

    if (datos.filtros.every(item => item.valor === false)) return { msg: 'Debe escoger una Clasificacion de Activo' }
    const patrondefecha = /^\d{4}-\d{2}-\d{2}$/
    if (datos.fechaInicialSolicitud != '') if (!patrondefecha.test(datos.fechaInicialSolicitud)) return { msg: 'La fecha de inicio no es valida' }
    if (datos.fechaFinalSolicitud != '') if (!patrondefecha.test(datos.fechaFinalSolicitud)) return { msg: 'La fecha de Final no es valida' }


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: datos })
    }

    try {
        const url = urlbase + '/informelistadoSolicitudes'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}

const informeMovimientoInsumos = async (datos, token) => {

   console.log(datos)

   const id = parseInt(datos.insumo.split('-')[1])
   if (id == NaN) return { msg: 'Insumo invalido' }
  
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: datos })
    }

    try {
        const url = urlbase + '/informeMovimientoInsumos'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
        return ({ msg: 'ocurrio un error durante la solicitud intente mas tarde' })
    }

}


module.exports = {
    descargaCronograma,
    informelistadoAct,
    informelistadoActCost,
    descargarIfoActCosteado,
    informelistadoReportes,
    informelistadoSolicitudes,
    informeMovimientoInsumos
}