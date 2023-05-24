const validarDatosComponente =  componente => {

    const  regex = /^\d+$/

    if (!regex.test(componente.activo)) {

        return { msg: 'El Activo No Es Valido' }
    }

    if (!regex.test(componente.idNombre)) {

        return { msg: 'Debe seleccionar un componente valido de la lista de componentes' }
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

    return true
}

const validarText = str => {
    return str.includes('{') || str.includes('}') || str.includes('()') || str.includes(')') || str.includes('(')
}


module.exports = {
    validarDatosComponente
}