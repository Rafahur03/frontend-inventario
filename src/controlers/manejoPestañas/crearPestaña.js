const agregartap = nodo => {

    // creamos un nombre aleatorio para el tap
    const id = generateRandomId()
    // creamos un nuevo li agregamos las clases atributos y contenido
    const nuevaTap = document.createElement('li')
    nuevaTap.classList.add('nav-item', id)
    nuevaTap.role = 'presentation'
    nuevaTap.innerHTML = `         
                <button class="nav-link active" id="${id}contact-tab" data-bs-toggle="tab" data-bs-target="#${id}"
                type="button" role="tab" aria-controls="${id}" aria-selected="false">newTap <span class="fw-bold text-danger ms-2 cerrar-tap" id="${id}-cerrar" data-bs-dismiss="tab" aria-label="Close"> X</span></button>
    `

    // creamos el contenedor del contenido de la nueva pestaña vacia sera llenado despues al seleccioanr el menu
    const contenidoTAP = document.createElement('div')
    contenidoTAP.classList.add('tab-pane', 'fade', 'show', 'active', 'h-100')
    contenidoTAP.id = id
    contenidoTAP.role = 'tabpanel'
    contenidoTAP.innerHTML = `
            <p>creaste una nueva tap</p>    
    `
    // agregamos la nueva pestaña ya activa
    const tapActiva = nodo.parentNode.querySelector('.active')
    tapActiva.classList.remove('active')
    nodo.parentNode.insertBefore(nuevaTap, nodo)
        //agregamos el contenedor del contenido de la pestaña
    nodo.parentNode.nextSibling.nextSibling.appendChild(contenidoTAP)
    // desactivamos el contenedor actiovo para mostrar el ya creado
    const nodoactivo= nodo.parentNode.nextSibling.nextSibling.querySelector('.active')
    nodoactivo.classList.remove('active')
}

function generateRandomId() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export {
    agregartap
}