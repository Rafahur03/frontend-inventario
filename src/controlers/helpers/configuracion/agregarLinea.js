import { generateRandomId } from "../nombreRandon.js"

const agregarLinea = (e) => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const nombre = boton.getAttribute('nombre')
    const table = boton.parentNode.nextElementSibling
    const tbody = table.querySelector('tbody')
    const tr = document.createElement('tr')
    const tdId = document.createElement('td')
    const inpiId = document.createElement('input')
    const idrandon = generateRandomId()
    inpiId.type = 'text'
    inpiId.value = 'crear'
    inpiId.readOnly = true
    inpiId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idArea')
    tdId.appendChild(inpiId)
    const tdNombre = document.createElement('td')
    const inpNombre = document.createElement('input')
    inpNombre.type = 'text'
    inpNombre.placeholder = 'Nombre del ' + nombre
    inpNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombre' + nombre.replace(' ', ''))
    tdNombre.appendChild(inpNombre)
    const tdEstado = document.createElement('td')
    const inpEstado = document.createElement('input')
    inpEstado.type = 'text'
    inpEstado.value = 'Activo'
    inpEstado.readOnly = true
    inpEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estado' + nombre.replace(' ', ''))
    tdEstado.appendChild(inpEstado)
    const contenedorBotones = document.createElement('div')
    contenedorBotones.classList.add('d-flex', 'justify-content-center')
    const tdBotones = document.createElement('td')
    const botonCrear = document.createElement('button')
    botonCrear.classList.add('btn', 'mt-0', 'pt-0')
    botonCrear.type = 'button'
    botonCrear.title = 'Crear ' + nombre
    botonCrear.setAttribute('idtr', idrandon)
    const iCrear = document.createElement('i')
    iCrear.classList.add('bi', 'bi-check-square-fill', 'fs-1', 'text-success')
    botonCrear.appendChild(iCrear)
    contenedorBotones.appendChild(botonCrear)
    tdBotones.appendChild(contenedorBotones)
    tr.id = idrandon
    tr.appendChild(tdId)
    tr.appendChild(tdNombre)
    switch (nombre) {
        case 'Frecuencia':
            const tdDias = document.createElement('td')
            const inpDias = document.createElement('input')
            inpDias.type = 'number'
            inpDias.placeholder ='Frec en dias'
            inpDias.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'frecuenciaDias')
            tdDias.appendChild(inpDias)
            tr.appendChild(tdDias)
            break
        case 'Proceso':
            const tdsiglas = document.createElement('td')
            const inpSiglas = document.createElement('input')
            inpSiglas.type = 'text'
            inpSiglas.placeholder ='Siglas del proceso'
            inpSiglas.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'siglasProceso')
            tdsiglas.appendChild(inpSiglas)
            tr.appendChild(tdsiglas)
            break
        case 'Clasificacion Activo':
            const tdsiglasc = document.createElement('td')
            const inpSiglasc = document.createElement('input')
            inpSiglasc.type = 'text'
            inpSiglasc.placeholder ='Siglas del proceso'
            inpSiglasc.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'siglasClasificacion)')
            tdsiglasc.appendChild(inpSiglasc)
            tr.appendChild(tdsiglasc)
            break
        default:
            break
    }
    tr.appendChild(tdEstado)
    tr.appendChild(tdBotones)
    tbody.insertBefore(tr, tbody.firstChild)
    return botonCrear
}

const habilitarNuevoProveedor = (e) => {
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const nombre = boton.getAttribute('nombre')
    const divProveedor = boton.parentNode.nextElementSibling
    const idProveedor = divProveedor.querySelector('.idProveedor')
    const nitProveedor = divProveedor.querySelector('.nitProveedor')
    const dvProveedor = divProveedor.querySelector('.dvProveedor')
    const razonProveedor = divProveedor.querySelector('.razonProveedor')
    const nombreProveedor = divProveedor.querySelector('.nombreProveedor')
    const contactoProveedor = divProveedor.querySelector('.contactoProveedor')
    const telefonosProveedor = divProveedor.querySelector('.telefonosProveedor')
    const direccionProveedor = divProveedor.querySelector('.direccionProveedor')
    const estadoProveedor = divProveedor.querySelector('.estadoProveedor')
    const descripcionProveedor = divProveedor.querySelector('.descripcionProveedor')

    idProveedor.value = ''
    nitProveedor.value = ''
    dvProveedor.value = ''
    razonProveedor.value = ''
    razonProveedor.placeholder = 'Ingrese la razon social del proveedor como aparece en el Rut'
    nombreProveedor.value = ''
    nombreProveedor.placeholder = 'Ingrese el nombre comercial del proveedor'
    contactoProveedor.value = ''
    nombreProveedor.placeholder = 'Ingrese el nombre de la persona de contacto del proveedor'
    telefonosProveedor.value = ''
    direccionProveedor.value = ''
    estadoProveedor.value = 'Activo'
    estadoProveedor.readOnly = true
    descripcionProveedor.value = ''
    descripcionProveedor.placeholder = 'Describa o liste los productos o servicios que brinda este proveedor'
    const gridBortones = document.createElement('div')
    gridBortones.classList.add('col-4', 'align-self-center')
    const contenedorBotones = document.createElement('div')
    contenedorBotones.classList.add('d-flex', 'justify-content-center')
    const botonCrear = document.createElement('button')
    botonCrear.classList.add('btn', 'mt-0', 'pt-0')
    botonCrear.type = 'button'
    botonCrear.title = 'Crear ' + nombre
    const iCrear = document.createElement('i')
    iCrear.classList.add('bi', 'bi-check-square-fill', 'fs-1', 'text-success')
    botonCrear.appendChild(iCrear)
    contenedorBotones.appendChild(botonCrear)
    gridBortones.appendChild(contenedorBotones)
    divProveedor.appendChild(gridBortones)

    return botonCrear
}

export { agregarLinea, habilitarNuevoProveedor }