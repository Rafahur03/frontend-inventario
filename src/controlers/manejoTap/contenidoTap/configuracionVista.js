const configuracionVista = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <div class="container-fluid my-3" id="bodyTapConfig">
            <ul class="nav nav-tabs" id="containerTapConfiguracion" role="tablist">
                <li class="nav-item mx-2 area" role="presentation">
                    <button class="nav-link" id="area-tab" data-bs-toggle="tab" data-bs-target="#area"
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
                    <button class="nav-link active" id="proveedores-tab" data-bs-toggle="tab"
                        data-bs-target="#proveedores" type="button" role="tab"
                        aria-controls="proveedores" aria-selected="true">Proveedores</button>
                </li>
            </ul>
            <div class="tab-content" id="TabContentConfig">
                <div class="tab-pane fade show mt-4" id="area" role="tabpanel"
                    aria-labelledby="area-tab">
                    <h3 class="fw-bold text-center my-2">AREAS</h3>
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
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
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idArea0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreArea0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoArea0" list="estadoArea0">
                                        <datalist id="estadoArea0"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idArea1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreArea1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoArea1" list="estadoArea1">
                                        <datalist id="estadoArea1"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn" id="nuevaArea">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="marca" role="tabpanel"
                    aria-labelledby="marca-tab">
                    <h3 class="fw-bold text-center my-2">MARCAS</h3>
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
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idMarca1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreMarca1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoMarca1" list="estadoMarca1">
                                        <datalist id="estadoMarca1"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn" id="nuevaMarca">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="tipoActivo" role="tabpanel"
                    aria-labelledby="tipoActivo-tab">
                    <h3 class="fw-bold text-center my-2">TIPOS DE ACTIVOS</h3>
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
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
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idMarca1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreMarca1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoMarca1" list="estadoMarca1">
                                        <datalist id="ipoActivo"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn" id="nuevaTipoActivo">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="componentes" role="tabpanel"
                    aria-labelledby="componentes-tab">
                    <h3 class="fw-bold text-center my-2">COMPONENTES</h3>
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <table class="table table-borderless table-striped" id="tablaTiposActivos">
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
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idComponente1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreComponente1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoComponente1" list="estadoComponente1">
                                        <datalist id="ipoActivo"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn" id="nuevaComponente">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="frecuenciaMtto" role="tabpanel"
                    aria-labelledby="frecuenciaMtto-tab">
                    <h3 class="fw-bold text-center my-2">FECUENCIA DE MANTENIMEINTO</h3>
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
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idFrecuencia">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreFrecuencia1">
                                    </td>
                                    <td>
                                        <input type="number"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="diasFrecuencia0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoFrecuencia1" list="estadoFrecuencia1">
                                        <datalist id="estadoFrecuencia1"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn" id="nuevaFrecuencia">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="procesos" role="tabpanel"
                    aria-labelledby="procesos-tab">
                    <h3 class="fw-bold text-center my-2">PROCESOS</h3>
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
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            readonly id="idProceso">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreProceso1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="siglaProceso1">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoProceso1" list="estadoProceso1">
                                        <datalist id="estadoProceso1"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn" id="nuevaProceso">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="clasificacionActivos" role="tabpanel"
                    aria-labelledby="clasificacionActivos-tab">
                    <h3 class="fw-bold text-center my-2">CLASIFICACION DE ACTIVOS</h3>
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
                                            readonly id="idClasificacionActivos0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="nombreClasificacionActivos0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="siglaClasificacionActivos0">
                                    </td>
                                    <td>
                                        <input type="text"
                                            class="border border-secondary bg-light border-l border-opacity-25 rounded-3 fs-5"
                                            id="estadoClasificacionActivos0"
                                            list="estadoClasificacionActivos0">
                                        <datalist id="estadoClasificacionActivos0"></datalist>

                                    </td>
                                    <td>
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
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
                                        <button type="button" id="guardar" class="btn">
                                            <i class="bi bi-save2-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="editar" class="btn">
                                            <i class="bi bi-file-check-fill fs-5"></i>
                                        </button>

                                        <button type="button" id="eliminar" class="btn">
                                            <i class="bi bi-trash-fill fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-1">
                            <button type="button" class="btn" id="nuevaClasificacionActivos">
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4 active" id="proveedores" role="tabpanel"
                    aria-labelledby="proveedores-tab">
                    <h3 class="fw-bold text-center my-2">PROVEEDORES</h3>
                    <div class="container-fluid m-0 p-0 mb-4 ">
                        <div class="row">
                            <div class="col-1">
                                <label for="idProveedor" class="fw-bold">ID</label>
                            </div>
                            <div class="col-2">
                                <label for="nitProveedor" class=" fs-6 fw-bold">Nit</label>
                            </div>
                            <div class="col-1">
                                <label for="dvProveedor" class=" fs-6 fw-bold">Dv</label>
                            </div>
                            <div class="col-2">
                                <label for="razonProveedor" class=" fs-6 fw-bold">Razon Social</label>
                            </div>
                            <div class="col-2">
                                <label for="nombreProveedor" class=" fs-6 fw-bold">Nombre
                                    comercial</label>
                            </div>
                            <div class="col-1">
                                <label for="contactoProveedor" class=" fs-6 fw-bold">Contacto</label>
                            </div>
                            <div class="col-1">
                                <label for="telefonoProveedor" class=" fs-6 fw-bold">Telefono</label>
                            </div>
                            <div class="col-1">
                                <label for="direccionProveedor" class=" fs-6 fw-bold">Direccion</label>
                            </div>
                            <div class="col-1">
                                <label for="estadoProveedor" class="fw-bold">Estado</label>
                            </div>
                        </div>
                        <div class="row" id:"">
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="idProveedor">
                            </div>
                            <div class="col-2">
                                <input type="text" class="form-control my-1" id="nitProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="dvProveedor">
                            </div>
                            <div class="col-2">
                                <input type="text" class="form-control my-1" id="razonProveedor">
                            </div>
                            <div class="col-2">
                                <input type="text" class="form-control my-1" id="nombreProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="contactoProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="telefonoProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="direccionProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="estadoProveedor"
                                    list="listaEstadoProveedor">
                                <datalist id="listaEstadoProveedor"></datalist>
                            </div>
                        </div>
                        <div class="row" id:"">
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="idProveedor">
                            </div>
                            <div class="col-2">
                                <input type="text" class="form-control my-1" id="nitProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="dvProveedor">
                            </div>
                            <div class="col-2">
                                <input type="text" class="form-control my-1" id="razonProveedor">
                            </div>
                            <div class="col-2">
                                <input type="text" class="form-control my-1" id="nombreProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="contactoProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="telefonoProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="direccionProveedor">
                            </div>
                            <div class="col-1">
                                <input type="text" class="form-control my-1" id="estadoProveedor"
                                    list="listaEstadoProveedor">
                                <datalist id="listaEstadoProveedor"></datalist>
                            </div>
                        </div>
                    </div>
                    <div class="p-1">
                        <button type="button" class="btn" id="nuevaClasificacionActivos">
                            <i class="bi bi-plus-square-fill fs-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `

    return seccion
}

export {
   configuracionVista,
}
