import { eliminarComponente } from "./eliminarComponente.js"
const guardarComponente = e => {
    const tagName = e.target.tagName.toLowerCase()
    let tr
    let activo
    if (tagName === 'i') {
        const button = e.target.parentNode
        tr = button.parentNode.parentNode
        activo = button.getAttribute('activo')
    } else {
        tr = e.target.parentNode.parentNode
        activo = e.target.getAttribute('activo')
    }
    /// realizar la peticion de gudardar componente

    // cargar los datos en el tr
    const tdList = tr.querySelectorAll('td')
    const componente = {
        capacidad: "256 Gb",
        componenteId: 1,
        estadoId: 1,
        id: 2,
        marca: "Cotecna",
        marcaId: 20,
        modelo: "jlffloffkkskss",
        nombre: "Disco Duro",
        serie: "fsvdvdsds"
    }
    const orden = {
        0: 'id',
        1: 'nombre',
        2: 'marca',
        3: 'modelo',
        4: 'serie',
        5: 'capacidad'
    }
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
            bottonEliminar.onclick = e => eliminarComponente(e)
            tr.appendChild(element)
        }
    };   
}

export {
    guardarComponente
}