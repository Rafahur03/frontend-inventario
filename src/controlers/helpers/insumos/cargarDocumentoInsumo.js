const mime = require('mime-types')
import { modalMensaje } from "../modalEleccion.js"
import { generateRandomId} from "../nombreRandon.js"
import { eliminarFacturaInsumo } from "./eliminarDocumentoInsumo.js"
import { guardarDocumentoInsumo } from "../../insumos/guardarFacturaInsumo.js"
//import { guardarSoporteExterno } from "./guardarSoporteExterno.js"

const cargarDocumentoInsumo = async (e, nodo) => {

    const files = e.target.files

    if (files.length < 1) return

    if (files.length > 1) return modalMensaje({ titulo: 'ERROR', mensaje: ' Solo se puede cargar un archivo pdf' })

    const contenedorReporte = nodo.querySelector('.contendorpdFactura')
    const pdfcargado = contenedorReporte.querySelectorAll('iframe ')

    if (pdfcargado.length > 0) return modalMensaje({ titulo: 'ERROR', mensaje: ' ya se tiene una Factura cargada debe eliminarla primero para poder cagar otra' })
    const file = files[0]

    if (mime.extension(file.type) != 'pdf' || file.size > 15000000) return modalMensaje({ titulo: 'ERROR', mensaje: ' Solo se permiten archivos PDF menores de 15 MB' })

    const nombre = generateRandomId()
    const reader = new FileReader()
    const contenedorpdf = document.createElement('div')
    contenedorpdf.setAttribute('nombre', `Pdf-${nombre}`)
    contenedorpdf.classList.add('m-2', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'embed-responsive')
    const iframepdf = document.createElement('iframe')
    iframepdf.classList.add('embed-responsive-item', 'w-75')
    iframepdf.style.height = '400px'
    iframepdf.style.width = '600px'
    contenedorpdf.appendChild(iframepdf);
    contenedorReporte.appendChild(contenedorpdf);

    iframepdf.src = URL.createObjectURL(file)
    reader.onload = function (e) {
        iframepdf.src = e.target.result
    }

    reader.readAsDataURL(file)

    const contenedorBotones = document.createElement('div')
    contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')

    const iEliminar = document.createElement('i')
    iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
    const btnEliminar = document.createElement('button')
    btnEliminar.setAttribute('iframepdf', nombre)
    btnEliminar.classList.add('btn', 'text-center', 'm-1', 'p-0', 'eliminar')
    btnEliminar.appendChild(iEliminar)
    btnEliminar.onclick = e => {
        e.preventDefault();
        eliminarFacturaInsumo(nodo)
    }
    contenedorBotones.appendChild(btnEliminar)

    const insumo = nodo.querySelector('.insumo')
    const idInsumo= insumo.getAttribute('insumo')

    const iGuardar = document.createElement('i')
    iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-3', 'fw-bold', 'text-primary', 'p-0')
    const btnGuardar = document.createElement('button')
    btnGuardar.setAttribute('iframepdf', nombre)
    btnGuardar.setAttribute('insumo', idInsumo)
    btnGuardar.classList.add('btn', 'text-center', 'm-1', 'p-0', 'guardar')
    btnGuardar.appendChild(iGuardar)
    btnGuardar.onclick = e => guardarDocumentoInsumo(e,nodo)
    contenedorBotones.appendChild(btnGuardar)


    contenedorpdf.appendChild(iframepdf)
    contenedorpdf.appendChild(contenedorBotones)
    contenedorReporte.appendChild(contenedorpdf)

    const contenedorInputPdf = nodo.querySelector('.contendorInputpdf')
    contenedorInputPdf.classList.add('d-none')
    contenedorInputPdf.querySelector('input').value = ''

}

export { cargarDocumentoInsumo }