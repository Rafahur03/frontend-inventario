const { consultarListasCofigActivos } = require('../tablasConfig/tablasConfig.js');

const validarDatosActivo = async (datos, token) => {

    for (const key in datos) {

        if (key === 'areaId' || key === 'marcaId' || key === 'procesoId' || key === 'estadoId' || key === 'proveedorId' || key === 'responsableId' || key === 'tipoId' || key === 'frecuecniaId' || key === 'activo') {
            if (validarVacios(datos[key])) return { msg: 'El campo ' + key.replace('Id', '') + ' no puede estar vacio escoja un elemento de la lista o primero' }

            if (validarCaracteres(datos[key])) return { msg: 'El campo ' + key.replace('Id', '') + ' no puede contener caracteres como <>, {} o [] este' }

            if (validarPalabras(datos[key])) return { msg: 'El campo ' + key.replace('Id', '') + ' no puede contener palabras reservadas como Select, from, insert ect. o este' }

            if (validarId(datos[key])) return { msg: 'este Debe escoger un elemento de la lista en el campo ' + key.replace('Id', '') }

        } else {

            if (key !== 'descripcionActivo' && key !== 'recomendacionActivo' && key !== 'observacionActivo') {

                if (validarVacios(datos[key])) return { msg: 'El campo ' + key.replace('Activo', '') + ' no puede estar vacio escoja un elemento de la lista' }

                if (validarCaracteres(datos[key])) return { msg: 'El campo ' + key.replace('Activo', '') + ' no puede contener caracteres como <>, {} o []' }

                if (validarPalabras(datos[key])) return { msg: 'El campo ' + key.replace('Activo', '') + ' no puede contener palabras reservadas como Select, from, insert ect.' }

            } else {
                if (validarCaracteres(datos[key])) return { msg: 'El campo ' + key.replace('Activo', '') + ' no puede contener caracteres como <>, {} o []' }

                if (validarPalabras(datos[key])) return { msg: 'El campo ' + key.replace('Activo', '') + ' no puede contener palabras reservadas como Select, from, insert ect.' }
            }


        }
    }
    const config = await consultarListasCofigActivos(token)
    if (config.msg) return { msg: 'no se pudieron validar correctamente los datos intentalo más tarde' }

    const areaId = datos.areaId.split('-')[1]
    const marcaId = datos.marcaId.split('-')[1]
    const procesoId = datos.procesoId.split('-')[1]
    const estadoId = datos.estadoId.split('-')[1]
    const proveedorId = datos.proveedorId.split('-')[1]
    const responsableId = datos.responsableId.split('-')[1]
    const tipoId = datos.tipoId.split('-')[1]
    const frecuecniaId = datos.frecuecniaId.split('-')[1]

    config[1].forEach(element => {
        if (element.id == marcaId) if (element.marca !== datos.marcaActivo) return { msg: 'Debe escoger una marca del listado' }
    });

    config[2].forEach(element => {
        if (element.id == procesoId) if (element.proceso !== datos.procesoActivo) return { msg: 'Debe escoger un proceso del listado' }
    });

    config[3].forEach(element => {
        if (element.id == areaId) if (element.area !== datos.areaActivo) return { msg: 'Debe escoger un area del listado' }
    });

    config[4].forEach(element => {
        if (element.id == proveedorId) {

            if (datos.proveedorActivo.includes('--')) {
                const razonSocial = datos.proveedorActivo.split('--')[1].trim()
                if (element.razon_social !== razonSocial) return { msg: 'Debe escoger un proveedor del listado' }
            } else {
                if (element.razon_social !== datos.proveedorActivo) return { msg: 'Debe escoger un proveedor del listado' }
            }   
        }

    });

    config[4][proveedorId] = datos.proveedorActivo
    config[5][tipoId] = datos.tipoActivo
    config[6][estadoId] = datos.estadoActivo
    config[7][responsableId] = datos.responsableActivo
    config[8][frecuecniaId] = datos.frecuenciaMtto

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
    validarDatosActivo

}