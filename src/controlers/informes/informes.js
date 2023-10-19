
const urlbase = process.env.API_URL

const descargaCronograma = async (datos, token) => {

    if(datos.tipo !=='pdf' && datos.tipo !=='excel') return { msg: 'No se pudo validar el tipo de archivo'}
    if(datos.filtros.every(item => item.valor === false)) return {msg: 'Debe escoger una Clasificacion de Activo'}
    if(isNaN(parseInt(datos.year))) return {msg: 'Debe escoger un año de la lista'}
    

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data:datos})
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

    if(datos.tipo !=='pdf' && datos.tipo !=='excel') return { msg: 'No se pudo validar el tipo de archivo'}
    if(datos.filtros.every(item => item.valor === false))return {msg: 'Debe escoger una Clasificacion de Activo'}


    const options = {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data:datos})
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
    if(datos.tipo !== 'pdf' && datos.tipo !== 'excel') return { msg: 'No se pudo validar el tipo de archivo'}
    if(datos.filtros.every(item => item.valor === false))return {msg: 'Debe escoger una Clasificacion de Activo'}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data:datos})
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

    if(datos.tipo !=='pdf' && datos.tipo !=='excel') return { msg: 'No se pudo validar el tipo de archivo'}
    if(datos.activo.length == 0 || datos.codigo.length == 0) return {msg: 'Debe escoger un  activo de la lista'}
    if(datos.activo.trim().length == 0 || datos.codigo.trim().length == 0) return {msg: 'Debe escoger un  activo de la lista'}
    if(isNaN(parseInt(datos.activo.split('-')[1]))) return {msg: 'Activo no valido escoja un Activo de la lista'}

    const data = {
        id: datos.activo.split('-')[1],
        codigo:datos.codigo,
        tipo:datos.tipo
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
        const url = urlbase + '/descargarIfoActCosteado'
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
    descargarIfoActCosteado
}