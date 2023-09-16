import { eliminarProvUsuario } from "./eliminarProveUsuario.js";
import { guardarProveedor } from "./guardarProveedor.js";

const cargarProveedor = (e, nodo) => {

    if (e.target.value.includes('--')) {
        const seleccionarProveedores = nodo.querySelector('.seleccionarProveedores')
        const listID = seleccionarProveedores.getAttribute('list')
        const listProveedores = document.querySelector('#' + listID)
        const opciones = listProveedores.querySelectorAll('option')
        let i = 0;
        while (i < opciones.length) {

            if (opciones[i].value === e.target.value) {
                const tbody = nodo.querySelector('.proveedoresUsuarios')
                const th = document.createElement('th')
                const tdid = document.createElement('td')
                const tdproveedor = document.createElement('td')
                const tdboton = document.createElement('td')
                const trs = tbody.querySelectorAll('tr')

                if (!tbody.innerHTML.includes(opciones[i].textContent)) {
                    const tr = document.createElement('tr')
                    th.setAttribute('scope', 'row')
                    th.textContent = trs.length + 1
                    tdid.textContent = opciones[i].textContent
                    tdproveedor.textContent = opciones[i].value

                    const contenedorBotones = document.createElement('div')
                    const usuarios = nodo.querySelector('.editarUsuario')
                    if (usuarios !== null) {
                        const iGuardar = document.createElement('i')
                        iGuardar.classList.add('bi', 'bi-save2-fill', 'fs-3', 'fw-bold', 'text-primary', 'p-0')
                        const btnGuardar = document.createElement('button')
                        btnGuardar.setAttribute('linea', trs.length)
                        btnGuardar.classList.add('btn', 'text-center', 'm-2', 'p-0')
                        btnGuardar.appendChild(iGuardar)
                        btnGuardar.onclick = e => guardarProveedor(e, nodo)
                        contenedorBotones.appendChild(btnGuardar)
                    }

                    contenedorBotones.classList.add('contenedorbotones', 'd-flex', 'justify-content-center', 'p-0', 'm-0')
                    const iEliminar = document.createElement('i')
                    iEliminar.classList.add('bi', 'bi-trash-fill', 'fs-3', 'fw-bold', 'text-danger', 'p-0')
                    const btnEliminar = document.createElement('button')
                    btnEliminar.setAttribute('linea', trs.length)
                    btnEliminar.setAttribute('opcionId', opciones[i].textContent)
                    btnEliminar.classList.add('btn', 'text-center', 'm-1', 'p-0')
                    btnEliminar.appendChild(iEliminar)
                    btnEliminar.onclick = e => eliminarProvUsuario(e, nodo)
                    contenedorBotones.appendChild(btnEliminar)
                    tdboton.appendChild(contenedorBotones)

                    tr.appendChild(th)
                    tr.appendChild(tdid)
                    tr.appendChild(tdproveedor)
                    tr.appendChild(tdboton)
                    tbody.appendChild(tr)
                }
                e.target.value = ''
                i = opciones.length;
            }
            i++;
        }
    }
}

export {
    cargarProveedor
}