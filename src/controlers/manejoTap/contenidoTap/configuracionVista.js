import { agregarLinea } from "../../helpers/configuracion/agregarLinea.js";
const configuracionVista = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <h3 class="m-3 fw-bold text-center"> CONFIGURACIONES </h3>
        <div class="container-fluid my-3" id="bodyTapConfig">
            <ul class="nav nav-tabs" id="containerTapConfiguracion" role="tablist">
                <li class="nav-item mx-2 area" role="presentation">
                    <button class="nav-link active" id="area-tab" data-bs-toggle="tab" data-bs-target="#area"
                        type="button" role="tab" aria-controls="area"
                        aria-selected="true">Areas</button>
                </li>
                <li class="nav-item mx-2 marca" role="presentation">
                    <button class="nav-link" id="marca-tab" data-bs-toggle="tab" data-bs-target="#marca"
                        type="button" role="tab" aria-controls="marca"
                        aria-selected="true">Marca</button>
                </li>
                <li class="nav-item  mx-2 tipoActivo" role="presentation">
                    <button class="nav-link" id="tipoActivo-tab" data-bs-toggle="tab"
                        data-bs-target="#tipoActivo" type="button" role="tab" aria-controls="tipoActivo"
                        aria-selected="true">Tipo Activos</button>
                </li>
                <li class="nav-item  mx-2 componentes" role="presentation">
                    <button class="nav-link " id="componentes-tab" data-bs-toggle="tab"
                        data-bs-target="#componentes" type="button" role="tab"
                        aria-controls="componentes" aria-selected="true">Componentes</button>
                </li>
                <li class="nav-item  mx-2 frecuenciaMtto" role="presentation">
                    <button class="nav-link" id="frecuenciaMtto-tab" data-bs-toggle="tab"
                        data-bs-target="#frecuenciaMtto" type="button" role="tab"
                        aria-controls="frecuenciaMtto" aria-selected="true">Frecuencia Mtto</button>
                </li>
                <li class="nav-item  mx-2 procesos" role="presentation">
                    <button class="nav-link " id="procesos-tab" data-bs-toggle="tab"
                        data-bs-target="#procesos" type="button" role="tab" aria-controls="procesos"
                        aria-selected="true">Procesos</button>
                </li>
                <li class="nav-item  mx-2 clasificacionActivos" role="presentation">
                    <button class="nav-link" id="clasificacionActivos-tab" data-bs-toggle="tab"
                        data-bs-target="#clasificacionActivos" type="button" role="tab"
                        aria-controls="clasificacionActivos" aria-selected="true">Clasificacion
                        Activos</button>
                </li>
                <li class="nav-item  mx-2 proveedores" role="presentation">
                    <button class="nav-link" id="proveedores-tab" data-bs-toggle="tab"
                        data-bs-target="#proveedores" type="button" role="tab"
                        aria-controls="proveedores" aria-selected="true">Proveedores</button>
                </li>
            </ul>
            <div class="tab-content" id="TabContentConfig">
                <div class="tab-pane fade show active mt-4" id="area" role="tabpanel"
                    aria-labelledby="area-tab">
                    <h3 class="fw-bold text-center my-2">AREAS</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Areas</label>
                    <input type="text" class="form-control my-3 w-50 buscarAreas">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn nuevaArea" nombre="Area" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped" id="tablaAreas">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">AREA</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5 idArea"
                                            readonly>
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5 nombreArea">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5 estadoArea" list="estadoArea">
                                        <datalist id="estadoArea"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" class="btn mt-0 pt-0 crearUsuario" title="Crear Usuario">
                                            <i class="bi bi-check-square-fill fs-1 text-success"></i>
                                        </button>

                                        <button type="button" class="btn mt-0 pt-0  guardarEdicion" title="Guardar Datos">
                                            <i class="bi bi-save2-fill fs-1 text-warning"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>                        
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="marca" role="tabpanel"
                    aria-labelledby="marca-tab">
                    <h3 class="fw-bold text-center my-2">MARCAS</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Marcas</label>
                    <input type="text" class="form-control my-3 w-50 buscarMarcas">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <table class="table table-borderless table-striped" id="tablaMarca">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">MARCA</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idMarca0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreMarca0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoMarca0" list="estadoMarca0">
                                        <datalist id="estadoMarca0"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" class="btn mt-0 pt-0 crearUsuario" title="Crear Usuario">
                                            <i class="bi bi-check-square-fill fs-1 text-success"></i>
                                        </button>

                                        <button type="button" class="btn mt-0 pt-0  guardarEdicion" title="Guardar Datos">
                                            <i class="bi bi-save2-fill fs-1 text-warning"></i>
                                        </button>
                                    </td>
                                </tr>                                
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn nuevaMarca">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="tipoActivo" role="tabpanel"
                    aria-labelledby="tipoActivo-tab">
                    <h3 class="fw-bold text-center my-2">TIPOS DE ACTIVOS</h3>
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar TipoActivos</label>
                    <input type="text" class="form-control my-3 w-50 buscarTipoActivos">
                        <table class="table table-borderless table-striped" id="tablaTiposActivos">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">TIPO DE ACTIVOS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idTipoActivo0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreMarca0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoMarca0" list="estadoMarca0">
                                        <datalist id="estadoMarca0"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" class="btn mt-0 pt-0 crearUsuario" title="Crear Usuario">
                                            <i class="bi bi-check-square-fill fs-1 text-success"></i>
                                        </button>

                                        <button type="button" class="btn mt-0 pt-0  guardarEdicion" title="Guardar Datos">
                                            <i class="bi bi-save2-fill fs-1 text-warning"></i>
                                        </button>
                                    </td>
                                </tr>                               
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn nuevaTipoActivo">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="componentes" role="tabpanel"
                    aria-labelledby="componentes-tab">
                    <h3 class="fw-bold text-center my-2">COMPONENTES</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Componentes</label>
                    <input type="text" class="form-control my-3 w-50 buscarComponentes">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <table class="table table-borderless table-striped" id="tablaComponentes">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">COMPONENTE</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idComponente0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreComponente0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoComponente0" list="estadoComponente0">
                                        <datalist id="estadoComponente0"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" class="btn mt-0 pt-0 crearUsuario" title="Crear Usuario">
                                            <i class="bi bi-check-square-fill fs-1 text-success"></i>
                                        </button>

                                        <button type="button" class="btn mt-0 pt-0  guardarEdicion" title="Guardar Datos">
                                            <i class="bi bi-save2-fill fs-1 text-warning"></i>
                                        </button>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn nuevaComponente">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="frecuenciaMtto" role="tabpanel"
                    aria-labelledby="frecuenciaMtto-tab">
                    <h3 class="fw-bold text-center my-2">FECUENCIA DE MANTENIMEINTO</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Frecuencia</label>
                    <input type="text" class="form-control my-3 w-50 buscarFrecuencia">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <table class="table table-borderless table-striped" id="tablaFrecuencia">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">FRECUENCIA</th>
                                    <th scope="col">DIAS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idFrecuencia0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreFrecuencia0">
                                    </td>
                                    <td>
                                        <input type="number"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="diasFrecuencia0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoFrecuencia0" list="estadoFrecuencia0">
                                        <datalist id="estadoFrecuencia0"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" class="btn mt-0 pt-0 crearUsuario" title="Crear Usuario">
                                            <i class="bi bi-check-square-fill fs-1 text-success"></i>
                                        </button>

                                        <button type="button" class="btn mt-0 pt-0  guardarEdicion" title="Guardar Datos">
                                            <i class="bi bi-save2-fill fs-1 text-warning"></i>
                                        </button>
                                    </td>
                                </tr>                                
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn nuevaFrecuencia" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="procesos" role="tabpanel"
                    aria-labelledby="procesos-tab">
                    <h3 class="fw-bold text-center my-2">PROCESOS</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Proceso</label>
                    <input type="text" class="form-control my-3 w-50 buscarProceso">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <table class="table table-borderless table-striped" id="tablaProcesos">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">PROCESO</th>
                                    <th scope="col">SIGLAS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idProceso0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreProceso0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="siglaProceso0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoProceso0" list="estadoProceso0">
                                        <datalist id="estadoProceso0"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" class="btn mt-0 pt-0 crearUsuario" title="Crear Usuario">
                                            <i class="bi bi-check-square-fill fs-1 text-success"></i>
                                        </button>

                                        <button type="button" class="btn mt-0 pt-0  guardarEdicion" title="Guardar Datos">
                                            <i class="bi bi-save2-fill fs-1 text-warning"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn nuevaProceso" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="clasificacionActivos" role="tabpanel"
                    aria-labelledby="clasificacionActivos-tab">
                    <h3 class="fw-bold text-center my-2">CLASIFICACION DE ACTIVOS</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Clasificacion</label>
                    <input type="text" class="form-control my-3 w-50 buscarclasificacion">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                            <table class="table table-borderless table-striped"
                            id="tablaClasificacionActivos">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">CLASIFICACION</th>
                                    <th scope="col">SIGLAS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idClasificacionActivos">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreClasificacionActivos1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="siglaClasificacionActivos1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoClasificacionActivos1"
                                            list="estadoClasificacionActivos1">
                                        <datalist id="estadoClasificacionActivos1"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" class="btn mt-0 pt-0 crearUsuario" title="Crear Usuario">
                                            <i class="bi bi-check-square-fill fs-1 text-success"></i>
                                        </button>

                                        <button type="button" class="btn mt-0 pt-0  guardarEdicion" title="Guardar Datos">
                                            <i class="bi bi-save2-fill fs-1 text-warning"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn nuevaClasificacionActivos" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>  
                </div>             
                <div class="tab-pane fade show mt-4" id="proveedores" role="tabpanel"
                    aria-labelledby="proveedores-tab">
                    <h3 class="fw-bold text-center my-2">PROVEEDORES</h3>
                    <div class="container-fluid m-0 p-0 mb-4 ">
                        <label for="estadoProveedor" class="fw-bold">Buscar Proveedor</label>
                        <input type="text" class="form-control my-3 w-50 buscarProveedor"list="listbuscarProveedor">
                        <datalist id="listbuscarProveedor"></datalist>
                        <div class="row">
                            <div class="col-1">
                                <label for="idProveedor" class="fw-bold">ID</label>
                                <input type="text" class="form-control my-1" id="idProveedor">
                            </div>
                            <div class="col-2">
                                <label for="nitProveedor" class=" fs-6 fw-bold">Nit</label>
                                <input type="text" class="form-control my-1" id="nitProveedor">
                            </div>
                            <div class="col-1">
                                <label for="dvProveedor" class=" fs-6 fw-bold">Dv</label>
                                <input type="text" class="form-control my-1" id="dvProveedor">
                            </div>
                            <div class="col-8">
                                <label for="razonProveedor" class=" fs-6 fw-bold">Razon Social</label>
                                <input type="text" class="form-control my-1" id="razonProveedor">
                            </div>
                            <div class="col-8">
                                <label for="nombreProveedor" class=" fs-6 fw-bold">Nombre comercial</label>
                                <input type="text" class="form-control my-1" id="nombreProveedor">
                            </div>
                            <div class="col-4">
                                <label for="contactoProveedor" class=" fs-6 fw-bold">Contacto</label>
                                <input type="text" class="form-control my-1" id="contactoProveedor">
                            </div>
                            <div class="col-4">
                                <label for="telefonoProveedor" class=" fs-6 fw-bold">Telefono</label>
                                <input type="text" class="form-control my-1" id="contactoProveedor">
                            </div>
                            <div class="col-4">
                                <label for="direccionProveedor" class=" fs-6 fw-bold">Direccion</label>
                                <input type="text" class="form-control my-1" id="telefonoProveedor">
                            </div>
                            <div class="col-2">
                                <label for="estadoProveedor" class="fw-bold">Estado</label>
                                <input type="text" class="form-control my-1" id="direccionProveedor">
                                <datalist id="estadoClasificacionActivos1"></datalist>
                            </div>

                            <div class="col-2">
                                <div class=" ms-2 d-inline">
                                    <button type="button" class="btn mt-0 pt-0 d-none crearUsuario" title="Crear Usuario">
                                        <i class="bi bi-check-square-fill fs-1 text-success"></i>
                                    </button>
                                </div>

                                <div class=" ms-2 d-inline">
                                    <button type="button" class="btn mt-0 pt-0 d-none  guardarEdicion" title="Guardar Datos">
                                        <i class="bi bi-save2-fill fs-1 text-warning"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="p-1 mt-3">
                            <button type="button" class="btn nuevoProvedor">
                                <i class="bi bi-plus-square-fill fs-3"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    const nuevaArea = seccion.querySelector('.nuevaArea')
    const nuevaMarca = seccion.querySelector('.nuevaMarca')
    const nuevaTipoActivo = seccion.querySelector('.nuevaTipoActivo')
    const nuevaComponente = seccion.querySelector('.nuevaComponente')
    const nuevaFrecuencia = seccion.querySelector('.nuevaFrecuencia')
    const nuevaProceso = seccion.querySelector('.nuevaProceso')
    const nuevaClasificacionActivos = seccion.querySelector('.nuevaClasificacionActivos')
    const nuevoProvedor = seccion.querySelector('.nuevoProvedor')

    nuevaArea.onclick = e => {
        e.preventDefault()
        const boton = agregarLinea(e)
        
    }

    return seccion
}

export {
    configuracionVista,
}
