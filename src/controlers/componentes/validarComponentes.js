const { ipcRenderer } = require('electron')

const { consultarTablasConfig } = require('../tablasConfig/tablasConfig.js')


const validarDatosComponente = async (componente, token, crear = null) => {

    const regex = /^\d+$/

    if (crear == null) {
        if (!regex.test(componente.idActivo)) {

            return { msg: 'El Activo No Es Valido' }
        }
    }
    
    if (!regex.test(componente.idNombre)) {

        return { msg: 'Debe seleccionar un componente valido de la lista de componentes' }
    }

    if (componente.nombre.trim() == '') {

        return { msg: 'Debe seleccionar un componente valido de la lista de componentes' }
    }

    if (componente.marca.trim() == '') {

        return { msg: 'Debe seleccionar una marca valida de la lista de marcas' }
    }

    if (!regex.test(componente.idmarca)) {

        return { msg: 'Debe seleccionar una marca valida de la lista de marcas' }
    }

    if (validarText(componente.serie)) {

        return { msg: 'los datos de serie no puede llevar catacteres como [], {}, (), <>' }
    }
    if (validarText(componente.modelo)) {

        return { msg: 'los datos de modelo no puede llevar catacteres como [], {}, (), <>' }
    }
    if (validarText(componente.capacidad)) {

        return { msg: 'los datos de capacidad no puede llevar catacteres como [], {}, (), <>' }
    }

    const componentes = await consultarTablasConfig(4, token)

    for (key in componentes) {
        let encontrado = null
        if (componentes[key].id == componente.idNombre) if (componentes[key].componente.trim() !== componente.nombre.trim()) {
            encontrado = 1
            return { msg: 'Debe escoger una marca del listado' }
        }
        if (encontrado !== null) break
        if (componentes.length === key + 1) return { msg: 'Debe escoger una marca del listado' }
    }

    const marcas = await consultarTablasConfig(2, token)

    for (key in marcas) {
        let encontrado = null
        if (marcas[key].id == componente.idmarca) if (marcas[key].marca.trim() !== componente.marca.trim()) {
            encontrado = 1
            return { msg: 'Debe escoger una marca del listado' }
        }
        if (encontrado !== null) break
        if (marcas.length === key + 1) return { msg: 'Debe escoger una marca del listado' }
    }

    return true
}

const validarText = str => {
    return str.includes('{') || str.includes('}') || str.includes('()') || str.includes(')') || str.includes('(') || str.includes('<') || str.includes('>')
}


module.exports = {
    validarDatosComponente
}