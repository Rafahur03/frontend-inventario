import { modalMensaje } from "../modalEleccion.js"

const opcionId = e => {

    const input = e.target
    if (input.value.trim() == '') return modalMensaje({ titulo: 'ERROR', mensaje: 'No ha seleccionado ninguna opcion' })

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

    let encontradoInput = true
    for (let opcion of opciones) {
        if (input.value.includes('--')) {// EVALUA SI EL VALOR INGRESADO VIENE SEPARADO POR -- O -
            if (opcion.value === input.value.trim()) { // EVAKUA SI EL VALOR INGRESADO ES IGUAL A EL VALOR DE UNA OPCION 
                if (opcion.textContent !== opcionId) { // EVALUA SI EL VALOR DEL OPCION ID ES IGUAL A EL ID DE LA OPCION SELECCIONADA
                    // SI NO ES IGUAL ASIGNA UN NUEVO OPCON ID Y SALE 
                    input.setAttribute('opcionId', complemento + '-' + opcion.textContent);
                    encontradoInput = false               
                    break
                }else{
                    encontradoInput = false 
                }
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
                    encontradoInput = false
                    break
                } else {
                    encontradoInput = false
                }
            }
        }
    }

    if (encontradoInput) modalMensaje({ titulo: 'ERROR', mensaje: 'Debe seleccionar una opcion de la lista' })
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

    if (opcionId === input.value) return false
    let encontrado = false
    for (let opcion of opciones) {
        if (opcion.value === input.value) {
            input.setAttribute('opcionId', opcion.value)
            encontrado = true
            return true
        }
    }

    if (!encontrado) {
        modalMensaje({ titulo: 'ERROR', mensaje: 'No ha seleccionado un activo valido' })
        return false
    }

    return true

}

export {
    opcionId,
    opcionIdAct
}