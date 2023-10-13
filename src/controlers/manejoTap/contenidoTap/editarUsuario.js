const { ipcRenderer } = require('electron')
import { modalMensaje } from '../../helpers/modalEleccion.js';
import { generateRandomId } from '../../helpers/nombreRandon.js';
import { opcionId } from '../../helpers/activos/listasId.js';
import { cargarProveedor } from '../../usuarios/cargarProveedor.js';
import { cargarImagenFirma } from '../../helpers/cargaImagenGrid.js';
import { cargarTapContenido } from '../cargarTapContenido.js';
import { eliminarProvUsuarioBd } from '../../usuarios/eliminarProveUsuario.js';
import { guardarEdicionUsuario, guardarEdicionUsuarioExt } from '../../usuarios/guardarEdicionusuario.js';

const editarUsuario = async (id = null) => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">EDITAR USUARIO</h3>
        <div class="container-fluid w-100 d-flex mx-1">
            <div class="p-2">
                <button type="button" class="btn mt-0 pt-0 editarUsuario" title="Guardar Datos">
                    <i class="bi bi-save2-fill fs-1 text-warning"></i>
                </button>
            </div>
            <div class="ms-auto">
                <button type="button" class="btn  mt-0 pt-0 darDebaja d-none" title="Dar de baja">
                    <i class="bi bi-trash-fill fs-1 text-danger"></i>
                </button>
            </div>
        </div>
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">

                <div class="row justify-content-center mb-2 d-none contenedorConsultarUsuario">
                    <h3 class="text-center mt-1 fw-bold">Consultar Usuario</h3>
                    <div class="col-8">
                        <label for="seleccionarUsuario">Consular Un Usuario</label>
                        <input type="text" class="form-control m-1 seleccionarUsuario"
                            list="listUsuarios">
                        <datalist id="listUsuarios"></datalist>
                    </div>
                </div>

                <div class="row  justify-content-center">
                <h3 class="text-center mt-1 fw-bold">Datos Usuario</h3>
                    <div class=" col-4">

                        <label for="tipoId">Tipo Id</label>
                        <input type="text" class="form-control my-1 tipoId"
                            list="listadoTipoId">
                        <datalist id="listadoTipoId"></datalist>

                        <label for="primerNombre">Primer Nombre</label>
                        <input type="text" class="form-control my-1 primerNombre" > 

                        <label for="primerApellido">Primer Apellido</label>
                        <input type="text" class="form-control my-1 primerApellido" >
                        
                        <label for="email">email</label>
                        <input type="email" class="form-control my-1 email"
                            pattern=".+@.+" size="30" readOnly>

                        <label class="labelcontraseña d-none" for="contraseña" >contraseña</label>
                        <input type="password" class="form-control my-1 d-none contraseña" >

                    </div>
                    <div class="col-4">
                        <label for="numeroDocumento">Numero Id</label>
                        <input type="text" class="form-control my-1 numeroDocumento" readOnly>

                        <label for="segundoNombre">Segundo Nombre</label>
                        <input type="text" class="form-control my-1 segundoNombre">

                        <label for="segundoApellido">Segundo Apellido</label>
                        <input type="text" class="form-control my-1 segundoApellido" >

                        <label for="estado">Estado</label>
                        <input type="text" class="form-control my-1 estado" readOnly opcionId="ES--00" list="listEstado">
                        <datalist id="listEstado"></datalist>

                        <label class="d-none labelconfirmarContraseña" for="confirmarContraseña">Confirmar contraseña</label>
                        <input type="password" class="form-control my-1 d-none confirmarContraseña">
                        
                    </div>
                </div>
                <div class="row  justify-content-center">
                    <h3 class="text-center mt-1 fw-bold">Proveedores Asociados</h3>
                    <div class="col-8 d-none contenedorSeleccionarProveedores">
                        <label for="seleccionarProveedores">Proveedores</label>
                        <input type="text" class="form-control my-1 seleccionarProveedores"
                            list="listProveedores">
                        <datalist id="listProveedores"></datalist>
                    </div>
                </div>

                <div class="justify-content-center">
                    <div class="w-100 p-1">
                        <table class="table W-100 table-striped table-hover table-responsive">
                            <thead>
                                <tr class="text-uppercase text-center">
                                    <th scope="col">#</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Proveedor</th>
                                </tr>
                            </thead>
                            <tbody class="proveedoresUsuarios">
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                
                <div class="row  justify-content-center mx-2">
                    <h3 class="text-center mt-1 fw-bold">Permisos Asociados</h3>
                    <div class=" col-1">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkUsuarios" type="checkbox" disabled >
                            <label class="form-check-label" for="checkUsuarios">Crea, Editar Usuarios</label>
                        </div>
                    </div>
                        
                    <div class=" col-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkActivos" type="checkbox" disabled>
                            <label class="form-check-label" for="checkActivos">Crear, Editar Activos</label>
                        </div>                        
                    </div>

                    <div class=" col-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkclasificacion" type="checkbox" disabled>
                            <label class="form-check-label" for="checkclasificacion">Cambiar Clasificacion activos</label>
                        </div>                        
                    </div>

                    <div class=" col-2"> 
                            <div class="form-check form-switch">
                            <input class="form-check-input checkSolicitudes" type="checkbox" disabled>
                            <label class="form-check-label" for="checkSolicitudes">Editar Solicitudes</label>
                        </div>
                    </div>
                    <div class=" col-2"> 
                        <div class="form-check form-switch">
                            <input class="form-check-input checkReportes" type="checkbox" disabled>
                            <label class="form-check-label" for="checkReportes">Crear, editar Reportes</label>
                        </div>
                    </div>
                    <div class=" col-2"> 
                        <div class="form-check form-switch">
                            <input class="form-check-input checkConfguraciones" type="checkbox" disabled>
                            <label class="form-check-label" for="checkConfguraciones">Crear, editar Configuraciones</label>
                        </div>
                    </div>
                    <div class=" col-1"> 
                    <div class="form-check form-switch">
                        <input class="form-check-input checkInformes" type="checkbox" id>
                        <label class="form-check-label" for="checkInformes">Informes</label>
                    </div>
                </div>
                </div>
                <div class="row justify-content-center">
                <h3 class="text-center mt-1 fw-bold">Firma Del Usuario</h3>
                    <div class="form-group w-50 mx-auto text-center d-block my-2 d-none contendorInput">
                        <label for="imagenesSoporte" class="labelSeleccionarImagen">Seleccione una Firma</label>
                        <div class=" position-relative" >
                            <input class="opacity-0 position-absolute top-0 start-25 z-2 w-50 inpuImagenFirma" type="file"
                            accept="image/png, image/jpeg, image/jpg" style="box-sizing:content-box">
                            <button type="button"
                                class="btn btn-secondary position-relative fs-6 btn-lg btnimageneFirma">Cambiar Firma Usuario</button>
                        </div>
                    </div>
                </div>
                <!-- AQUI VA LA FIRMA -->
                <div class="form-group row d-block">
                    <div class="d-flex flex-row align-items-center justify-content-center imageneFirma"></div>
                </div>
            </form>
        </div>
    `
    const usuario = ipcRenderer.sendSync('consultarUsuario', id)
    if (usuario.msg) return modalMensaje({ titulo: 'ERROR', mesaje: usuario.msg })

    const edicionUsuario = seccion.querySelector('.editarUsuario')
    edicionUsuario.onclick = e=>{
        e.preventDefault()
        guardarEdicionUsuario(e, seccion)
    }
    const tipoId = seccion.querySelector('.tipoId')
    const primerNombre = seccion.querySelector('.primerNombre')
    const primerApellido = seccion.querySelector('.primerApellido')
    const email = seccion.querySelector('.email')
    const numeroDocumento = seccion.querySelector('.numeroDocumento')
    const segundoNombre = seccion.querySelector('.segundoNombre')
    const segundoApellido = seccion.querySelector('.segundoApellido')
    const table = seccion.querySelector('table')
    const checkUsuarios = seccion.querySelector('.checkUsuarios')
    const checkActivos = seccion.querySelector('.checkActivos')
    const checkclasificacion = seccion.querySelector('.checkclasificacion')
    const checkSolicitudes = seccion.querySelector('.checkSolicitudes')
    const checkReportes = seccion.querySelector('.checkReportes')
    const checkInformes = seccion.querySelector('.checkInformes')
    const checkConfguraciones = seccion.querySelector('.checkConfguraciones')
    const imageneFirma = seccion.querySelector('.imageneFirma')
    const estado = seccion.querySelector('.estado')
    const listadoTipoId = seccion.querySelector('#listadoTipoId')


    edicionUsuario.setAttribute('Usuario', 'Us-' + usuario.id)
    tipoId.value = usuario.tipoId
    primerNombre.value = usuario.primerNombre
    primerApellido.value = usuario.primerApellido
    email.value = usuario.email
    numeroDocumento.value = usuario.numeroDocumento
    segundoNombre.value = usuario.segundoNombre
    segundoApellido.value = usuario.segundoApellido
    estado.value = usuario.estado
    estado.setAttribute('opcionId', 'Es-' + usuario.estadoId);
    if (usuario.usuario) checkUsuarios.checked = true
    if (usuario.activo) checkActivos.checked = true
    if (usuario.clasificacion) checkclasificacion.checked = true
    if (usuario.solicitudes) checkSolicitudes.checked = true
    if (usuario.reporte) checkReportes.checked = true
    if (usuario.confguraciones) checkConfguraciones.checked = true
    if (usuario.informes) checkInformes.checked = true

    const contenedorImagen = document.createElement('div')
    contenedorImagen.setAttribute('nombre', `Img-${usuario.firma}`)
    contenedorImagen.classList.add('m-2', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'col-3')
    const imagen = document.createElement('img')
    imagen.classList.add('rounded', 'img-fluid', usuario.firma)
    imagen.src = usuario.firmaUrl
    contenedorImagen.appendChild(imagen)
    imageneFirma.appendChild(contenedorImagen)
    const idlista = generateRandomId()


    const tipodoc = ['CC', 'CE', 'PS', 'PE']
    const documentos = ['Cedula de Ciudadania', ' Cedula de Extranjeria', 'Pasaporte', ' Permiso Especial']

    listadoTipoId.id = `${listadoTipoId.id}${idlista}`
    tipoId.setAttribute('list', listadoTipoId.id)
    tipodoc.forEach((element, index) => {
        const option = document.createElement('option')
        option.value = element
        option.textContent = documentos[index]
        listadoTipoId.appendChild(option)
    })

    const tbody = table.querySelector('tbody')
    if (usuario.listadoEstados && usuario.listaproveedores) {
        const thead = table.querySelector('thead')
        const tr = thead.querySelector('tr')
        const th = document.createElement('th')
        th.setAttribute('scope', 'col')
        th.textContent = 'Acciones'
        tr.appendChild(th)

        checkUsuarios.disabled = false
        checkActivos.disabled = false
        checkclasificacion.disabled = false
        checkSolicitudes.disabled = false
        checkReportes.disabled = false
        checkConfguraciones.disabled = false

        email.readOnly = false
        numeroDocumento.readOnly = false

        const contraseña = seccion.querySelector('.contraseña')
        const labelcontraseña = seccion.querySelector('.labelcontraseña')
        const confirmarContraseña = seccion.querySelector('.confirmarContraseña')
        const labelconfirmarContraseña = seccion.querySelector('.labelconfirmarContraseña')
        const contenedorSeleccionarProveedores = seccion.querySelector('.contenedorSeleccionarProveedores')
        const seleccionarProveedores = seccion.querySelector('.seleccionarProveedores')
        const listProveedores = seccion.querySelector('#listProveedores')
        const listEstado = seccion.querySelector('#listEstado')
        const contendorInput = seccion.querySelector('.contendorInput')
        const inpuImagenFirma = seccion.querySelector('.inpuImagenFirma')
        

        contraseña.classList.remove('d-none')
        labelcontraseña.classList.remove('d-none')
        confirmarContraseña.classList.remove('d-none')
        labelconfirmarContraseña.classList.remove('d-none')
        contenedorSeleccionarProveedores.classList.remove('d-none')
        contendorInput.classList.remove('d-none')
        inpuImagenFirma.onchange = e => cargarImagenFirma(e, seccion)

        listProveedores.id = `${listProveedores.id}${idlista}`
        seleccionarProveedores.setAttribute('list', listProveedores.id)
        usuario.listaproveedores[0].forEach((element) => {
            const option = document.createElement('option')
            option.value = element.nombre
            option.textContent = element.id
            listProveedores.appendChild(option)
        })
        seleccionarProveedores.onchange = e => {
            e.preventDefault()
            cargarProveedor(e, seccion)}

        listEstado.id = `${listEstado.id}${idlista}`
        estado.setAttribute('list', listEstado.id)
        usuario.listadoEstados[0].forEach((element) => {
            const option = document.createElement('option')
            option.value = element.estados
            option.textContent = element.id
            listEstado.appendChild(option)
        })
        estado.onblur = e => opcionId(e)
        estado.readOnly = false

        edicionUsuario.onclick = e=>{
            e.preventDefault()
            guardarEdicionUsuarioExt(e, seccion)
        }
    }

    if (usuario.listaUsuarios) {
        const contenedorConsultarUsuario = seccion.querySelector('.contenedorConsultarUsuario')
        const seleccionarUsuario = seccion.querySelector('.seleccionarUsuario')
        const listUsuarios = seccion.querySelector('#listUsuarios')

        listUsuarios.id = `${listUsuarios.id}${idlista}`
        seleccionarUsuario.setAttribute('list', listUsuarios.id)
        usuario.listaUsuarios[0].forEach((element) => {
            const option = document.createElement('option')
            option.value = element.id
            option.textContent = element.nombre
            listUsuarios.appendChild(option)
        })
        contenedorConsultarUsuario.classList.remove('d-none')

        let logicaEjecutada = false

        seleccionarUsuario.onblur = e => {
            const id = e.target.value
            if (logicaEjecutada) return
            if (!id.includes('-')) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe selcionar un usuario valido' })
            if (parseInt(id.split('-')[1]) == NaN) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe selcionar un usuario valido' })
            logicaEjecutada = false
            cargarTapContenido('editarUsuario', id.split('-')[1])
        }

        seleccionarUsuario.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === 'Enter') {
                const id = e.target.value
                if (!id.includes('-')) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe selcionar un usuario valido' })
                if (parseInt(id.split('-')[1]) == NaN) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe selcionar un usuario valido' })
                logicaEjecutada = true
                cargarTapContenido('editarUsuario', id.split('-')[1])

            }
        })
    }

    usuario.proveedores.forEach(element => {

        const th = document.createElement('th')
        const tdid = document.createElement('td')
        const tdproveedor = document.createElement('td')
        const trs = tbody.querySelectorAll('tr')
        const tr = document.createElement('tr')
        th.setAttribute('scope', 'row')
        th.textContent = trs.length + 1
        tdid.textContent = element[0].id
        tdproveedor.textContent = element[0].nombre
        tr.appendChild(th)
        tr.appendChild(tdid)
        tr.appendChild(tdproveedor)

        if (usuario.listadoEstados && usuario.listaproveedores) {
            const tdboton = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')
            const iEliminar = document.createElement('i')
            iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
            const btnEliminar = document.createElement('button')
            btnEliminar.setAttribute('linea', trs.length)
            btnEliminar.setAttribute('usuario', 'Us-'+ usuario.id)
            btnEliminar.setAttribute('opcionId', element[0].id)
            btnEliminar.classList.add('btn', 'text-center', 'm-1', 'p-0')
            btnEliminar.appendChild(iEliminar)
            btnEliminar.onclick = e => { 
                e.preventDefault();
                eliminarProvUsuarioBd(e, seccion);                
            }
            contenedorBotones.appendChild(btnEliminar)
            tdboton.appendChild(contenedorBotones)
            tr.appendChild(tdboton)
        }
        tbody.appendChild(tr)
    });

    return seccion
}

export {
    editarUsuario
}
