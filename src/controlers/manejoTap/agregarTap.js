import { generateRandomId } from "../helpers/nombreRandon.js"
const agregarTap = nodo => {

    // creamos un nombre aleatorio para el tap
    const id = generateRandomId()
    // creamos un nuevo li agregamos las clases atributos y contenido
    const nuevaTap = document.createElement('li')
    nuevaTap.classList.add('nav-item', id)
    nuevaTap.role = 'presentation'
    nuevaTap.innerHTML = `         
                <button class="nav-link active" id="${id}-tab" data-bs-toggle="tab" data-bs-target="#${id}"
                type="button" role="tab" aria-controls="${id}" aria-selected="false">newTap <span class="fw-bold text-danger ms-2 cerrar-tap" id="${id}-cerrar" data-bs-dismiss="tab" aria-label="Close"> X</span></button>
    `

    // creamos el contenedor del contenido de la nueva pestaña vacia sera llenado despues al seleccioanr el menu
    const contenidoTAP = document.createElement('div')
    contenidoTAP.classList.add('tab-pane', 'fade', 'show', 'active')
    contenidoTAP.id = id
    contenidoTAP.role = 'tabpanel'
    // agregamos la nueva pestaña ya activa
    const tapActiva = nodo.parentNode.querySelector('.active')
    if (tapActiva !== null) tapActiva.classList.remove('active')
    nodo.parentNode.insertBefore(nuevaTap, nodo)
    //agregamos el contenedor del contenido de la pestaña
    // desactivamos el contenedor actiovo para mostrar el ya creado
    const nodoactivo = nodo.parentNode.nextSibling.nextSibling.querySelector('.active')
    if (nodoactivo !== null) nodoactivo.classList.remove('active')
    nodo.parentNode.nextSibling.nextSibling.appendChild(contenidoTAP)

    return contenidoTAP
}

export {
    agregarTap
}