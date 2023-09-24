import { opcionId } from "./activos/listasId.js"
import { editarProveedor } from "../tablasConfig/editarConfig.js"

const filtroBusqueda = (e) => {
    const tapActiva = document.querySelector('#TabContent').querySelector('.active')
    const tablaTr = tapActiva.querySelector('tbody').querySelectorAll('tr')
    tablaTr.forEach(tr => {
        if (tr.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1) {
            tr.classList.add('d-none')
        } else {
            tr.classList.remove('d-none')

        }
    })
}

const filtroBusquedaTablas = (e) => {
    const id = e.target.getAttribute('tabla')
    const tbody = document.querySelector('#' + id)
    const tablaTr = tbody.querySelectorAll('tr')
    tablaTr.forEach(tr => {
        const inputs = tr.querySelectorAll('input')
        const values = Array.from(inputs).map(input => { return input.value })
        const valores = values.join(' ')
        if (valores.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1) {
            tr.classList.add('d-none')
        } else {
            tr.classList.remove('d-none')
        }
    })
}



const filtroBusquedaProveedor = (e) => {
    const valor = e.target.value.toLowerCase()
    const datalist = Array.from(e.target.nextElementSibling.querySelectorAll('option'))
    const posicion = datalist.findIndex((element) => element.value.toLowerCase() === valor)
    if (posicion == -1) return
    const datos = datalist[posicion].value.split('--')
    const datosProveedor = document.querySelector('#datosProveedor')
    const idProveedor = datosProveedor.querySelector('.idProveedor')
    const nitProveedor = datosProveedor.querySelector('.nitProveedor')
    const dvProveedor = datosProveedor.querySelector('.dvProveedor')
    const razonProveedor = datosProveedor.querySelector('.razonProveedor')
    const nombreProveedor = datosProveedor.querySelector('.nombreProveedor')
    const contactoProveedor = datosProveedor.querySelector('.contactoProveedor')
    const telefonosProveedor = datosProveedor.querySelector('.telefonosProveedor')
    const direccionProveedor = datosProveedor.querySelector('.direccionProveedor')
    const estadoProveedor = datosProveedor.querySelector('.estadoProveedor')
    const descripcionProveedor = datosProveedor.querySelector('.descripcionProveedor')
    idProveedor.value = datos[0]
    nitProveedor.value = datos[3]
    dvProveedor.value = datos[4]
    razonProveedor.value = datos[2]
    nombreProveedor.value = datos[1]
    contactoProveedor.value = datos[5]
    telefonosProveedor.value = datos[6]
    direccionProveedor.value = datos[7]
    estadoProveedor.value = datos[9]
    descripcionProveedor.value = datos[8]
    if (datos.length === 11) {
        estadoProveedor.setAttribute('opcionId', datos[10])
        idProveedor.readOnly= false
        nitProveedor.readOnly= false
        dvProveedor.readOnly= false
        razonProveedor.readOnly= false
        nombreProveedor.readOnly= false
        contactoProveedor.readOnly= false
        telefonosProveedor.readOnly= false
        direccionProveedor.readOnly= false
        estadoProveedor.readOnly= false
        descripcionProveedor.readOnly= false
        estadoProveedor.onblur = e=>{opcionId(e)}
    }
    e.target.value =''
    const existeBotonCrear = datosProveedor.querySelector('.gridBotonesCrear')
    if(existeBotonCrear !== null)  existeBotonCrear.parentElement.removeChild(existeBotonCrear)
    const existeBotonEditar = datosProveedor.querySelector('.gridBotonesEditar')
    if(existeBotonEditar !== null) return 
    const gridBortones = document.createElement('div')
    gridBortones.classList.add('col-4', 'align-self-center', 'gridBotonesEditar')
    const contenedorBotones = document.createElement('div')
    contenedorBotones.classList.add('d-flex', 'justify-content-center')
    const botonCrear = document.createElement('button')
    botonCrear.classList.add('btn', 'mt-0', 'pt-0')
    botonCrear.type = 'button'
    botonCrear.title = 'Editar Proveedor'
    const iCrear = document.createElement('i')
    iCrear.classList.add('bi', 'bi-save2-fill', 'fs-1', 'text-warning')
    botonCrear.appendChild(iCrear)
    botonCrear.onclick = e =>{editarProveedor(e)}
    contenedorBotones.appendChild(botonCrear)
    gridBortones.appendChild(contenedorBotones)
    datosProveedor.appendChild(gridBortones)
    

}

export { filtroBusqueda, filtroBusquedaTablas, filtroBusquedaProveedor } 