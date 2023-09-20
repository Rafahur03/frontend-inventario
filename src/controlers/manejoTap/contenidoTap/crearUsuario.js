const { ipcRenderer } = require('electron')
import { generateRandomId } from '../../helpers/nombreRandon.js';
import { cargarImagenFirma } from '../../helpers/cargaImagenGrid.js';
import { guardarUsuario } from '../../usuarios/guardarUsuario.js';
import { cargarProveedor } from '../../usuarios/cargarProveedor.js';

const crearUsuario = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="text-center mt-1 fw-bold">CREAR USUARIO</h3>
        <div class="container-fluid w-100 d-flex mx-1">
            <div class=" ms-2">
                <button type="button" class="btn mt-0 pt-0 crearUsuario" title="Crear Usuario">
                    <i class="bi bi-check-square-fill fs-1 text-success"></i>
                </button>
            </div>
        </div>
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">
                <div class="row  justify-content-center">
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
                            pattern=".+@globex\.com" size="30" >

                        <label for="contraseña">contraseña</label>
                        <input type="password" class="form-control my-1 contraseña">

                    </div>
                    <div class="col-4">
                        <label for="numeroDocumento">Numero Id</label>
                        <input type="text" class="form-control my-1 numeroDocumento">

                        <label for="segundoNombre">Segundo Nombre</label>
                        <input type="text" class="form-control my-1 segundoNombre" >

                        <label for="segundoApellido">Segundo Apellido</label>
                        <input type="text" class="form-control my-1 segundoApellido">

                        <label for="estado">Estado</label>
                        <input type="text" class="form-control my-1" value="Activo" readOnly >

                        <label for="confirmarContraseña">Confirmar contraseña</label>
                        <input type="password" class="form-control my-1 confirmarContraseña" >
                        
                    </div>
                </div>
                <div class="row  justify-content-center ">
                    <h3 class="text-center mt-1 fw-bold">Proveedores Asociados</h3>
                    <div class=" col-8 ">
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
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="proveedoresUsuarios">
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                
                <div class="row  justify-content-center mx-2">
                    <h3 class="text-center mt-1 fw-bold">Permisos Asociados</h3>
                    <div class=" col-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkUsuarios" type="checkbox" >
                            <label class="form-check-label" for="checkUsuarios">Crea, Editar Usuarios</label>
                        </div>
                    </div>
                        
                    <div class=" col-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkActivos" type="checkbox">
                            <label class="form-check-label" for="checkActivos">Crear, Editar Activos</label>
                        </div>                        
                    </div>

                    <div class=" col-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkclasificacion" type="checkbox">
                            <label class="form-check-label" for="checkclasificacion">Cambiar Clasificacion activos</label>
                        </div>                        
                    </div>

                    <div class=" col-2"> 
                            <div class="form-check form-switch">
                            <input class="form-check-input checkSolicitudes" type="checkbox">
                            <label class="form-check-label" for="checkSolicitudes">Editar Solicitudes</label>
                        </div>
                    </div>
                    <div class=" col-2"> 
                        <div class="form-check form-switch">
                            <input class="form-check-input checkReportes" type="checkbox">
                            <label class="form-check-label" for="checkReportes">Crear, editar Reportes</label>
                        </div>
                    </div>
                    <div class=" col-2"> 
                        <div class="form-check form-switch">
                            <input class="form-check-input checkConfguraciones" type="checkbox" id>
                            <label class="form-check-label" for="checkConfguraciones">Crear, editar Configuraciones</label>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                <h3 class="text-center mt-1 fw-bold">Firma Del Usuario</h3>
                    <div class="form-group w-50 mx-auto text-center d-block my-2 contendorInput">
                        <label for="imagenesSoporte" class="labelSeleccionarImagen">Seleccione una Firma</label>
                        <div class=" position-relative" >
                            <input class="opacity-0 position-absolute top-0 start-25 z-2 w-50 inpuImagenFirma" type="file"
                            accept="image/png, image/jpeg, image/jpg" style="box-sizing:content-box">
                            <button type="button"
                                class="btn btn-secondary position-relative fs-6 btn-lg btnimageneFirma">Seleccionar 1 Imagen de la firma del usuario</button>
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

    const listado = ipcRenderer.sendSync('datalist', 'proveedores')
    if (listado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudo consultar el lsitado de proveedores' })

    const nuevoUsuario = seccion.querySelector('.crearUsuario')
    const seleccionarProveedores = seccion.querySelector('.seleccionarProveedores')
    const listProveedores = seccion.querySelector('#listProveedores')
    const listadoTipoId = seccion.querySelector('#listadoTipoId')
    const inpuImagenFirma = seccion.querySelector('.inpuImagenFirma')
    const tipoId = seccion.querySelector('.tipoId')


    nuevoUsuario.onclick = () => guardarUsuario(seccion)
    inpuImagenFirma.onchange = e => cargarImagenFirma(e, seccion)
    
    const idlista = generateRandomId()
    const tipodoc = ['CC','CE','PS','PE']
    const documentos = ['Cedula de Ciudadania',' Cedula de Extranjeria', 'Pasaporte',' Permiso Especial']
    
    listadoTipoId.id = `${listadoTipoId.id}${idlista}`
    tipoId.setAttribute('list', listadoTipoId.id)
    tipodoc.forEach((element,index) => {
        const option = document.createElement('option')
        option.value = element
        option.textContent = documentos[index]
        listadoTipoId.appendChild(option)
    })


    listProveedores.id = `${listProveedores.id}${idlista}`
    seleccionarProveedores.setAttribute('list', listProveedores.id)
    listado.forEach(element => {
        const option = document.createElement('option')
        option.value = (element.razon_social.trim() + '--' + element.nombre_comercial.trim() + '--' + (element.nit == null ? '' : element.nit.trim() == '' ? '' : element.nit.trim()))
        option.textContent = 'Pro-' + element.id
        listProveedores.appendChild(option)
    })

    seleccionarProveedores.onchange = e => cargarProveedor(e, seccion)

    return seccion
}

export {
    crearUsuario,
}
