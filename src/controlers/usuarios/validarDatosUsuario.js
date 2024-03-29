
const validarDatosUsuario = datos => {

    if(datos.usuario) if(validarId(datos.usuario)) return { msg: 'El Usuario es invalido' }

    if (validarVacios(datos.tipoId) || validarCaracteres(datos.tipoId) || validarPalabras(datos.tipoId) || datos.tipoId.length > 2) return { msg: 'Debe escoger un tipo de identificacion del listado' }

    if (validarVacios(datos.primerNombre)) return { msg: 'El campo Primer Nombre no puede estar vacio' }

    if (validarCaracteres(datos.primerNombre)) return { msg: 'El campo Primer Nombre no puede contener caracteres como [], {}. <>, (), ect..' }

    if (validarPalabras(datos.primerNombre)) return { msg: 'El campo Primer Nombre no puede contener palabaras como Select, from, Insert, ect..' }

    if (validarCaracteres(datos.segundoNombre)) return { msg: 'El campo segundo Nombre no puede contener caracteres como [], {}. <>, (), ect..' }

    if (validarPalabras(datos.segundoNombre)) return { msg: 'El campo segundo Nombre no puede contener palabaras como Select, from, Insert, ect..' }

    if (validarVacios(datos.primerApellido)) return { msg: 'El campo Primer Apellido no puede estar vacio' }

    if (validarCaracteres(datos.primerApellido)) return { msg: 'El campo Primer Apellido no puede contener caracteres como [], {}. <>, (), ect..' }

    if (validarPalabras(datos.primerApellido)) return { msg: 'El campo Primer Apellido no puede contener palabaras como Select, from, Insert, ect..' }

    if (validarVacios(datos.segundoApellido)) return { msg: 'El campo Segundo Apellido no puede estar vacio' }

    if (validarCaracteres(datos.segundoApellido)) return { msg: 'El campo Segundo Apellido no puede contener caracteres como [], {}. <>, (), ect..' }

    if (validarPalabras(datos.segundoApellido)) return { msg: 'El campo Segundo Apellido no puede contener palabaras como Select, from, Insert, ect..' }

    if (validarVacios(datos.email)) return { msg: 'El campo Email no puede estar vacio' }

    if (validarCaracteres(datos.email)) return { msg: 'El campo Email no puede contener caracteres como [], {}. <>, (), ect..' }

    if (validarPalabras(datos.email)) return { msg: 'El campo Email no puede contener palabaras como Select, from, Insert, ect..' }

    const regex = /^[^@]+@[^@]+\.[a-zA-Z]+$/;
    if (!regex.test(datos.email)) return { msg: 'Debe ingresar un Email valido' }

    if (datos.datosExtendidos) {
        if (datos.contraseña.length > 0) {
            if (validarVacios(datos.contraseña)) return { msg: 'El campo Contraseña no puede estar vacio' }

            if (datos.contraseña.includes(' ')) return { msg: 'El campo Contraseña no puede contener espacios' }

            if (datos.contraseña !== datos.confirmarContraseña) return { msg: 'Las contraseñas no conciden' }
        }

        if (typeof datos.usuarios !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos para el menu Usuarios' }

        if (typeof datos.activos !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos para el menu Activos' }

        if (typeof datos.solicitudes !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos para el menu Solicitudes' }

        if (typeof datos.reportes !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos para el menu Reportes' }

        if (typeof datos.confguraciones !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos para el menu Configuraciones' }

        if (typeof datos.clasificacion !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos para el menu Cambiar clasificacion activos' }

        if (typeof datos.informes !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos para el menu Informes' }
        
        if (typeof datos.menuInsumo !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos para el menu Insumo' }

        if (typeof datos.editarInsumo !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos de edicion de insumos' }

        if (typeof datos.arqueoInsumo !== "boolean") return { msg: 'Debe Selecionar un estado de la opcion permisos de arqueo de insumos' }

        if (validarVacios(datos.numeroDocumento)) return { msg: 'El campo numero de documento no puede estar vacio' }

        if (parseInt(datos.numeroDocumento) == NaN) return { msg: 'El campo numero de documento solo puede contener letras' }

    }

    return true

}

const validarVacios = dato => {
    if (dato.includes(' ')) {
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

const validarId = (datos) => {
    if (!datos.includes('-')) return true
    const id = parseInt(datos.split('-')[1])
    if (id == NaN) return true
    return false
}

module.exports = {
    validarDatosUsuario
}

