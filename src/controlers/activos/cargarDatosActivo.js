const { ipcRenderer } = require('electron')
const cargarDatosActivo = (id) => {
    const data = ipcRenderer.sendSync('consultarActivo', id)
    const activo = data.activo
    const conetenedor = document.querySelector('#TabContent').querySelector('.active')
    console.log(data)
    const codigoInterno = conetenedor.querySelector('.codigoInterno')
    const modeloActivo = conetenedor.querySelector('.modeloActivo')
    const areaActivo = conetenedor.querySelector('.areaActivo')
    const nombreActivo = conetenedor.querySelector('.nombreActivo')
    const serieActivo = conetenedor.querySelector('.serieActivo')
    const ubicacionActivo = conetenedor.querySelector('.ubicacionActivo')
    const marcaActivo = conetenedor.querySelector('.marcaActivo')
    const procesoActivo = conetenedor.querySelector('.procesoActivo')
    const estadoActivo = conetenedor.querySelector('.estadoActivo')
    const proveedorActivo = conetenedor.querySelector('.proveedorActivo')
    const nitProveedor = conetenedor.querySelector('.nitProveedor')
    const responsableActivo = conetenedor.querySelector('.responsableActivo')
    const tipoActivo = conetenedor.querySelector('.tipoActivo')
    const facturaActivo = conetenedor.querySelector('.facturaActivo')
    const valorActivo = conetenedor.querySelector('.valorActivo')
    const ingresoActivo = conetenedor.querySelector('.ingresoActivo')
    const fechaCompra = conetenedor.querySelector('.fechaCompra')
    const garantiaActivo = conetenedor.querySelector('.garantiaActivo')
    const frecuenciaMtto = conetenedor.querySelector('.frecuenciaMtto')
    const proximoMtto = conetenedor.querySelector('.proximoMtto')
    const descripcionActivo = conetenedor.querySelector('.descripcionActivo')
    const recomendacionActivo = conetenedor.querySelector('.recomendacionActivo')
    const observacionActivo = conetenedor.querySelector('.observacionActivo')
    const componentesbody = conetenedor.querySelector('.componentes').querySelector('tbody')
    const historialMantenimiento = conetenedor.querySelector('.historialMantenimiento').querySelector('tbody')
    const gregarcomponentes = conetenedor.querySelector('.componentes').querySelector('.agregarComponente')

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
    nitProveedor.value =  activo.nit
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

    const componentes = data.componentes
    componentes.forEach(element => {
        const tr = document.createElement('tr')

        const tdId= document.createElement('td')
        const tdcomponente = document.createElement('td')
        const tdmarca = document.createElement('td')
        const tdmodelo = document.createElement('td')
        const tdSerie = document.createElement('td')
        const tdcapacidad = document.createElement('td')
        tr.id = `Com-${element.id}`
        tdId.textContent= element.id
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

    const reportes = data.reportes
    componentes.forEach(element => {
        const tr = document.createElement('tr')

        const tdId= document.createElement('td')
        const tdFechaReporte = document.createElement('td')
        const tdmarca = document.createElement('td')
        const tdmodelo = document.createElement('td')
        const tdSerie = document.createElement('td')
        const tdcapacidad = document.createElement('td')
        tr.id = `Rep-${element.id}`
        tdId.textContent= element.id
        tdFechaReporte.textContent = element.fechareporte
        tdmarca.textContent = element.marca
        tdmodelo.textContent = element.modelo
        tdSerie.textContent = element.serie
        tdcapacidad.textContent = element.capacidad
        tdcapacidad.textContent = element.capacidad
        tdcapacidad.textContent = element.capacidad
        tr.appendChild(tdId)
        tr.appendChild(tdcomponente)
        tr.appendChild(tdmarca)
        tr.appendChild(tdmodelo)
        tr.appendChild(tdSerie)
        tr.appendChild(tdcapacidad)
        tr.appendChild(tdcapacidad)
        tr.appendChild(tdcapacidad)
        componentesbody.appendChild(tr)
    });

}

export {
    cargarDatosActivo
}