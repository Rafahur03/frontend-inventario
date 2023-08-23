import { modalMensaje } from "../modalEleccion.js"

const opcionId = e => {

    const input = e.target
    if (input.value.trim() == '') {
        return modalMensaje({ titulo: 'ERROR', mensaje: 'No ha seleccionado ninguna opcion' })
    }
    const idLista = input.getAttribute('list')
    const lista = document.querySelector('#' + idLista)
    const opciones = lista.querySelectorAll('option')
    const opcionId = input.getAttribute('opcionId').split('-')[1]
    const complemento = input.getAttribute('opcionId').split('-')[0]

    let inputnit
    if (complemento === 'Pro') {
        const contenedorInputProveedor = input.parentNode
        const contendorInputNit = contenedorInputProveedor.nextSibling.nextSibling
        inputnit = contendorInputNit.querySelector('input')
    }

    for (let opcion of opciones) {
        if (input.value.includes('--')) {
            if (opcion.value === input.value) {
                if (opcion.textContent !== opcionId) {
                    input.setAttribute('opcionId', complemento + '-' + opcion.textContent);
                    if (complemento === 'Pro') {
                        inputnit.value = opcion.value.split('--')[2].trim();
                    }
                }
                break
            }
        } else {
            let opcionvalor
            if (opcion.value.includes('--')) {
                opcionvalor = opcion.value.split('--')[1].trim();
            } else {
                opcionvalor = opcion.value
            }
            if (opcionvalor === input.value) {
                if (opcion.textContent !== opcionId) {
                    input.setAttribute('opcionId', complemento + '-' + opcion.textContent);
                    if (opcion.textContent !== opcionId) {
                        input.setAttribute('opcionId', complemento + '-' + opcion.textContent);
                        if (complemento === 'Pro') {
                            inputnit.value = opcion.value.split('--')[2].trim();
                        }
                    }
                }
                break
            }
        }
    }
}

const opcionIdAct = e => {

    const input = e.target
    if (input.value.trim() == '') {
        modalMensaje({ titulo: 'ERROR', mensaje: 'No ha seleccionado ninguna opcion' })
        return false
    }
    const idLista = input.getAttribute('list')
    const lista = document.querySelector('#' + idLista)
    const opciones = lista.querySelectorAll('option')
    const opcionId = input.getAttribute('opcionId')

    if(opcionId === input.value) return false
    let encontrado = false
    for (let opcion of opciones) {  
        if(opcion.value === input.value){
            input.setAttribute('opcionId', opcion.value)
            encontrado = true
            return true
        }
    }

    if(!encontrado) {  
        modalMensaje({ titulo: 'ERROR', mensaje: 'No ha seleccionado un activo valido' })
        return false
    }

    return true
    
}

export {
    opcionId,
    opcionIdAct
}