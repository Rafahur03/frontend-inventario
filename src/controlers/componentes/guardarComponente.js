const { ipcRenderer } = require('electron')
import { eliminarComponente } from "./eliminarComponente.js"
import { modalMensaje } from "../helpers/modalEleccion.js"

const guardarComponente = e => {
    const tagName = e.target.tagName.toLowerCase()
    let tr
    let idActivo = null
    if (tagName === 'i') {
        const button = e.target.parentNode
        tr = button.parentNode.parentNode
        idActivo = button.getAttribute('activo')
    } else {
        tr = e.target.parentNode.parentNode
        idActivo = button.getAttribute('activo')
    }

    if (idActivo === null) {
        const mensaje = {
            titulo: 'ERROR',
            mensaje: 'El componente debe estas asociado a un activo'
        }

        modalMensaje(mensaje)
        return
    }

    // cargar los datos en el tr
    const nombre = tr.querySelector('.nombrecomponente')
    const idNombre = nombre.getAttribute('opcionId')
    const marca = tr.querySelector('.marcaComponente')
    const idmarca = marca.getAttribute('opcionId')

    const nuevoComponente = {
        idActivo,
        nombre: nombre.value,
        idNombre,
        marca: marca.value,
        idmarca,
        modelo: tr.querySelector('.modeloComponente').value,
        serie: tr.querySelector('.serieComponente').value,
        capacidad: tr.querySelector('.capacidadComponente').value
    }

    const componente = ipcRenderer.sendSync('guardarComponente', nuevoComponente);

    if(componente.msg){
        const mensaje = {
            titulo: 'ERROR',
            mensaje: componente.msg
        }
        modalMensaje(mensaje)
        return
    }
    
    const orden = {
        0: 'id',
        1: 'nombre',
        2: 'marca',
        3: 'modelo',
        4: 'serie',
        5: 'capacidad'
    }

    const tdList= tr.querySelectorAll('td')

    for (let index = 0; index < tdList.length; index++) {
        const element = tdList[index]

        if (index !== tdList.length - 1) {
            while (element.firstChild) {
                element.removeChild(element.firstChild)
            }
            element.textContent = componente[orden[index]];
            tr.appendChild(element)


        } else {
            element.removeChild(element.firstChild)
            const bottonEliminar = element.querySelector('.eliminarFilaComponente')
            
            bottonEliminar.setAttribute('componente',  `Com-${componente[orden[0]]}`)
            bottonEliminar.setAttribute('activo',  `Act-${componente.idactivo}`)
            bottonEliminar.onclick = e => eliminarComponente(e)
            tr.appendChild(element)
        }
    };   
}

export {
    guardarComponente
}