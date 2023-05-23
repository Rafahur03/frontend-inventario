const { ipcRenderer } = require('electron')
import { generateRandomId } from "../helpers/nombreRandon.js"
import { eliminarLineaComponente } from "./eliminarLineaComponente.js"
import { guardarComponente } from "./guardarComponente.js"
import { modalMensaje } from "../helpers/modalEleccion.js"


const agregarComponente = e => {
    const componentes = ipcRenderer.sendSync('datalist', 'listaComponentes');
    if (componentes.msg) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje:'No se pudo cargar el listado de componentes, Intente crear el componente mas tarde'
        }
        modalMensaje(mensaje)
        return
    }

    const marcas = ipcRenderer.sendSync('datalist', 'marca');
    if (marcas.msg) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje:'No se pudo cargar las marcas, Intente crear el componente mas tarde'
        }
        modalMensaje(mensaje)
        return
    }
    const tagName = e.target.tagName.toLowerCase()
    let activo
    let tbodyComponente
    if (tagName === 'i') {
        const button = e.target.parentNode
        const tablaComponente = button.parentNode.previousElementSibling
        tbodyComponente = tablaComponente.querySelector('tbody')
        activo = button.getAttribute('activo')
    } else {
        const tablaComponente = e.target.parentNode.previousElementSibling
        tbodyComponente = tablaComponente.querySelector('tbody')
        activo = e.target.getAttribute('activo')
    }

    const tr = document.createElement('tr')

    const tdId = document.createElement('td')
    const tdcomponente = document.createElement('td')
    const tdmarca = document.createElement('td')
    const tdmodelo = document.createElement('td')
    const tdSerie = document.createElement('td')
    const tdcapacidad = document.createElement('td')
    const tdAcciones = document.createElement('td')

    const btnGuardar = document.createElement('button')
    const iGuardar = document.createElement('i')
    const btnEliminar = document.createElement('button')
    const iEliminar = document.createElement('i')

    const inputComponente = document.createElement('input')
    const listComponente = document.createElement('datalist')
    const inputMarca = document.createElement('input')
    const listMarca = document.createElement('datalist')
    const inputModelo = document.createElement('input')
    const inputSerie = document.createElement('input')
    const inputCapacidad = document.createElement('input')
    const datalistComponenteid = generateRandomId()
    const datalistMarcaid = generateRandomId()

    inputComponente.type = 'text'
    inputMarca.type = 'text'
    inputModelo.type = 'text'
    inputSerie.type = 'text'
    inputCapacidad.type = 'text'
    inputComponente.classList.add('form-control', 'my-1', 'fw-bold', 'nombrecomponente')
    inputComponente.setAttribute('list', `compo${datalistComponenteid}`)
    listComponente.id = `compo${datalistComponenteid}`
    inputMarca.classList.add('form-control', 'my-1', 'fw-bold', 'marcaComponente')
    inputMarca.setAttribute('list', `marca${datalistMarcaid}`)
    listMarca.id = `marca${datalistMarcaid}`
    inputModelo.classList.add('form-control', 'my-1', 'fw-bold', 'modeloComponente')
    inputSerie.classList.add('form-control', 'my-1', 'fw-bold', 'serieComponente')
    inputCapacidad.classList.add('form-control', 'my-1', 'fw-bold', 'capacidadComponente')


    tdcomponente.appendChild(inputComponente)
    tdcomponente.appendChild(listComponente)
    tdmarca.appendChild(inputMarca)
    tdmarca.appendChild(listMarca)
    tdmodelo.appendChild(inputModelo)
    tdSerie.appendChild(inputSerie)
    tdcapacidad.appendChild(inputCapacidad)


    tr.appendChild(tdId)
    tr.appendChild(tdcomponente)
    tr.appendChild(tdmarca)
    tr.appendChild(tdmodelo)
    tr.appendChild(tdSerie)
    tr.appendChild(tdcapacidad)


    // botones de guardar de compnentes
    tdAcciones.classList.add('d-flex', 'flex-row')
    iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-5')
    btnGuardar.setAttribute('activo', activo)
    btnGuardar.classList.add('btn', 'guardarComponente')
    btnGuardar.type = 'button'
    btnGuardar.appendChild(iGuardar)
    btnGuardar.onclick = e => guardarComponente(e)
    tdAcciones.appendChild(btnGuardar)
    // btn eliminar linea agregada
    iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-5')
    btnEliminar.classList.add('btn', 'eliminarFilaComponente')
    btnEliminar.type = 'button'
    btnEliminar.appendChild(iEliminar)
    btnEliminar.onclick = e => eliminarLineaComponente(e)
    tdAcciones.appendChild(btnEliminar)
    tr.appendChild(tdAcciones)

    componentes.forEach(componente => {
        const item = document.createElement('option')
        item.classList.add('bd-highlight', 'd-block', 'm-1')
        item.value = componente.componente.trim()
        item.textContent = componente.id
        listComponente.appendChild(item)
    });
    
    marcas.forEach(marca => {
        const item = document.createElement('option')
        item.classList.add('bd-highlight', 'd-block', 'm-1')
        item.value = marca.marca.trim()
        item.textContent = marca.id
        listMarca.appendChild(item)
    });

    // creamos la fila en la tabla
    tbodyComponente.appendChild(tr)
}

export {
    agregarComponente
}