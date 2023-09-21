import { generateRandomId } from "../nombreRandon.js"

const agregarLinea = (e)=>{
    const tagName = e.target.tagName.toLowerCase()
        let boton
        if (tagName === 'i') {
            boton = e.target.parentNode
        } else {
            boton = e.target
        }
        const nombre = boton.getAttribute('nombre')
        const table = boton.parentNode.nextElementSibling   
        const tbody= table.querySelector('tbody')
        const tr= document.createElement('tr')
        const tdId= document.createElement('td')
        const inpiId= document.createElement('input')
        const idrandon = generateRandomId()
        inpiId.type = 'text'
        inpiId.value = 'crear'
        inpiId.readOnly = true
        inpiId.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'idArea')
        tdId.appendChild(inpiId)
        const tdNombre = document.createElement('td')
        const inpNombre= document.createElement('input')
        inpNombre.type = 'text'
        inpNombre.placeholder = 'Nombre del area'
        inpNombre.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'nombre'+ nombre)
        tdNombre.appendChild(inpNombre)
        const tdEstado = document.createElement('td')        
        const inpEstado= document.createElement('input')
        inpEstado.type = 'text'
        inpEstado.value = 'Activo'
        inpEstado.readOnly = true
        inpEstado.classList.add('border', 'border-secondary', 'bg-light', 'border-l', 'border-opacity-25', 'rounded-3', 'fs-5', 'estado' + nombre)
        tdEstado.appendChild(inpEstado)
        const tdBotones = document.createElement('td')
        const botonCrear = document.createElement('button')
        botonCrear.classList.add('btn', 'mt-0', 'pt-0')
        botonCrear.type= 'button'
        botonCrear.title = 'Crear '+ nombre
        botonCrear.setAttribute('idtr', idrandon)
        const iCrear = document.createElement('i')
        iCrear.classList.add('bi', 'bi-check-square-fill', 'fs-1', 'text-success')
        botonCrear.appendChild(iCrear)
        tdBotones.appendChild(botonCrear)
        tr.id = idrandon
        tr.appendChild(tdId)
        tr.appendChild(tdNombre)
        tr.appendChild(tdEstado)
        tr.appendChild(tdBotones)
        tbody.insertBefore(tr, tbody.firstChild)
        return botonCrear
}

export {agregarLinea}