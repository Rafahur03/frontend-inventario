const { ipcRenderer } = require('electron')
import { modalMensaje } from "../../helpers/modalEleccion.js";
import { agregarLinea, habilitarNuevoProveedor } from "../../helpers/configuracion/agregarLinea.js";
import { generateRandomId } from "../../helpers/nombreRandon.js";
import { opcionId } from "../../helpers/activos/listasId.js";
import { filtroBusquedaTablas, filtroBusquedaProveedor } from "../../helpers/filtroBusqueda.js"
import {
    guardarArea,
    guardarMarca,
    guardarTiposActivo,
    guardaComponente,
    guardarFrecuencia,
    guardaProceso,
    guardarclasificacionAcivo,
    guardarProveedor,
    guardarInsumo,
    guardarBodega
} from "../../tablasConfig/guardarConfig.js";
import {
    editarArea,
    editarMarca,
    editarTiposActivo,
    editarComponente,
    editarFrecuencia,
    editarProceso,
    editarclasificacionAcivo,
    editarInsumo, 
    editarBodega
} from "../../tablasConfig/editarConfig.js";
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

                <li class="nav-item  mx-2 insumos" role="presentation">
                <button class="nav-link" id="insumos-tab" data-bs-toggle="tab"
                    data-bs-target="#insumos" type="button" role="tab"
                    aria-controls="insumos" aria-selected="true">Insumos</button>
                </li>

                <li class="nav-item  mx-2 bodegas" role="presentation">
                <button class="nav-link" id="bodegas-tab" data-bs-toggle="tab"
                    data-bs-target="#bodegas" type="button" role="tab"
                    aria-controls="bodegas" aria-selected="true">Bodegas</button>
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
                    <input type="text" class="form-control my-3 w-50 buscarAreas" tabla="tablaAreas">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevaArea" nombre="Area" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">AREA</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tablaAreas">                                
                            </tbody>
                        </table>                        
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="marca" role="tabpanel"
                    aria-labelledby="marca-tab">
                    <h3 class="fw-bold text-center my-2">MARCAS</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Marcas</label>
                    <input type="text" class="form-control my-3 w-50 buscarMarcas" tabla ="tablaMarca">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevaMarca" nombre="Marca" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">MARCA</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody  id="tablaMarca">           
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="tipoActivo" role="tabpanel"
                    aria-labelledby="tipoActivo-tab">
                    <h3 class="fw-bold text-center my-2">TIPOS DE ACTIVOS</h3>
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar TipoActivos</label>
                    <input type="text" class="form-control my-3 w-50 buscarTipoActivos" tabla = "tablaTiposActivos">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevaTipoActivo" nombre="Tipo Activo" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">TIPO DE ACTIVOS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody  id="tablaTiposActivos">              
                            </tbody>
                        </table>                        
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="componentes" role="tabpanel"
                    aria-labelledby="componentes-tab">
                    <h3 class="fw-bold text-center my-2">COMPONENTES</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Componentes</label>
                    <input type="text" class="form-control my-3 w-50 buscarComponentes" tabla = "tablaComponentes">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevaComponente" nombre="Componente" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">COMPONENTE</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tablaComponentes">
                            </tbody>
                        </table>                       
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="frecuenciaMtto" role="tabpanel"
                    aria-labelledby="frecuenciaMtto-tab">
                    <h3 class="fw-bold text-center my-2">FECUENCIA DE MANTENIMEINTO</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Frecuencia</label>
                    <input type="text" class="form-control my-3 w-50 buscarFrecuencia" tabla = "tablaFrecuencia">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevaFrecuencia" nombre="Frecuencia" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">FRECUENCIA</th>
                                    <th scope="col">DIAS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tablaFrecuencia">                  
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="procesos" role="tabpanel"
                    aria-labelledby="procesos-tab">
                    <h3 class="fw-bold text-center my-2">PROCESOS</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Proceso</label>
                    <input type="text" class="form-control my-3 w-50 buscarProceso" tabla = "tablaProcesos">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevaProceso" nombre="Proceso" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">PROCESO</th>
                                    <th scope="col">SIGLAS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tablaProcesos">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade show mt-4" id="clasificacionActivos" role="tabpanel"
                    aria-labelledby="clasificacionActivos-tab">
                    <h3 class="fw-bold text-center my-2">CLASIFICACION DE ACTIVOS</h3>
                    <label for="estadoProveedor" class="fw-bold text-center ">Buscar Clasificacion</label>
                    <input type="text" class="form-control my-3 w-50 buscarclasificacion" tabla ="tablaClasificacionActivos">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevaClasificacionActivo" nombre="Clasificacion Activo" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">CLASIFICACION</th>
                                    <th scope="col">SIGLAS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tablaClasificacionActivos">
                            </tbody>
                        </table>                        
                    </div>  
                </div>
                <div class="tab-pane fade mt-4"id="insumos" role="tabpanel"
                    aria-labelledby="insumostab">
                    <h3 class="fw-bold text-center my-2">INSUMOS</h3>
                    <label for="estadoInsumos" class="fw-bold text-center ">Buscar insumos</label>
                    <input type="text" class="form-control my-3 w-50 buscarInsumos" tabla="tablaInsumos">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevoinsumos" nombre="insumos" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">INSUMOS</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tablaInsumos">                                
                            </tbody>
                        </table>                        
                    </div>
                </div>
                <div class="tab-pane fade mt-4"id="bodegas" role="tabpanel"
                    aria-labelledby="bodegas-tab">
                    <h3 class="fw-bold text-center my-2">Bodegas</h3>
                    <label for="estadoBodegas" class="fw-bold text-center ">Buscar Bodega</label>
                    <input type="text" class="form-control my-3 w-50 buscarBodegas" tabla="tablaBodegas">
                    <div class="container-fluid table-responsive m-0 p-0 mb-4 ">
                        <div class="p-1  d-flex flex-row-reverse">
                            <button type="button" class="btn d-none nuevoBodegas" nombre="Bodegas" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <table class="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">BODEGA</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tablaBodegas">                                
                            </tbody>
                        </table>                        
                    </div>
                </div>           
                <div class="tab-pane fade show mt-4" id="proveedores" role="tabpanel"
                    aria-labelledby="proveedores-tab">
                    <h3 class="fw-bold text-center my-2">PROVEEDORES</h3>
                    <div class="container-fluid m-0 p-0 mb-4 ">
                        <label for="estadoProveedor" class="fw-bold">Buscar Proveedor</label>
                        <input type="text" class="form-control my-3 buscarProveedor"list="listbuscarProveedor">
                        <datalist id="listbuscarProveedor"></datalist>
                        <div class="p-1 d-flex flex-row-reverse">
                            <button type="button" class="btn  d-none nuevaProveedor" nombre="Proveedor" >
                                <i class="bi bi-plus-square-fill fs-2"></i>
                            </button>
                        </div>
                        <div class="row" id="datosProveedor">
                            <div class="col-1">
                                <label for="idProveedor" class="fw-bold">ID</label>
                                <input type="text" class="form-control my-1 idProveedor" readOnly>
                            </div>
                            <div class="col-2">
                                <label for="nitProveedor" class=" fs-6 fw-bold">Nit</label>
                                <input type="text" class="form-control my-1 nitProveedor" readOnly>
                            </div>
                            <div class="col-1">
                                <label for="dvProveedor" class=" fs-6 fw-bold">Dv</label>
                                <input type="text" class="form-control my-1 dvProveedor" readOnly>
                            </div>
                            <div class="col-4">
                                <label for="razonProveedor" class=" fs-6 fw-bold">Razon Social</label>
                                <input type="text" class="form-control my-1 razonProveedor" readOnly >
                            </div>
                            <div class="col-4">
                                <label for="nombreProveedor" class=" fs-6 fw-bold">Nombre comercial</label>
                                <input type="text" class="form-control my-1 nombreProveedor" readOnly>
                            </div>
                            <div class="col-3">
                                <label for="contactoProveedor" class=" fs-6 fw-bold">Contacto</label>
                                <input type="text" class="form-control my-1 contactoProveedor" readOnly>
                            </div>
                            <div class="col-3">
                                <label for="telefonoProveedor" class=" fs-6 fw-bold">Telefono</label>
                                <input type="text" class="form-control my-1 telefonosProveedor" readOnly>
                            </div>
                            <div class="col-4">
                                <label for="direccionProveedor" class=" fs-6 fw-bold">Direccion</label>
                                <input type="text" class="form-control my-1 direccionProveedor" readOnly>
                            </div>
                            <div class="col-2">
                                <label for="estadoProveedor" class="fw-bold">Estado</label>
                                <input type="text" class="form-control my-1 estadoProveedor" list="listEstadoProveedor" readOnly>
                                <datalist id="listEstadoProveedor"></datalist>
                            </div>

                            <div class="col-8">
                                <label for="descripcionProveedor" class="fw-bold">Descripcion</label>
                                <textarea type="text" class="form-control my-1 descripcionProveedor" rows ="3" readOnly></textarea>                            
                            </div>
                        </div>                         
                    </div>
                </div>
            </div>
        </div>
    `
    const listados = ipcRenderer.sendSync('consultarTablasCofig')
    if (listados.msg) return modalMensaje({ titulo: 'ERROR', mensaje: listados.msg })
   
    const tbodyArea = seccion.querySelector('#tablaAreas')
    listados.areas.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idArea')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Ar-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombreArea')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadoArea')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Area'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarArea(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodyArea.appendChild(tr)
    })
    const areaFiltro = seccion.querySelector('.buscarAreas')
    areaFiltro.oninput = e => { filtroBusquedaTablas(e) }

    const tbodymarcas = seccion.querySelector('#tablaMarca')
    listados.marcas.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idMarca')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Ma-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombreMarca')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadoMarca')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Marca'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarMarca(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodymarcas.appendChild(tr)
    })

    const marcaFiltro = seccion.querySelector('.buscarMarcas')
    marcaFiltro.oninput = e => { filtroBusquedaTablas(e) }


    const tbodyTiposActivos = seccion.querySelector('#tablaTiposActivos')
    listados.tipoActivos.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idTipoActivo')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Ta-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombretipoActivo')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadotipoActivo')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Tipo Activo'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarTiposActivo(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodyTiposActivos.appendChild(tr)
    })

    const tipoActivosFiltro = seccion.querySelector('.buscarTipoActivos')
    tipoActivosFiltro.oninput = e => { filtroBusquedaTablas(e) }

    const tbodyComponente = seccion.querySelector('#tablaComponentes')
    listados.componentes.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idComponente')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Com-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombreComponente')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadoComponente')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Componente'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarComponente(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodyComponente.appendChild(tr)
    })

    const componentesFiltro = seccion.querySelector('.buscarComponentes')
    componentesFiltro.oninput = e => { filtroBusquedaTablas(e) }

    const tbodyFrecuencia = seccion.querySelector('#tablaFrecuencia')
    listados.frecuencia.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idFrecuencia')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Fre-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombreFrecuencia')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdDias = document.createElement('td')
        const inputDias = document.createElement('input')
        inputDias.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'diasFrecuencia')
        inputDias.type = 'text'
        inputDias.readOnly = true
        inputDias.value = element.dias
        tdDias.appendChild(inputDias)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadoFrecuencia')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdDias)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            inputDias.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Frecuencia'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarFrecuencia(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodyFrecuencia.appendChild(tr)
    })

    const frecuenciaFiltro = seccion.querySelector('.buscarFrecuencia')
    frecuenciaFiltro.oninput = e => { filtroBusquedaTablas(e) }

    const tbodyproceso = seccion.querySelector('#tablaProcesos')
    listados.procesos.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idProceso')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Proc-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombreProceso')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdSigla = document.createElement('td')
        const inputSigla = document.createElement('input')
        inputSigla.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'siglasProceso')
        inputSigla.type = 'text'
        inputSigla.readOnly = true
        inputSigla.value = element.sigla
        tdSigla.appendChild(inputSigla)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadoProceso')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdSigla)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            inputSigla.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Proceso'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarProceso(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodyproceso.appendChild(tr)
    })

    const procesoFiltro = seccion.querySelector('.buscarProceso')
    procesoFiltro.oninput = e => { filtroBusquedaTablas(e) }

    const tbodyClasificacionActivos = seccion.querySelector('#tablaClasificacionActivos')
    listados.clasificacionActivos.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idClasificacionActivo')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Cla-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombreClasificacionActivo')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdSigla = document.createElement('td')
        const inputSigla = document.createElement('input')
        inputSigla.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'siglasClasificacion')
        inputSigla.type = 'text'
        inputSigla.readOnly = true
        inputSigla.value = element.sigla
        tdSigla.appendChild(inputSigla)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadoClasificacionActivo')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdSigla)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            inputSigla.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Clasificacion Activo'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarclasificacionAcivo(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodyClasificacionActivos.appendChild(tr)
    })
    ////////////////////////////////////////////////////
    const tbodyinsumos = seccion.querySelector('#tablaInsumos')
    listados.insumos.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idInsumo')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Ins-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombreInsumo')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadoInsumo')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Insumo'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarInsumo(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodyinsumos.appendChild(tr)
    })
    const insumosFiltro = seccion.querySelector('.buscarInsumos')
    insumosFiltro.oninput = e => { filtroBusquedaTablas(e) }

    ////////////   
    const tbodyBodega = seccion.querySelector('#tablaBodegas')
    listados.bodegas.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const inputId = document.createElement('input')
        inputId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idBodegas')
        inputId.type = 'text'
        inputId.readOnly = true
        inputId.value = 'Bo-' + element.id
        tdId.appendChild(inputId)
        const tdNombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombreBodegas')
        inputNombre.type = 'text'
        inputNombre.readOnly = true
        inputNombre.value = element.nombre
        tdNombre.appendChild(inputNombre)
        const tdEstado = document.createElement('td')
        const inputEstado = document.createElement('input')
        inputEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estadoBodegas')
        inputEstado.readOnly = true
        inputEstado.type = 'text'
        inputEstado.value = element.estado
        tdEstado.appendChild(inputEstado)

        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdEstado)


        if (listados.editar) {
            const ramndonId = generateRandomId()
            const datalistEstado = document.createElement('datalist')
            datalistEstado.id = ramndonId
            inputEstado.setAttribute('List', ramndonId)
            inputEstado.readOnly = false
            inputEstado.setAttribute('opcionId', element.estadoId)
            inputEstado.onblur = e => opcionId(e)
            inputNombre.readOnly = false
            tdEstado.appendChild(datalistEstado)
            listados.estado.forEach(item => {
                const option = document.createElement('option')
                option.value = item.estado
                option.textContent = item.id
                datalistEstado.appendChild(option)
            })
            const idTr = generateRandomId()
            const tdBotones = document.createElement('td')
            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('d-flex', 'justify-content-center')
            const botonEditar = document.createElement('button')
            botonEditar.classList.add('btn', 'mt-0', 'pt-0')
            botonEditar.type = 'button'
            botonEditar.title = 'Editar Bodega'
            const iCrear = document.createElement('i')
            iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
            botonEditar.appendChild(iCrear)
            botonEditar.onclick = e => { editarBodega(e) }
            contenedorBotones.appendChild(botonEditar)
            tdBotones.appendChild(contenedorBotones)
            tr.appendChild(tdBotones)
            tr.id = idTr
            botonEditar.setAttribute("idTr", idTr)
        }

        tbodyBodega.appendChild(tr)
    })
    const bodegaFiltro = seccion.querySelector('.buscarBodegas')
    bodegaFiltro.oninput = e => { filtroBusquedaTablas(e) }

    ////////////////////////////////

    const clasificacionFiltro = seccion.querySelector('.buscarclasificacion')
    clasificacionFiltro.oninput = e => { filtroBusquedaTablas(e) }

    const dataListaProveedor = seccion.querySelector('#listbuscarProveedor')
    listados.proveedores.forEach(element => {
        const option = document.createElement('option')
        option.value = element.nombre
        option.textContent = element.id
        dataListaProveedor.appendChild(option)
    })

    const listEstadoProveedor = seccion.querySelector('#listEstadoProveedor')
    listados.estado.forEach(item => {
        const option = document.createElement('option')
        option.value = item.estado
        option.textContent = item.id
        listEstadoProveedor.appendChild(option)
    })

    const proveedoreFiltro = seccion.querySelector('.buscarProveedor')
    proveedoreFiltro.oninput = e => { filtroBusquedaProveedor(e) }

    const nuevaArea = seccion.querySelector('.nuevaArea')
    const nuevaMarca = seccion.querySelector('.nuevaMarca')
    const nuevaTipoActivo = seccion.querySelector('.nuevaTipoActivo')
    const nuevaComponente = seccion.querySelector('.nuevaComponente')
    const nuevaFrecuencia = seccion.querySelector('.nuevaFrecuencia')
    const nuevaProceso = seccion.querySelector('.nuevaProceso')
    const nuevaClasificacionActivos = seccion.querySelector('.nuevaClasificacionActivo')
    const nuevoProveedor = seccion.querySelector('.nuevaProveedor')
    const nuevoinsumos = seccion.querySelector('.nuevoinsumos')
    const nuevoBodegas = seccion.querySelector('.nuevoBodegas')

    if (listados.editar) {
        nuevaArea.classList.remove('d-none')
        nuevaMarca.classList.remove('d-none')
        nuevaTipoActivo.classList.remove('d-none')
        nuevaComponente.classList.remove('d-none')
        nuevaFrecuencia.classList.remove('d-none')
        nuevaProceso.classList.remove('d-none')
        nuevaClasificacionActivos.classList.remove('d-none')
        nuevoProveedor.classList.remove('d-none')
        nuevoBodegas.classList.remove('d-none')

        nuevaArea.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardarArea(e) }
        }


        nuevaMarca.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardarMarca(e) }
        }

        nuevaTipoActivo.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardarTiposActivo(e) }
        }

        nuevaComponente.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardaComponente(e) }
        }

        nuevaFrecuencia.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardarFrecuencia(e) }
        }

        nuevaProceso.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardaProceso(e) }
        }

        nuevaClasificacionActivos.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardarclasificacionAcivo(e) }
        }

        nuevoProveedor.onclick = e => {
            e.preventDefault()
            const boton = habilitarNuevoProveedor(e)
            boton.onclick = e => { guardarProveedor(e) }
        }
        
        nuevoinsumos.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardarInsumo(e) }
        }

        nuevoBodegas.onclick = e => {
            e.preventDefault()
            const boton = agregarLinea(e)
            boton.onclick = e => { guardarBodega(e) }
        }

    }


    return seccion
}

export {
    configuracionVista,
}
