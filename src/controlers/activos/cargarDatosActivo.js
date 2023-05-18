const { ipcRenderer } = require('electron')
import { generateRandomId } from '../manejoTap/agregarTap.js'
import { rotarImg } from '../helpers/rotarImg.js'
import { eliminarImg } from '../helpers/eliminarImg.js'
const cargarDatosActivo = (id, nodo) => {
    const data = ipcRenderer.sendSync('consultarActivo', id)
    const activo = data.activo
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
    const gregarcomponentes = nodo.querySelector('.componentes').querySelector('.agregarComponente')


    // cargamos los datos del activo
    codigoInterno.value = activo.codigo
    modeloActivo.value = activo.modelo
    areaActivo.value = activo.area
    nombreActivo.value = activo.nombre
    serieActivo.value = activo.serie
    ubicacionActivo.value = activo.ubicacion
    marcaActivo.value = activo.marca
    procesoActivo.value = activo.proceso
    estadoActivo.value = activo.estado
    proveedorActivo.value = activo.provedor
    nitProveedor.value = activo.nit
    responsableActivo.value = activo.responsable
    tipoActivo.value = activo.tipoActivo
    facturaActivo.value = activo.numero_factura
    valorActivo.value = activo.valor
    ingresoActivo.value = activo.fecha_creacion
    fechaCompra.value = activo.fecha_compra
    garantiaActivo.value = activo.vencimiento_garantia
    frecuenciaMtto.value = activo.frecuencia
    proximoMtto.value = activo.fecha_proximo_mtto
    descripcionActivo.value = activo.descripcion
    recomendacionActivo.value = activo.recomendaciones_Mtto
    observacionActivo.value = activo.obervacion
    // configuramos el carrusel de imagenes
    const idCarrusel = generateRandomId()
    carruseldiv.id = idCarrusel
    carruselBotonSiguente.setAttribute('data-bs-target', `#${idCarrusel}`)
    carruselBotonAnterior.setAttribute('data-bs-target', `#${idCarrusel}`)

    // cargamos las imagnes en el carrusel
    activo.BufferImagenes.forEach((element, index) => {
        const itemCarrusel = document.createElement('div')
        itemCarrusel.id = activo.url_img[index]
        itemCarrusel.classList.add('carousel-item')
        if (index == 0) itemCarrusel.classList.add('active')
        const divContainer= document.createElement('div')
        divContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center')
        const imagen = document.createElement('img')
        imagen.classList.add('d-block', 'w-100')
        imagen.src = element
        const iEliminar = document.createElement('i')
        iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-1', 'fw-bold', 'position-absolute', 'bottom-0', 'start-50', 'text-danger')
        iEliminar.id =  `Act-${activo.id}- ${activo.url_img[index]}`
        divContainer.appendChild(imagen)
        divContainer.appendChild(iEliminar)
        itemCarrusel.appendChild(divContainer)
        carruselimagenes.appendChild(itemCarrusel)
        imagen.onload = e => rotarImg(e)
        iEliminar.onclick = e => eliminarImg(e)
    })

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
        componentesbody.appendChild(tr)
    });

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

}

export {
    cargarDatosActivo
}