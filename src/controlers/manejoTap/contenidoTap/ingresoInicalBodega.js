const { ipcRenderer } = require('electron')
import { generateRandomId } from "../../helpers/nombreRandon.js"
import { opcionId } from "../../helpers/activos/listasId.js"
import { modalMensaje } from "../../helpers/modalEleccion.js"
import { nuevaImagenInsumo } from "../../helpers/insumos/nuevaImagenInsumo.js"
import { cargarDocumentoInsumo } from "../../helpers/insumos/cargarDocumentoInsumo.js"
import { cargarTapContenido } from "../cargarTapContenido.js"
const ingresoInicalBodega = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = ` 
        <h2 class="text-center my-2 fw-bold border-bottom">INGRESO DE INSUMOS A BODEGA</h2>
        <h3 class="text-center my-1">Ingreso de insumo</h3>
        <div class="container-fluid w-100 border border-1 border-dark m-2 dataActivo">
            <div class="container-fluid me-5 w-100 d-flex ">
                <div class=" ms-2">
                    <button type="button" class="btn mt-0 pt-0 crearInsumo" title="Crear Insumo">
                        <i class="bi bi-check-square-fill fs-1 text-success"></i>
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
                        <div class="d-flex flex-column align-items-center justify-content-center mt-3 contendorInputImagenesinsumo">
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
                        <input type="select" class="form-control my-1  fw-bold insumo" list="listainsumos" opcionId="Ins--0">
                        <datalist id="listainsumos"></datalist>

                        <label class="fw-bold" for="modeloInsumo">Modelo <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 modeloInsumo">

                        <label class="fw-bold" for="bodegaInsumo">Bodega<span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 bodegaInsumo" list="listaBodegas" opcionId="Bo--0">
                        <datalist id="listaBodegas"></datalist>

                    </div>
                    <div class="form-group col-2">
                        <label class="fw-bold" for="marcaMarca">Marca <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 marcaMarca" list="listMarcas" opcionId="Ma--0">
                        <datalist id="listMarcas"></datalist>
                    
                        <label class="fw-bold" for="serieInsumo">Serie <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 serieInsumo">

                        <label class="fw-bold" for="cantidadInsumo">Cantidad Especifica <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="number" min="1" class="form-control my-1 CantidadInsumo">
                  
                    </div>
                    <div class="form-group col-3">
                        <label class="fw-bold" for="facturaInsumo">N. Factura <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 facturaInsumo">

                        <label class="fw-bold" for="valorInsumo">Valor Unitario <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="number" min="0" class="form-control my-1 valorInsumo">

                        <label class="fw-bold" for="fechaCompra">Fecha Compra <span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="date" class="form-control my-1 fechaCompra">
                                       
                    </div>
                    <div class="form-group col-6">
                        <label class="fw-bold" for="proveedorInsumo">Proveedor<span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 proveedorInsumo"
                            list="listaProveedores"  opcionId="Pro--0">
                        <datalist id="listaProveedores"></datalist>
                    </div>
                    <div class="form-group col-6">
                        <label class="fw-bold" for="descripcionInsumo">Descripcion<span class="m-0 p-0 text-danger"> *</span> </label>
                        <input type="text" class="form-control my-1 descripcionInsumo">
                    </div>
                </div>               
            </form>
        </div>
        <div class="container-fluid w-100 m-0 p-0 my-3 containerDocumentacion">
        <h3 class="fw-bold text-center my-2">FACTURA</h3>
            <div class="form-group w-50 mx-auto text-center d-block my-2">            
                <div class="contendorInputpdf position-relative">
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
    const data = ipcRenderer.sendSync('consultartablasInsumo')
    if (data.msg) {
        modalMensaje({ titulo: 'ERROR', mensaje: data.msg })
    } else {

        const crearInsumo = seccion.querySelector('.crearInsumo')
        const inputImagenesInsumo = seccion.querySelector('.inputImagenesInsumo')
        const insumo = seccion.querySelector('.insumo')
        const listainsumos = seccion.querySelector('#listainsumos')
        const modeloInsumo = seccion.querySelector('.modeloInsumo')
        const bodegaInsumo = seccion.querySelector('.bodegaInsumo')
        const listaBodegas = seccion.querySelector('#listaBodegas')
        const marcaMarca = seccion.querySelector('.marcaMarca')
        const listMarcas = seccion.querySelector('#listMarcas')
        const serieInsumo = seccion.querySelector('.serieInsumo')
        const CantidadInsumo = seccion.querySelector('.CantidadInsumo')
        const facturaInsumo = seccion.querySelector('.facturaInsumo')
        const valorInsumo = seccion.querySelector('.valorInsumo')
        const fechaCompra = seccion.querySelector('.fechaCompra')
        const proveedorInsumo = seccion.querySelector('.proveedorInsumo')
        const listaProveedores = seccion.querySelector('#listaProveedores')
        const descripcionInsumo = seccion.querySelector('.descripcionInsumo')
        const inputPdfSoporte = seccion.querySelector('.inputPdfSoporte')
        const contenedorImagen = seccion.querySelector('.carousel-inner')
        const contendorpdFactura = seccion.querySelector('.contendorpdFactura')


        const idlista = generateRandomId()
        listainsumos.id = `${listainsumos.id}${idlista}`
        insumo.setAttribute('list', listainsumos.id)
        insumo.onblur = e => opcionId(e)
        data[0].forEach(element => {
            const option = document.createElement('option')
            option.value = element.insumo
            option.textContent = element.id
            listainsumos.appendChild(option)
        })

        listaBodegas.id = `${listaBodegas.id}${idlista}`
        bodegaInsumo.setAttribute('list', listaBodegas.id)
        bodegaInsumo.onblur = e => opcionId(e)
        data[1].forEach(element => {
            const option = document.createElement('option')
            option.value = element.bodega
            option.textContent = element.id
            listaBodegas.appendChild(option)
        })

        listMarcas.id = `${listMarcas.id}${idlista}`
        marcaMarca.setAttribute('list', listMarcas.id)
        marcaMarca.onblur = e => opcionId(e)
        data[2].forEach(element => {
            const option = document.createElement('option')
            option.value = element.marca
            option.textContent = element.id
            listMarcas.appendChild(option)
        })

        listaProveedores.id = `${listaProveedores.id}${idlista}`
        proveedorInsumo.setAttribute('list', listaProveedores.id)
        proveedorInsumo.onblur = e => opcionId(e)
        data[3].forEach(element => {
            const option = document.createElement('option')
            option.value = element.proveedor
            option.textContent = element.id
            listaProveedores.appendChild(option)
        })

        inputImagenesInsumo.onchange = e => {
            e.preventDefault()
            nuevaImagenInsumo(e, true)
        }
        inputPdfSoporte.onchange = e => {
            e.preventDefault()
            cargarDocumentoInsumo(e, seccion, true)
        }

        crearInsumo.onclick = e => {
            e.preventDefault()


            if (insumo.getAttribute('opcionId') == 'Ins--0') return modalMensaje({ titulo: 'Error', mensaje: 'Debe Selecionar un INSUMO del listado' })

            if (bodegaInsumo.getAttribute('opcionId') == 'Bo--0') return modalMensaje({ titulo: 'Error', mensaje: 'Debe Selecionar una BODEGA del listado' })

            if (marcaMarca.getAttribute('opcionId') == 'Ma--0') return modalMensaje({ titulo: 'Error', mensaje: 'Debe Selecionar una MARCA del listado' })

            if (proveedorInsumo.getAttribute('opcionId') == 'Pro--0') return modalMensaje({ titulo: 'Error', mensaje: 'Debe Selecionar un PROVEEDOR del listado' })

            if (CantidadInsumo.value == '') return modalMensaje({ titulo: 'Error', mensaje: 'El campo CANTIDAD INSUMO debe ser un numero, puede tener decimales' })
            if (isNaN(parseFloat(CantidadInsumo.value))) return modalMensaje({ titulo: 'Error', mensaje: 'El campo CANTIDAD INSUMO debe ser un numero, puede tener decimales' })
            if (CantidadInsumo.value <= 0) return modalMensaje({ titulo: 'Error', mensaje: 'El campo CANTIDAD INSUMO debe ser mayor que 0' })
            if (valorInsumo.value == '') return modalMensaje({ titulo: 'Error', mensaje: 'El campo VALOR INSUMO no puede estar vacio' })
            if (isNaN(parseFloat(valorInsumo.value))) return modalMensaje({ titulo: 'Error', mensaje: 'El campo VALOR UNITARIO debe ser un numero, puede tener decimales' })
            if (valorInsumo.value <= 0) return modalMensaje({ titulo: 'Error', mensaje: 'El campo VALOR INSUMO debe ser mayor que 0' })

            if (facturaInsumo.value == '') return modalMensaje({ titulo: 'Error', mensaje: 'El campo FACTURA no puede estar vacio' })
            if (fechaCompra.value == '') return modalMensaje({ titulo: 'Error', mensaje: 'El campo FECHA DE COMPRA no puede estar vacio' })

            const tagImagen = contenedorImagen.querySelector('img')
            const tagFactura = contendorpdFactura.querySelector('iframe')
            const datos = {
                insumo: insumo.getAttribute('opcionId'),
                modelo: modeloInsumo.value,
                bodega: bodegaInsumo.getAttribute('opcionId'),
                marca: marcaMarca.getAttribute('opcionId'),
                serie: serieInsumo.value,
                cantidad: CantidadInsumo.value,
                factura: facturaInsumo.value,
                valor: valorInsumo.value,
                fecha: fechaCompra.value,
                proveedor: proveedorInsumo.getAttribute('opcionId'),
                descripcion: descripcionInsumo.value,
                imagen: tagImagen == null ? '' : tagImagen.src,
                facturaPdf: tagFactura == null ? '' : tagFactura.src
            }
            const guardado = ipcRenderer.sendSync('ingresoInicalInsumo', datos)
            console.log (guardado)
            if (guardado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: guardado.msg })
            modalMensaje({titulo: 'exito',mensaje:guardado.exito})
            cargarTapContenido('consultarInsumo', guardado.id)

        }

        return seccion
    }
}
export {
    ingresoInicalBodega
}
