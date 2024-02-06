const { ipcRenderer } = require('electron')
import { nuevaImagenInsumo } from "../../helpers/insumos/nuevaImagenInsumo.js";
import { generateRandomId } from "../../helpers/nombreRandon.js";
import { opcionId } from "../../helpers/activos/listasId.js";
import { modalMensaje } from "../../helpers/modalEleccion.js";
import { EliminarImagenInsumo } from "../../insumos/EliminarImagenInsumo.js";
import { salidaInsumo } from "../../insumos/salidaInsumo.js";
import { entradaInsumo } from "../../insumos/entradaInsumo.js";
import { arqueoInsumo } from "../../insumos/arqueoInsumo.js";
import { actualizarInsumoBodega } from "../../insumos/actalizarInsumo.js";
import { cargarDocumentoInsumo } from "../../helpers/insumos/cargarDocumentoInsumo.js";


const movimientoInsumoBodega = (id) => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = ` 
        <h2 class="text-center my-2 fw-bold border-bottom">MOVIMEINTO DE INSUMOS EN BODEGA</h2>
        <h3 class="text-center my-1">Movimientos De Insumo</h3>
        <div class="container-fluid w-100 border border-1 border-dark m-2 dataActivo">
            <div class="container-fluid me-5 w-100 d-flex ">
                 <div class=" ms-2">
                    <button type="button" class="btn mt-0 pt-0 d-none guardarEdicion" title="Guardar Datos">
                        <i class="bi bi-save2-fill fs-1 text-warning"></i>
                    </button>
                </div>
            </div>
            <form class="w-100">
                <div class="row mx-1 align-items-center">
                    <div class="form-group col-4">
                        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner"></div>
                            <button class="carousel-control-prev" type="button" title="Previo"
                                data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" title="Siguiente"
                                data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div class="d-flex flex-column d-none align-items-center justify-content-center mt-3 contendorInputImagenesinsumo">
                            <div class="contendorInput position-relative">
                                <button type="button title="Selecione una Imagen"
                                    class="btn btn-secondary fs-6 btn-lg h-25 buttonImagenesInsumo">Selecione una Imagen</button>
                                <input class="opacity-0 w-100 position-absolute top-0 start-0 inputImagenesInsumo"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style="box-sizing:content-box"
                                    >
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-3">
                        <label for="insumo" class="fw-bold">Insumo<span class="m-0 p-0 text-danger"> *</span></label>
                        <input type="select" class="form-control my-1  fw-bold insumo" readOnly>

                        <label class="fw-bold" for="modeloInsumo">Modelo <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 modeloInsumo" readOnly>

                        <label class="fw-bold" for="areaActivo">Area <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 areaInsumo" list="listaAreas" opcionId="Ar--0" readOnly>
                        <datalist id="listaAreas"></datalist>

                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="marcaActivo">Marca <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 marcaInsumo" list="listMarcas" opcionId="Ma--0" readOnly>
                        <datalist id="listMarcas"></datalist>

                        <label class="fw-bold" for="serieActivo">Serie <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 serieInsumo" readOnly>

                        <label class="fw-bold" for="ubicacionActivo">Cantidad Actual<span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 CantidadActualInsumo" readOnly>
                  
                    </div>
                    <div class="form-group col-3">
                        <label class="fw-bold" for="facturaActivo">N. Factura <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 facturaInsumo" readOnly>

                        <label class="fw-bold" for="valorActivo">Costo Unitario <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 costoInsumo" readOnly>

                        <label class="fw-bold" for="fechaCompra">Fecha Compra <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="date" class="form-control my-1 fechaCompraInsumo" readOnly>
                                       
                    </div>
                    <div class="form-group col-8">
                        <label class="fw-bold" for="proveedorActivo">Provedor <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 proveedorInsumo"
                            list="listaProveedores"  opcionId="Pro--0" readOnly>
                        <datalist id="listaProveedores"></datalist>
                    </div>

                    <div class="form-group col-4">
                        <label class="fw-bold" for="ubicacionActivo">Cantidad A Mover<span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="number" class="form-control my-1 cantidadMover">
                    </div>
                    <div class="form-group col-12">
                        <label class="fw-bold" for="recomendaciones">Observacion Del Movimiento <span class="m-0 p-0 text-danger"> *</span></label>
                        <p class="m-0" id="caracteresRecomendacion">Maximo 250 caracteres</p>
                        <textarea class="form-control m-1 ObservacionesInsumo" id=""
                            rows="2" maxlength="500"></textarea>
                    </div>
                </div>
                <div class="container-fluid me-5 w-100 d-flex justify-content-between">
                    <div class=" ms-2 text-center">
                        <button type="button" class="btn m-0 p-0 Ingreso" title="Ingreso">
                            <i class="bi bi-save2-fill display-4 text-success"></i>
                        </button>
                        <span class="fw-bold d-block fs-4 text-success m-0 p-0">Ingreso</span>
                    </div>

                    <div class="">
                        <button type="button" class="btn  mt-0 pt-0 Arqueo" title="Arqueo">
                            <i class="bi bi-file-check-fill display-4 text-warning"></i>                    
                        </button>
                        <span class="fw-bold d-block fs-4 text-warning m-0 p-0">Arqueo</span>
                    </div>
               
                    <div class="">
                        <button type="button" class="btn  mt-0 pt-0 Salida" title="Salida">
                            <i class="bi bi-sign-turn-right-fill display-4 text-danger"></i>                    
                        </button>
                        <span class="fw-bold d-block fs-4 text-danger m-0 p-0">Salida</span>
                    </div>
                </div> 
            </form>
        </div>
        <div class="container-fluid w-100 m-0 p-0 my-3 Historial de Movimientos">
            <h2 class="text-center fw-bold">Historial de Movimientos</h2>
            <div class="p-1 d-flex flex-row-reverse">
                <div>
                    <button type="button" class="btn exportarHistorialMovimientoExcel" title="Exportar Historial Excel">
                        <i class="bi bi-printer-fill fs-2 text-primary"></i>
                    </button>
                </div>
                <div>
                    <button type="button" class="btn exportarHistorialMovimientopdf " title="Exportar Histroial PDF">
                        <i class="bi bi-file-earmark-spreadsheet-fill fs-2 text-success"></i>
                    </button>
                </div>
            </div>
            <table class="table W-100 table-striped table-hover table-sm table-responsive">
                <thead>
                    <tr class="text-uppercase text-center">
                        <th scope="col">Id</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Movimiento</th>
                        <th scope="col">Observacion</th>
                    </tr>
                </thead>
                <tbody class ="tbody-histroial">
                </tbody>
            </table>
        </div> 

        <div class="container-fluid w-100 m-0 p-0 my-3 containerDocumentacion">
            <h3 class="fw-bold text-center my-2">FACTURA</h3>
                <div class="form-group w-50 mx-auto text-center d-block my-2">            
                    <div class="contendorInputpdf d-none position-relative">
                        <input
                            class="opacity-0 position-absolute top-0 start-25 z-2 w-50 inputPdfSoporte"
                            type="file" accept="application/pdf">
                        <button type="button"
                            class="btn btn-secondary position-relative fs-6 btn-lg pdfSoporte">Seleccione
                            Un archivo en PDF</button>
                    </div>
                </div>
                <div class="d-block">
                    <div class="contendorpdFactura"></div>
                </div>               
            
        </div>
    `

    const data = ipcRenderer.sendSync('consultarUnInsumo', id)
    if (data.msg) {
        modalMensaje({ titulo: 'ERROR', mensaje: data.msg })
    } else {
        const insumo = data.insumo
        console.log(insumo)
        const nombreInsumo = seccion.querySelector('.insumo')
        nombreInsumo.setAttribute('insumo', insumo.id)
        const modeloInsumo = seccion.querySelector('.modeloInsumo')
        const areaInsumo = seccion.querySelector('.areaInsumo')
        const marcaInsumo = seccion.querySelector('.marcaInsumo')
        const sereiInsumo = seccion.querySelector('.serieInsumo')
        const CantidadActualInsumo = seccion.querySelector('.CantidadActualInsumo')
        const facturaInsumo = seccion.querySelector('.facturaInsumo')
        const costoInsumo = seccion.querySelector('.costoInsumo')
        const fechaCompraInsumo = seccion.querySelector('.fechaCompraInsumo')
        const proveedorInsumo = seccion.querySelector('.proveedorInsumo')
        const Ingreso = seccion.querySelector('.Ingreso')
        const Arqueo = seccion.querySelector('.Arqueo')
        const Salida = seccion.querySelector('.Salida')
        const carruselimagenes = seccion.querySelector('.carousel-inner')

        nombreInsumo.value = insumo.nombre
        modeloInsumo.value = insumo.modelo
        areaInsumo.value = insumo.area
        marcaInsumo.value = insumo.marca
        sereiInsumo.value = insumo.serie
        CantidadActualInsumo.value = insumo.cantidad
        facturaInsumo.value = insumo.factura
        costoInsumo.value = insumo.costo_Unitario
        fechaCompraInsumo.value = insumo.fechaCompra
        proveedorInsumo.value = insumo.provedor
        carruselimagenes.setAttribute('insumo', insumo.id)
        Ingreso.setAttribute('insumo', insumo.id)
        Arqueo.setAttribute('insumo', insumo.id)
        Salida.setAttribute('insumo', insumo.id)

        if (!insumo.imagen) {
            if (!insumo.editar) {
                const contendorinputImagenInsumo = seccion.querySelector('.contendorInputImagenesinsumo')
                contendorinputImagenInsumo.classList.remove('d-none')
                const inputImagenInsumo = seccion.querySelector('.inputImagenesInsumo')
                inputImagenInsumo.onchange = e => nuevaImagenInsumo(e)
            }
        } else {
            const itemCarrusel = document.createElement('div')
            itemCarrusel.setAttribute('nombre', `Img-${insumo.imagen}`)
            itemCarrusel.classList.add('carousel-item', `Img-${insumo.imagen}`)
            if (index == 0) itemCarrusel.classList.add('active')
            const divContainer = document.createElement('div')
            const divContainerBotones = document.createElement('div')
            divContainerBotones.classList.add('d-block')
            divContainer.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center')
            const imagen = document.createElement('img')
            imagen.classList.add('d-block', 'w-100')
            imagen.src = element
            divContainer.appendChild(imagen)
            if (!insumo.editar) {
                const iEliminar = document.createElement('i')
                iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-1', 'fw-bold', 'text-danger')
                const btnEliminar = document.createElement('button')
                btnEliminar.setAttribute('insumo', insumo.id)
                btnEliminar.title = 'Eliminar'
                btnEliminar.setAttribute('nombre', `Img-${insumo.imagen}`)
                btnEliminar.classList.add('btn', 'p-0')
                btnEliminar.type = 'button'
                btnEliminar.appendChild(iEliminar)
                btnEliminar.onclick = e => EliminarImagenInsumo(e)
                divContainerBotones.appendChild(btnEliminar)
                divContainer.appendChild(divContainerBotones)
            }
            itemCarrusel.appendChild(divContainer)
            carruselimagenes.appendChild(itemCarrusel)
            carruselimagenes.setAttribute('insumo', insumo.id)
            imagen.onload = e => rotarImg(e)

        }

        if (insumo.editar) {

            const listados = ipcRenderer.sendSync('consultarListasCofigActivos')
            const idlista = generateRandomId()

            areaInsumo.removeAttribute('readonly')
            const listaAreas = seccion.querySelector('#listaAreas')
            listaAreas.id = `${listaAreas.id}${idlista}`
            areaInsumo.setAttribute('list', listaAreas.id)
            areaInsumo.onblur = e => opcionId(e)
            listados[3].forEach(element => {
                const option = document.createElement('option')
                option.value = element.area
                option.textContent = element.id
                listaAreas.appendChild(option)
            })

            marcaInsumo.removeAttribute('readonly')
            const listaMarca = seccion.querySelector('#listMarcas')
            listaMarca.id = `${listaMarca.id}${idlista}`
            marcaInsumo.setAttribute('list', listaMarca.id)
            marcaInsumo.onblur = e => opcionId(e)
            listados[1].forEach(element => {
                const option = document.createElement('option')
                option.value = element.marca
                option.textContent = element.id
                listaMarca.appendChild(option)
            })

            proveedorInsumo.removeAttribute('readonly')
            const listaProveedores = seccion.querySelector('#listaProveedores')
            listaProveedores.id = `${listaProveedores.id}${idlista}`
            proveedorInsumo.setAttribute('list', listaProveedores.id)
            proveedorInsumo.onblur = e => opcionId(e)
            listados[4].forEach(element => {
                const option = document.createElement('option')
                option.value = `${element.nombre_comercial} -- ${element.razon_social} -- ${element.nit}`
                option.textContent = element.id
                listaProveedores.appendChild(option)
            })


            const guardarEdicion = seccion.querySelector('.guardarEdicion')
            guardarEdicion.setAttribute('insumo', insumo.id)
            guardarEdicion.onclick = e => actualizarInsumoBodega(e, seccion)
            guardarEdicion.classList.remove('d-none')

            if (!insumo.pdfFactura) {
                const contendorInputpdf = seccion.querySelector('.contendorInputpdf')
                const inputpdf = contendorInputpdf.querySelector('input')
                inputpdf.onchange = e => cargarDocumentoInsumo(e, seccion)
                contendorInputpdf.classList.remove('d-none')
            }
        }
        const guardarEdicion = seccion.querySelector('.guardarEdicion')
        guardarEdicion.setAttribute('insumo', insumo.id)
        guardarEdicion.classList.remove('d-none')
        guardarEdicion.onclick = e => actualizarInsumoBodega(e, seccion)
        Ingreso.onclick = e => entradaInsumo(e, seccion)
        Arqueo.onclick = e => arqueoInsumo(e, seccion)
        Salida.onclick = e => salidaInsumo(e, seccion)
    }

    return seccion
}

export {
    movimientoInsumoBodega,
}
