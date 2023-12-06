import { cargarTapContenido } from "../cargarTapContenido.js";
import { agregarTap } from "../agregarTap.js";
const menu = (vector) => {
    const nuevaTap = document.querySelector('#nueva-tap')
    vector.forEach(element => {
        const divUsuario = document.querySelectorAll('#collapseUsuario a')
        const divActivo = document.querySelectorAll('#collapseActivos a')
        const divReporte = document.querySelectorAll('#collapseReporte a')
        const divInforme = document.querySelector('#collapseInformes')
        const cerrarmenu = document.querySelector('#cerrarNavBar')
        switch (element) {
            case 1:
                const uCrear = document.createElement('a')
                uCrear.setAttribute('href', '#')
                uCrear.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                uCrear.id = 'nuevoUsuario'
                uCrear.textContent = 'Nuevo Usuario'
                uCrear.onclick = async e => {
                    await agregarTap(nuevaTap, e.target.id)
                    cerrarmenu.click()
                    await cargarTapContenido(e.target.id)
                }
                divUsuario[0].parentElement.insertBefore(uCrear, divUsuario[0])

                const uEditar = document.createElement('a')
                uEditar.setAttribute('href', '#')
                uEditar.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                uEditar.id = 'editarUsuario'
                uEditar.textContent = 'Editar Usuario'
                uEditar.onclick = async e => {
                    await agregarTap(nuevaTap, e.target.id)
                    cerrarmenu.click()
                    await cargarTapContenido(e.target.id)
                }
                if (divUsuario.length > 1) {
                    divUsuario[1].parentElement.insertBefore(uEditar, divUsuario[1])
                } else {
                    divUsuario[0].parentElement.insertBefore(uEditar, divUsuario[0])
                }
                break;
            case 2:
                const iCrear = document.createElement('a')
                iCrear.setAttribute('href', '#')
                iCrear.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                iCrear.id = 'listadoCosteado'
                iCrear.textContent = 'Informe listado Activo costeado'
                iCrear.onclick = async e => {
                    await agregarTap(nuevaTap, e.target.id)
                    cerrarmenu.click()
                    await cargarTapContenido(e.target.id)
                }
                divInforme.appendChild(iCrear)
                const iaCrear = document.createElement('a')
                iaCrear.setAttribute('href', '#')
                iaCrear.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                iaCrear.id = 'activoCosteado'
                iaCrear.textContent = 'Informe por activo costeado'
                iaCrear.onclick = async e => {
                    await agregarTap(nuevaTap, e.target.id)
                    cerrarmenu.click()
                    await cargarTapContenido(e.target.id)
                }
                divInforme.appendChild(iaCrear)
                break;

            case 3:
                const aCrear = document.createElement('a')
                aCrear.setAttribute('href', '#')
                aCrear.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                aCrear.id = 'crearActivo'
                aCrear.textContent = 'Crear Activo'
                aCrear.onclick = async e => {
                    await agregarTap(nuevaTap, e.target.id)
                    cerrarmenu.click()
                    await cargarTapContenido(e.target.id)
                }
                divActivo[0].parentElement.appendChild(aCrear)
                break;
            case 6:
                const rCrear = document.createElement('a')
                rCrear.setAttribute('href', '#')
                rCrear.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                rCrear.id = 'crearReporteMttoPreventivo'
                rCrear.textContent = 'Crear Reporte preventivo'
                rCrear.onclick = async e => {
                    await agregarTap(nuevaTap, e.target.id)
                    cerrarmenu.click()
                    await cargarTapContenido(e.target.id)
                }
                divReporte[0].parentElement.insertBefore(rCrear, divReporte[1])
                break;
            default:
                break;
        }

    });
}

export { menu }