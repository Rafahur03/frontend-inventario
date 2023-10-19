const urlbase = process.env.API_URL

const consultarListasCofigActivos = async token => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const url = urlbase + '/consultarListasConfActivos'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }
}

const consultarListasCofigReporte = async token => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const url = urlbase + '/consultarListasCofigReporte'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const consultarTodasTablasConfig = async token => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
    try {
        const url = urlbase + '/consultarTodasTablasConfig'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

const consultarTablasConfig = async (config, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ config })

    }

    try {
        const url = urlbase + '/consultarconfig'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }
}

const crearConfig = async (data, token) => {
    switch (data.id) {
        case 'area':
            if (!data.area) return { msg: ' el campo Nombre del Area es obligatorio' }
            if (validarVacios(data.area)) return { msg: ' el campo Nombre del area es obligatorio' }
            if (validarPalabras(data.area)) return { msg: ' el campo Nombre del area no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.area)) return { msg: ' el campo Nombre del area no debe llevar palabras reservadas como [], {},()' }
            data.id = 1
            break
        case 'marca':
            if (!data.marca) return { msg: ' el campo Nombre del Marca es obligatorio' }
            if (validarVacios(data.marca)) return { msg: ' el campo Nombre del Marca es obligatorio' }
            if (validarPalabras(data.marca)) return { msg: ' el campo Nombre del Marca no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.marca)) return { msg: ' el campo Nombre del Marca no debe llevar palabras reservadas como [], {},()' }
            data.id = 2
            break
        case 'tipoActivo':
            if (!data.tipoActivo) return { msg: ' el campo Nombre del Tipo Activo es obligatorio' }
            if (validarVacios(data.tipoActivo)) return { msg: ' el campo Nombre del Tipo Activo es obligatorio' }
            if (validarPalabras(data.tipoActivo)) return { msg: ' el campo Nombre del Tipo Activo no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.tipoActivo)) return { msg: ' el campo Nombre del Tipo Activo no debe llevar palabras reservadas como [], {},()' }
            data.id = 3
            break
        case 'componente':
            if (!data.componente) return { msg: ' el campo Nombre del componente es obligatorio' }
            if (validarVacios(data.componente)) return { msg: ' el campo Nombre del Componente es obligatorio' }
            if (validarPalabras(data.componente)) return { msg: ' el campo Nombre del Componente no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.componente)) return { msg: ' el campo Nombre del Componente no debe llevar palabras reservadas como [], {},()' }
            data.id = 4
            break
        case 'frecuencia':
            if (!data.frecuencia) return { msg: ' el campo Nombre de la frecuencia es obligatorio' }
            if (validarVacios(data.frecuencia)) return { msg: ' el campo Nombre de la Frecuencia es obligatorio' }
            if (validarPalabras(data.frecuencia)) return { msg: ' el campo Nombre de la Frecuencia no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.frecuencia)) return { msg: ' el campo Nombre de la Frecuencia no debe llevar palabras reservadas como [], {},()' }
            if (!data.dias) return { msg: ' el campo dias de la Frecuencia es obligatorio' }
            if (validarVacios(data.dias)) return { msg: ' el campo dias de la Frecuencia es obligatorio' }
            if (parseInt(data.dias) == NaN) return { msg: ' el campo dias de la Frecuencia debe ser numerico' }
            data.id = 5
            break
        case 'proceso':
            if (!data.proceso) return { msg: ' el campo Nombre del Proceso es obligatorio' }
            if (validarVacios(data.proceso)) return { msg: ' el campo Nombre del Proceso es obligatorio' }
            if (validarPalabras(data.proceso)) return { msg: ' el campo Nombre del Proceso no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.proceso)) return { msg: ' el campo Nombre del Proceso no debe llevar palabras reservadas como [], {},()' }
            if (!data.sigla) return { msg: ' el campo Siglas del Proceso es obligatorio' }
            if (validarVacios(data.sigla)) return { msg: ' el campo Siglas del Proceso es obligatorio' }
            if (validarPalabras(data.sigla)) return { msg: ' el campo Siglas del Proceso no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.sigla)) return { msg: ' el campo Siglas del Proceso no debe llevar palabras reservadas como [], {},()' }
            data.id = 6
            break
        case 'clasificacionActivo':
            if (!data.clasificacion) return { msg: ' el campo Nombre del Clasificacion Activo es obligatorio' }
            if (validarVacios(data.clasificacion)) return { msg: ' el campo Nombre del Clasificacion Activo es obligatorio' }
            if (validarPalabras(data.clasificacion)) return { msg: ' el campo Nombre del Clasificacion Activo no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.clasificacion)) return { msg: ' el campo Nombre del Clasificacion Activo no debe llevar palabras reservadas como [], {},()' }
            if (!data.sigla) return { msg: ' el campo Siglas de la Clasificacion Activo es obligatorio' }
            if (validarVacios(data.sigla)) return { msg: ' el campo Siglas de la Clasificacion Activo es obligatorio' }
            if (validarPalabras(data.sigla)) return { msg: ' el campo Siglas de la Clasificacion Activo no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.sigla)) return { msg: ' el campo Siglas de la Clasificacion Activo no debe llevar palabras reservadas como [], {},()' }
            data.id = 7
            break
        case 'proveedor':
            if (!data.proveedor) return { msg: ' el campo Nombre del Proveedor es obligatorio' }
            if (validarVacios(data.proveedor)) return { msg: ' el campo Nombre del Proveedor es obligatorio' }
            if (validarPalabras(data.proveedor)) return { msg: ' el campo Nombre del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.proveedor)) return { msg: ' el campo Nombre del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.razonProveedor) return { msg: ' el campo Razon Social del Proveedor es obligatorio' }
            if (validarVacios(data.razonProveedor)) return { msg: ' el campo Razon Social del Proveedor es obligatorio' }
            if (validarPalabras(data.razonProveedor)) return { msg: ' el campo Razon Social del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.razonProveedor)) return { msg: ' el campo Razon Social del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.nitProveedor) return { msg: ' el campo Nit O CC del Proveedor es obligatorio' }
            if (validarVacios(data.nitProveedor)) return { msg: ' el campo Nit O CC del Proveedor es obligatorio' }
            if (validarPalabras(data.nitProveedor)) return { msg: ' el campo Nit O CC del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.nitProveedor)) return { msg: ' el campo Nit O CC del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.dvProveedor) return { msg: ' el campo Digito de verificacion del Proveedor es obligatorio' }
            if (validarVacios(data.dvProveedor)) return { msg: ' el campo Digito de verificacion del Proveedor es obligatorio' }
            if (parseInt(data.dvProveedor) == NaN) return { msg: ' el campo Digito de verificacion del Proveedor debe ser un numero' }
            if (!data.contactoProveedor) return { msg: ' el campo Contacto del Proveedor es obligatorio' }
            if (validarVacios(data.contactoProveedor)) return { msg: ' el campo Contacto del Proveedor es obligatorio' }
            if (validarPalabras(data.contactoProveedor)) return { msg: ' el campo Contacto del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.contactoProveedor)) return { msg: ' el campo Contacto del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.telefonosProveedor) return { msg: ' el campo telefono del Proveedor es obligatorio' }
            if (validarVacios(data.telefonosProveedor)) return { msg: ' el campo telefono del Proveedor es obligatorio' }
            if (validarPalabras(data.telefonosProveedor)) return { msg: ' el campo telefono del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.telefonosProveedor)) return { msg: ' el campo telefono del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.direccionProveedor) return { msg: ' el campo Dirrecion del Proveedor es obligatorio' }
            if (validarVacios(data.direccionProveedor)) return { msg: ' el campo Dirrecion del Proveedor es obligatorio' }
            if (validarPalabras(data.direccionProveedor)) return { msg: ' el campo Dirrecion del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.direccionProveedor)) return { msg: ' el campo Dirrecion del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.descripcionProveedor) return { msg: ' el campo Descripcion del Proveedor es obligatorio' }
            if (validarVacios(data.descripcionProveedor)) return { msg: ' el campo Descripcion del Proveedor es obligatorio' }
            if (validarPalabras(data.descripcionProveedor)) return { msg: ' el campo Descripcion del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.descripcionProveedor)) return { msg: ' el campo Descripcion del Proveedor no debe llevar palabras reservadas como [], {},()' }
            data.id = 8
            break
        default:
            return res.json({ msg: 'Su solicitud no pudo ser procesada o es invalida' })
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
        const url = urlbase + '/crearConfig'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }
}

const actualizarConfig = async (data, token) => {
    switch (data.id) {
        case 'area':
            if (!data.idArea) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (validarId(data.idArea)) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (!data.area) return { msg: ' El campo Nombre del Area es obligatorio' }
            if (validarVacios(data.area)) return { msg: ' El campo Nombre del area es obligatorio' }
            if (validarPalabras(data.area)) return { msg: ' El campo Nombre del area no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.area)) return { msg: ' El campo Nombre del area no debe llevar palabras reservadas como [], {},()' }
            if (!data.estado) return { msg: 'El Campo estado del Area no es valido, Escoja un estado de la lista' }
            if (validarId(data.estado)) return { msg: 'El Campo estado del Area no es valido, Escoja un estado de la lista' }
            data.id = 1
            break
        case 'marca':
            if (!data.idMarca) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (validarId(data.idMarca)) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (!data.marca) return { msg: ' el campo Nombre del Marca es obligatorio' }
            if (validarVacios(data.marca)) return { msg: ' el campo Nombre del Marca es obligatorio' }
            if (validarPalabras(data.marca)) return { msg: ' el campo Nombre del Marca no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.marca)) return { msg: ' el campo Nombre del Marca no debe llevar palabras reservadas como [], {},()' }
            if (!data.estado) return { msg: 'El Campo estado de la Marca no es valido, Escoja un estado de la lista' }
            if (validarId(data.estado)) return { msg: 'El Campo estado de la Marca no es valido, Escoja un estado de la lista' }

            data.id = 2
            break
        case 'tipoActivo':
            if (!data.idTipoActivo) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (validarId(data.idTipoActivo)) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (!data.tipoActivo) return { msg: ' el campo Nombre del Tipo Activo es obligatorio' }
            if (validarVacios(data.tipoActivo)) return { msg: ' el campo Nombre del Tipo Activo es obligatorio' }
            if (validarPalabras(data.tipoActivo)) return { msg: ' el campo Nombre del Tipo Activo no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.tipoActivo)) return { msg: ' el campo Nombre del Tipo Activo no debe llevar palabras reservadas como [], {},()' }
            if (!data.estado) return { msg: 'El Campo estado del Tipo de Activo no es valido, Escoja un estado de la lista' }
            if (validarId(data.estado)) return { msg: 'El Campo estado del Tipo de Activo no es valido, Escoja un estado de la lista' }

            data.id = 3
            break
        case 'componente':
            if (!data.idComponente) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (validarId(data.idComponente)) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (!data.componente) return { msg: ' el campo Nombre del componente es obligatorio' }
            if (validarVacios(data.componente)) return { msg: ' el campo Nombre del Componente es obligatorio' }
            if (validarPalabras(data.componente)) return { msg: ' el campo Nombre del Componente no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.componente)) return { msg: ' el campo Nombre del Componente no debe llevar palabras reservadas como [], {},()' }
            if (!data.estado) return { msg: 'El Campo estado del Componente no es valido, Escoja un estado de la lista' }
            if (validarId(data.estado)) return { msg: 'El Campo estado del Componente no es valido, Escoja un estado de la lista' }

            data.id = 4
            break
        case 'frecuencia':
            if (!data.idFrecuencia) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (validarId(data.idFrecuencia)) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (!data.frecuencia) return { msg: ' el campo Nombre de la frecuencia es obligatorio' }
            if (validarVacios(data.frecuencia)) return { msg: ' el campo Nombre de la Frecuencia es obligatorio' }
            if (validarPalabras(data.frecuencia)) return { msg: ' el campo Nombre de la Frecuencia no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.frecuencia)) return { msg: ' el campo Nombre de la Frecuencia no debe llevar palabras reservadas como [], {},()' }
            if (!data.dias) return { msg: ' el campo dias de la Frecuencia es obligatorio' }
            if (validarVacios(data.dias)) return { msg: ' el campo dias de la Frecuencia es obligatorio' }
            if (parseInt(data.dias) == NaN) return { msg: ' el campo dias de la Frecuencia debe ser numerico' }
            if (!data.estado) return { msg: 'El Campo estado de la Frecuencia no es valido, Escoja un estado de la lista' }
            if (validarId(data.estado)) return { msg: 'El Campo estado de la Frecuencia no es valido, Escoja un estado de la lista' }

            data.id = 5
            break
        case 'proceso':
            if (!data.idProceso) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (validarId(data.idProceso)) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (!data.proceso) return { msg: ' el campo Nombre del Proceso es obligatorio' }
            if (validarVacios(data.proceso)) return { msg: ' el campo Nombre del Proceso es obligatorio' }
            if (validarPalabras(data.proceso)) return { msg: ' el campo Nombre del Proceso no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.proceso)) return { msg: ' el campo Nombre del Proceso no debe llevar palabras reservadas como [], {},()' }
            if (!data.sigla) return { msg: ' el campo Siglas del Proceso es obligatorio' }
            if (validarVacios(data.sigla)) return { msg: ' el campo Siglas del Proceso es obligatorio' }
            if (validarPalabras(data.sigla)) return { msg: ' el campo Siglas del Proceso no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.sigla)) return { msg: ' el campo Siglas del Proceso no debe llevar palabras reservadas como [], {},()' }
            if (!data.estado) return { msg: 'El Campo estado del Proceso no es valido, Escoja un estado de la lista' }
            if (validarId(data.estado)) return { msg: 'El Campo estado del Proceso no es valido, Escoja un estado de la lista' }

            data.id = 6
            break
        case 'clasificacionActivo':
            if (!data.idClasificacionActivo) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (validarId(data.idClasificacionActivo)) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (!data.clasificacion) return { msg: ' el campo Nombre del Clasificacion Activo es obligatorio' }
            if (validarVacios(data.clasificacion)) return { msg: ' el campo Nombre del Clasificacion Activo es obligatorio' }
            if (validarPalabras(data.clasificacion)) return { msg: ' el campo Nombre del Clasificacion Activo no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.clasificacion)) return { msg: ' el campo Nombre del Clasificacion Activo no debe llevar palabras reservadas como [], {},()' }
            if (!data.sigla) return { msg: ' el campo Siglas de la Clasificacion Activo es obligatorio' }
            if (validarVacios(data.sigla)) return { msg: ' el campo Siglas de la Clasificacion Activo es obligatorio' }
            if (validarPalabras(data.sigla)) return { msg: ' el campo Siglas de la Clasificacion Activo no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.sigla)) return { msg: ' el campo Siglas de la Clasificacion Activo no debe llevar palabras reservadas como [], {},()' }
            if (!data.estado) return { msg: 'El Campo estado del Clasificacion Activo no es valido, Escoja un estado de la lista' }
            if (validarId(data.estado)) return { msg: 'El Campo estado del Clasificacion Activo no es valido, Escoja un estado de la lista' }

            data.id = 7
            break
        case 'proveedor':
            if (!data.idProveedor) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (validarId(data.idProveedor)) return { msg: 'Solicitud no valida, actualice la pagina e intente de nuevo' }
            if (!data.proveedor) return { msg: ' el campo Nombre del Proveedor es obligatorio' }
            if (validarVacios(data.proveedor)) return { msg: ' el campo Nombre del Proveedor es obligatorio' }
            if (validarPalabras(data.proveedor)) return { msg: ' el campo Nombre del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.proveedor)) return { msg: ' el campo Nombre del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.razonProveedor) return { msg: ' el campo Razon Social del Proveedor es obligatorio' }
            if (validarVacios(data.razonProveedor)) return { msg: ' el campo Razon Social del Proveedor es obligatorio' }
            if (validarPalabras(data.razonProveedor)) return { msg: ' el campo Razon Social del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.razonProveedor)) return { msg: ' el campo Razon Social del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.nitProveedor) return { msg: ' el campo Nit O CC del Proveedor es obligatorio' }
            if (validarVacios(data.nitProveedor)) return { msg: ' el campo Nit O CC del Proveedor es obligatorio' }
            if (validarPalabras(data.nitProveedor)) return { msg: ' el campo Nit O CC del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.nitProveedor)) return { msg: ' el campo Nit O CC del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.dvProveedor) return { msg: ' el campo Digito de verificacion del Proveedor es obligatorio' }
            if (validarVacios(data.dvProveedor)) return { msg: ' el campo Digito de verificacion del Proveedor es obligatorio' }
            if (parseInt(data.dvProveedor) == NaN) return { msg: ' el campo Digito de verificacion del Proveedor debe ser un numero' }
            if (!data.contactoProveedor) return { msg: ' el campo Contacto del Proveedor es obligatorio' }
            if (validarVacios(data.contactoProveedor)) return { msg: ' el campo Contacto del Proveedor es obligatorio' }
            if (validarPalabras(data.contactoProveedor)) return { msg: ' el campo Contacto del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.contactoProveedor)) return { msg: ' el campo Contacto del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.telefonosProveedor) return { msg: ' el campo telefono del Proveedor es obligatorio' }
            if (validarVacios(data.telefonosProveedor)) return { msg: ' el campo telefono del Proveedor es obligatorio' }
            if (validarPalabras(data.telefonosProveedor)) return { msg: ' el campo telefono del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.telefonosProveedor)) return { msg: ' el campo telefono del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.direccionProveedor) return { msg: ' el campo Dirrecion del Proveedor es obligatorio' }
            if (validarVacios(data.direccionProveedor)) return { msg: ' el campo Dirrecion del Proveedor es obligatorio' }
            if (validarPalabras(data.direccionProveedor)) return { msg: ' el campo Dirrecion del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.direccionProveedor)) return { msg: ' el campo Dirrecion del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.descripcionProveedor) return { msg: ' el campo Descripcion del Proveedor es obligatorio' }
            if (validarVacios(data.descripcionProveedor)) return { msg: ' el campo Descripcion del Proveedor es obligatorio' }
            if (validarPalabras(data.descripcionProveedor)) return { msg: ' el campo Descripcion del Proveedor no debe llevar palabras reservadas como SELECT, FROM WHERE' }
            if (validarCaracteres(data.descripcionProveedor)) return { msg: ' el campo Descripcion del Proveedor no debe llevar palabras reservadas como [], {},()' }
            if (!data.estado) return { msg: 'El Campo estado del Proveedor no es valido, Escoja un estado de la lista' }
            if (validarId(data.estado)) return { msg: 'El Campo estado del Proveedor no es valido, Escoja un estado de la lista' }

            data.id = 8
            break
        default:
            return res.json({ msg: 'Su solicitud no pudo ser procesada o es invalida' })
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
        const url = urlbase + '/actualizarConfig'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }
}

const validarId = (datos) => {
    if (!datos.includes('-')) return true
    const id = parseInt(datos.split('-')[1])
    if (id == NaN) return true
    return false
}

const validarVacios = dato => {
    if (dato.includes('')) {
        if (dato.trim() == '') return true
    } else {
        if (dato == '') return true
    }
    return false
}

const validarCaracteres = dato => {
    if (dato.includes('{') || dato.includes('}') || dato.includes('(') || dato.includes(')') || dato.includes('[') || dato.includes(']') || dato.includes('<') || dato.includes('>')) {
        return true
    }
    return false
}

const validarPalabras = dato => {
    if (dato.includes('select') || dato.includes('Select') || dato.includes('SELECT') || dato.includes('FROM') || dato.includes('From') || dato.includes('from') || dato.includes('insert') || dato.includes('Insert') || dato.includes('INSERT')) {
        return true
    }
    return false
}


module.exports = {
    consultarTablasConfig,
    consultarListasCofigActivos,
    consultarListasCofigReporte,
    consultarTodasTablasConfig,
    crearConfig,
    actualizarConfig
}