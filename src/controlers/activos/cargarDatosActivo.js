const { ipcRenderer } = require('electron')
import { generateRandomId } from '../helpers/nombreRandon.js'
import { rotarImg } from '../helpers/activos/rotarImg.js'
import { eliminarImgActivo } from '../helpers/eliminarImg.js'
import { imprimirActivo } from './ImprimirActivo.js'
import { solicitarMttoActivo } from './solicitarMttoActivo.js'
import { editarActivo } from './editarActivo.js'
import { imprimirListadoMtoActivo } from './ImprimirListadoMtto.js'
import { agregarComponente } from '../componentes/agregarLineaComponente.js'
import { eliminarActivo } from './eliminarActivo.js'
import { eliminarComponente } from '../componentes/eliminarComponente.js'
import { nuevaImagen } from '../helpers/activos/cargarNuevaImagenCarrusel.js'
import { eliminarDocumento } from '../helpers/documentacion/eliminardocumento.js'
import { descargarDocumento } from '../helpers/documentacion/descargardocumento.js'
import { cargarDocumento } from '../helpers/documentacion/cargarDocumento.js'
import { opcionId } from '../helpers/activos/listasId.js'

const cargarDatosActivo = (id, nodo) => {
    const data = ipcRenderer.sendSync('consultarActivo', id)
    const activo = data.activo
    console.log(data)

    const form = nodo.querySelector('form')
    const codigoInterno = nodo.querySelector('.codigoInterno')
    const modeloActivo = nodo.querySelector('.modeloActivo')
    const areaActivo = nodo.querySelector('.areaActivo')
    const nombreActivo = nodo.querySelector('.nombreActivo')
    const serieActivo = nodo.querySelector('.serieActivo')
    const ubicacionActivo = nodo.querySelector('.ubicacionActivo')
    const marcaActivo = nodo.querySelector('.marcaActivo')
    const procesoActivo = nodo.querySelector('.procesoActivo')
    const estadoActivo = nodo.querySelector('.estadoActivo')
    const proveedorActivo = nodo.querySelector('.proveedorActivo')
    const nitProveedor = nodo.querySelector('.nitProveedor')
    const responsableActivo = nodo.querySelector('.responsableActivo')
    const tipoActivo = nodo.querySelector('.tipoActivo')
    const facturaActivo = nodo.querySelector('.facturaActivo')
    const valorActivo = nodo.querySelector('.valorActivo')
    const ingresoActivo = nodo.querySelector('.ingresoActivo')
    const fechaCompra = nodo.querySelector('.fechaCompra')
    const garantiaActivo = nodo.querySelector('.garantiaActivo')
    const frecuenciaMtto = nodo.querySelector('.frecuenciaMtto')
    const proximoMtto = nodo.querySelector('.proximoMtto')
    const descripcionActivo = nodo.querySelector('.descripcionActivo')
    const recomendacionActivo = nodo.querySelector('.recomendacionActivo')
    const observacionActivo = nodo.querySelector('.observacionActivo')
    const componentesbody = nodo.querySelector('.componentes').querySelector('tbody')
    const historialMantenimiento = nodo.querySelector('.historialMantenimiento').querySelector('tbody')
    const carruselimagenes = nodo.querySelector('.carousel-inner')
    const carruseldiv = nodo.querySelector('#carouselExampleControls')
    const carruselBotonSiguente = carruseldiv.querySelector('.carousel-control-next')
    const carruselBotonAnterior = carruseldiv.querySelector('.carousel-control-prev')
    const solicitarMantenimiento = nodo.querySelector('.solicitar')
    const imprimirHojadevida = nodo.querySelector('.print')
    const imprimirlistadomtto = nodo.querySelector('.imprimirlistadomtto')
    const agregarcomponentes = nodo.querySelector('.componentes').querySelector('.nuevoComponente')


    // cargamos los datos del activo
    codigoInterno.value = activo.codigo
    codigoInterno.setAttribute('codigo-activo', `Act-${activo.id}`)
    form.setAttribute('form-activo', `Act-${activo.id}`)
    modeloActivo.value = activo.modelo
    areaActivo.value = activo.area
    areaActivo.setAttribute('opcionId', `Ar-${activo.area_id}`)
    nombreActivo.value = activo.nombre
    serieActivo.value = activo.serie
    ubicacionActivo.value = activo.ubicacion
    marcaActivo.value = activo.marca
    marcaActivo.setAttribute('opcionId', `Ma-${activo.marca_id}`)
    procesoActivo.value = activo.proceso
    procesoActivo.setAttribute('opcionId', `Pr-${activo.proceso_id}`)
    estadoActivo.value = activo.estado
    estadoActivo.setAttribute('opcionId', `Es-${activo.estado_id}`)
    proveedorActivo.value = activo.provedor
    proveedorActivo.setAttribute('opcionId', `Pro-${activo.proveedor_id}`)
    nitProveedor.value = activo.nit
    responsableActivo.value = activo.responsable
    responsableActivo.setAttribute('opcionId', `Re-${activo.responsableId}`)
    tipoActivo.value = activo.tipoActivo
    tipoActivo.setAttribute('opcionId', `Ta-${activo.tipo_activo_id}`)
    facturaActivo.value = activo.numero_factura
    valorActivo.value = activo.valor
    ingresoActivo.value = activo.fecha_creacion
    fechaCompra.value = activo.fecha_compra
    garantiaActivo.value = activo.vencimiento_garantia
    frecuenciaMtto.value = activo.frecuencia
    frecuenciaMtto.setAttribute('opcionId', `Fr-${activo.frecuencia_id}`)
    proximoMtto.value = activo.fecha_proximo_mtto
    descripcionActivo.value = activo.descripcion
    recomendacionActivo.value = activo.recomendaciones_Mtto
    observacionActivo.value = activo.obervacion

    if (data.editar) {

        const listados = ipcRenderer.sendSync('consultarListasCofigActivos')
        const idlista = generateRandomId()

        modeloActivo.removeAttribute('readonly')

        areaActivo.removeAttribute('readonly')
        const listaAreas = nodo.querySelector('#listaAreas')
        listaAreas.id = `${listaAreas.id}${idlista}`
        areaActivo.setAttribute('list', listaAreas.id)
        areaActivo.onblur = e => opcionId(e)
        listados[3].forEach(element => {
            const option = document.createElement('option')
            option.value = element.area
            option.textContent = element.id
            listaAreas.appendChild(option)
        })

        nombreActivo.removeAttribute('readonly')
        serieActivo.removeAttribute('readonly')
        ubicacionActivo.removeAttribute('readonly')

        marcaActivo.removeAttribute('readonly')
        const listaMarca = nodo.querySelector('#listMarcas')
        listaMarca.id = `${listaMarca.id}${idlista}`
        marcaActivo.setAttribute('list', listaMarca.id)
        marcaActivo.onblur = e => opcionId(e)
        listados[1].forEach(element => {
            const option = document.createElement('option')
            option.value = element.marca
            option.textContent = element.id
            listaMarca.appendChild(option)
        })

        procesoActivo.removeAttribute('readonly')
        const listProceso = nodo.querySelector('#listProceso')
        listProceso.id = `${listProceso.id}${idlista}`
        procesoActivo.setAttribute('list', listProceso.id)
        procesoActivo.onblur = e => opcionId(e)
        listados[2].forEach(element => {
            const option = document.createElement('option')
            option.value = `${element.sigla} -- ${element.proceso}`
            option.textContent = element.id
            listProceso.appendChild(option)
        })

        estadoActivo.removeAttribute('readonly')
        const listaEstado = nodo.querySelector('#listaEstado')
        listaEstado.id = `${listaEstado.id}${idlista}`
        estadoActivo.setAttribute('list', listaEstado.id)
        estadoActivo.onblur = e => opcionId(e)
        listados[6].forEach(element => {
            const option = document.createElement('option')
            option.value = element.estado
            option.textContent = element.id
            listaEstado.appendChild(option)
        })

        proveedorActivo.removeAttribute('readonly')
        const listaProveedores = nodo.querySelector('#listaProveedores')
        listaProveedores.id = `${listaProveedores.id}${idlista}`
        proveedorActivo.setAttribute('list', listaProveedores.id)
        proveedorActivo.onblur = e => opcionId(e)
        listados[4].forEach(element => {
            const option = document.createElement('option')
            option.value = `${element.nombre_comercial} -- ${element.razon_social} -- ${element.nit}`
            option.textContent = element.id
            listaProveedores.appendChild(option)
        })

        responsableActivo.removeAttribute('readonly')
        const listaUsuario = nodo.querySelector('#listaUsuario')
        listaUsuario.id = `${listaUsuario.id}${idlista}`
        responsableActivo.setAttribute('list', listaUsuario.id)
        responsableActivo.onblur = e => opcionId(e)
        listados[7].forEach(element => {
            const option = document.createElement('option')
            option.value = element.nombre
            option.textContent = element.id
            listaUsuario.appendChild(option)
        })

        tipoActivo.removeAttribute('readonly')
        const listaTipoActivo = nodo.querySelector('#listaTipoActivo')
        listaTipoActivo.id = `${listaTipoActivo.id}${idlista}`
        tipoActivo.setAttribute('list', listaTipoActivo.id)
        tipoActivo.onblur = e => opcionId(e)
        listados[5].forEach(element => {
            const option = document.createElement('option')
            option.value = element.tipoActivo
            option.textContent = element.id
            listaTipoActivo.appendChild(option)
        })

        facturaActivo.removeAttribute('readonly')
        valorActivo.removeAttribute('readonly')
        ingresoActivo.removeAttribute('readonly')
        fechaCompra.removeAttribute('readonly')
        garantiaActivo.removeAttribute('readonly')

        frecuenciaMtto.removeAttribute('readonly')
        const listaFrecuencia = nodo.querySelector('#listaFrecuencia')
        listaFrecuencia.id = `${listaFrecuencia.id}${idlista}`
        frecuenciaMtto.setAttribute('list', listaFrecuencia.id)
        frecuenciaMtto.onblur = e => opcionId(e)
        listados[8].forEach(element =>{
            const option = document.createElement('option')
            option.value =`${element.dias} -- ${element.frecuencia}`
            option.textContent = element.id
            listaFrecuencia.appendChild(option)
        })

        proximoMtto.removeAttribute('readonly')
        descripcionActivo.removeAttribute('readonly')
        recomendacionActivo.removeAttribute('readonly')
        observacionActivo.removeAttribute('readonly')
    }

    solicitarMantenimiento.setAttribute('activo', `Act-${activo.id}`)
    solicitarMantenimiento.onclick = e => solicitarMttoActivo(e)
    imprimirHojadevida.setAttribute('activo', `Act-${activo.id}`)
    imprimirHojadevida.onclick = e => imprimirActivo(e)

    const actualizarActivo = nodo.querySelector('.guardarEdicion')
    const eliminarActivob = nodo.querySelector('.eliminar')
    actualizarActivo.setAttribute('activo', `Act-${activo.id}`)
    actualizarActivo.onclick = e => editarActivo(e)
    eliminarActivob.setAttribute('activo', `Act-${activo.id}`)
    eliminarActivob.onclick = e => eliminarActivo(e)

    // configuramos el carrusel de imagenes
    const idCarrusel = generateRandomId()
    carruseldiv.id = idCarrusel
    carruselBotonSiguente.setAttribute('data-bs-target', `#${idCarrusel}`)
    carruselBotonAnterior.setAttribute('data-bs-target', `#${idCarrusel}`)

    // cargamos las imagnes en el carrusel
    activo.BufferImagenes.forEach((element, index) => {
        const itemCarrusel = document.createElement('div')
        itemCarrusel.setAttribute('nombre', `Img-${activo.url_img[index]}`)
        itemCarrusel.classList.add('carousel-item', `Img-${activo.url_img[index]}`)
        if (index == 0) itemCarrusel.classList.add('active')
        const divContainer = document.createElement('div')
        const divContainerBotones = document.createElement('div')
        divContainerBotones.classList.add('d-block')
        divContainer.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center')
        const imagen = document.createElement('img')
        imagen.classList.add('d-block', 'w-100')
        imagen.src = element
        const iEliminar = document.createElement('i')
        iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-1', 'fw-bold', 'text-danger')
        const btnEliminar = document.createElement('button')
        btnEliminar.setAttribute('activo', `Act-${activo.id}`)
        btnEliminar.title = 'Eliminar'
        btnEliminar.setAttribute('nombre', `Img-${activo.url_img[index]}`)
        btnEliminar.classList.add('btn', 'p-0')
        btnEliminar.type = 'button'
        btnEliminar.appendChild(iEliminar)
        divContainer.appendChild(imagen)
        divContainerBotones.appendChild(btnEliminar)
        divContainer.appendChild(divContainerBotones)
        itemCarrusel.appendChild(divContainer)
        carruselimagenes.appendChild(itemCarrusel)
        carruselimagenes.setAttribute('activo', `Act-${activo.id}`)
        imagen.onload = e => rotarImg(e)
        btnEliminar.onclick = e => eliminarImgActivo(e)
    })

    // mostrar input de cargar imagenes en el activo
    if (activo.url_img.length >= 6) {
        const contendorImputImagenesActivo = nodo.querySelector('.contendorImputImagenesActivo')
        contendorImputImagenesActivo.classList.add('d-none')
    } else {
        const bottontImagenActivo = nodo.querySelector('.buttonImagenesActivo')
        const faltantes = 6 - activo.url_img.length
        bottontImagenActivo.textContent = `Selecione Max ${faltantes} Imagenes`
        const inputImagenActivo = nodo.querySelector('.inputImagenesActivo')
        inputImagenActivo.onchange = e => nuevaImagen(e)
    }

    // cargar y mostrar los documentos soportes
    if (activo.Buffersoportes) {
        const documentos = Object.keys(activo.Buffersoportes)
        if (documentos.length > 0) {
            documentos.forEach(documento => {
                const containerDocumento = nodo.querySelector(`.${documento}`)
                if (containerDocumento !== undefined) {
                    const embedpdf = containerDocumento.querySelector('embed')
                    embedpdf.src = activo.Buffersoportes[`${documento}`]
                    embedpdf.setAttribute('activo', `Act-${activo.id}`)
                    embedpdf.setAttribute('tipo', `${documento}`)
                    const containerpdf = containerDocumento.querySelector('.pdfDocumentacion')
                    containerpdf.classList.remove('d-none')
                    const botonEliminar = containerDocumento.querySelector('.eliminar')
                    botonEliminar.setAttribute('activo', `Act-${activo.id}`)
                    botonEliminar.setAttribute('tipo', `${documento}`)
                    botonEliminar.onclick = e => eliminarDocumento(e)
                    const botonDescargar = containerDocumento.querySelector('.descargar')
                    botonDescargar.setAttribute('activo', `Act-${activo.id}`)
                    botonDescargar.setAttribute('tipo', `${documento}`)
                    botonDescargar.onclick = e => descargarDocumento(e)
                }
            })
        }
    }

    //cargar los input de los que no tiene documentos
    const containersDocumentos = nodo.querySelectorAll('.d-none.pdfDocumentacion')
    for (const element of containersDocumentos) {
        const contenedorImput = element.nextSibling.nextSibling
        const inputdocumento = contenedorImput.querySelector('input')
        inputdocumento.onchange = (e) => cargarDocumento(e)
        inputdocumento.setAttribute('activo', `Act-${activo.id}`)
        contenedorImput.classList.remove('d-none')
    }



    // cargamos los componentes en la tabla componentes
    const componentes = data.componentes
    componentes.forEach(element => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const tdcomponente = document.createElement('td')
        const tdmarca = document.createElement('td')
        const tdmodelo = document.createElement('td')
        const tdSerie = document.createElement('td')
        const tdcapacidad = document.createElement('td')
        const tdAcciones = document.createElement('td')
        const btnEliminar = document.createElement('button')
        btnEliminar.title = 'Eliminar'
        const iEliminar = document.createElement('i')
        tr.id = `Com-${element.id}`
        tdId.textContent = element.id
        tdcomponente.textContent = element.nombre
        tdmarca.textContent = element.marca
        tdmodelo.textContent = element.modelo
        tdSerie.textContent = element.serie
        tdcapacidad.textContent = element.capacidad
        tr.appendChild(tdId)
        tr.appendChild(tdcomponente)
        tr.appendChild(tdmarca)
        tr.appendChild(tdmodelo)
        tr.appendChild(tdSerie)
        tr.appendChild(tdcapacidad)
        // botones de edicion de compnentes
        iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-5', 'eliminarcomponente')
        btnEliminar.classList.add('btn')
        btnEliminar.type = 'button'
        btnEliminar.setAttribute('componente', `Com-${element.id}`)
        btnEliminar.setAttribute('activo', `Act-${activo.id}`)
        btnEliminar.onclick = e => eliminarComponente(e)
        btnEliminar.appendChild(iEliminar)
        tdAcciones.appendChild(btnEliminar)
        tr.appendChild(tdAcciones)
        // creamos la fila en la tabla
        
        componentesbody.appendChild(tr)
    });

    // agregar un componente
    agregarcomponentes.setAttribute('activo', `Act-${activo.id}`)
    agregarcomponentes.onclick = e => agregarComponente(e)


    // cargamos los reportes en la tabla reportes
    const reportes = data.reportes
    reportes.forEach(element => {
        const tr = document.createElement('tr')

        const tdId = document.createElement('td')
        const tdFechaReporte = document.createElement('td')
        const tdHallazgos = document.createElement('td')
        const tdReporte = document.createElement('td')
        const tdRecomendaciones = document.createElement('td')
        const tdProveedor = document.createElement('td')
        const tdProximoMtto = document.createElement('td')
        const tdtipoMantenimeinto = document.createElement('td')
        tr.id = `Rep-${element.id}`
        tdId.textContent = element.id
        tdFechaReporte.textContent = element.fechareporte
        tdHallazgos.textContent = element.hallazgos
        tdReporte.textContent = element.reporte
        tdRecomendaciones.textContent = element.recomendaciones
        tdProveedor.textContent = element.proveedor
        tdProximoMtto.textContent = element.proximoMtto
        tdtipoMantenimeinto.textContent = element.tipoMantenimeinto
        tr.appendChild(tdId)
        tr.appendChild(tdFechaReporte)
        tr.appendChild(tdHallazgos)
        tr.appendChild(tdReporte)
        tr.appendChild(tdRecomendaciones)
        tr.appendChild(tdProveedor)
        tr.appendChild(tdProximoMtto)
        tr.appendChild(tdtipoMantenimeinto)
        historialMantenimiento.appendChild(tr)
    });
    imprimirlistadomtto.setAttribute('activo', `Act-${activo.id}`)
    imprimirlistadomtto.onclick = e => imprimirListadoMtoActivo(e)

}

export {
    cargarDatosActivo
}