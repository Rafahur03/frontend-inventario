const { ipcRenderer } = require('electron')
import { modalMensaje } from "../../helpers/modalEleccion.js";
import { descargarInformeSolicitudesMtto } from "../../informes/descargarInformeSolicitudesMtto.js";

const InformeSolicitudes = () => {

    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">                          
                <div class="row  justify-content-center mx-2 contenedorfiltros">
                    <h3 class="text-center mt-1 mb-3 fw-bold">Informe Solicitudes De Mantenimiento</h3>
                     <div class="col-8">
                     <h4 class="text-center mt-1 mb-3 fw-bold">Seleccione los Activos Que Desee</h4>                  
                        <div class="row">
                            <div class="d-inline clasificacion col-7">
                                <h5 class="text-center mt-1 mb-3 fw-bold">Clasificacion Activos</h5> 
                                <div class="form-check form-switch my-2">
                                    <input class="form-check-input checkTodosClasificacion" type="checkbox" siglas="TD">
                                    <label class="form-check-label" for="checkTodosClasificacion">Incluir todos</label>
                                </div>
                            </div>
                            <div class="d-inline AñoClasificacion col-5">
                                <h5 class="text-center mt-1 mb-3 fw-bold">Periodo</h5> 
                                <div class= "mr-2">
                                    <label for="fechaInicialSolicitud">Fecha Inical</label>
                                    <input type="date" class="form-control my-1 fechaInicialSolicitud">
                                </div>
                                <div class= "ms-2">
                                    <label for="fechaFinalSolicitud">Fecha Final</label>
                                    <input type="date" class="form-control my-1 fechaFinalSolicitud">
                                </div>      
                            </div>                           
                        </div>
                    </div>
                    <div class=" col-4">
                        <h5 class="text-center mt-1 mb-3 fw-bold">Generar informe</h5> 
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <div class="d-inline">
                                <button type="button" class="btn mt-0 mx-5 pt-0 informeSolicitudesExcel" title="Informe Solicitudes de Mtto en EXCEL" tipo="excel">
                                    <i class="bi bi-file-earmark-spreadsheet-fill fs-1 text-success"> EXCEL</i> 
                                </button>
                            </div>    
                        </div>                                            
                    </div>
                    </div>
                </div>
            </form>
        </div>
    `

    const listadoClasificacion = ipcRenderer.sendSync('datalist', 'clasificacionActivos')
    if (listadoClasificacion.msg) return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudo consultar el listado de filtros' })


    const clasificacion = seccion.querySelector('.clasificacion')
    const todosClasificacion = seccion.querySelector('.checkTodosClasificacion')
    const estadoClasificacion = []
    listadoClasificacion.forEach((element, index) => {
        const contenedor = document.createElement('div')
        contenedor.classList.add('form-check', 'form-switch', 'my-2')
        const inputcheck = document.createElement('input')
        inputcheck.classList.add('form-check-input')
        inputcheck.type = 'checkbox'
        inputcheck.setAttribute('siglas', element.siglas)
        inputcheck.checked = false
        estadoClasificacion[index] = false
        inputcheck.onchange = e => {
            estadoClasificacion[index] = e.target.checked
            if (estadoClasificacion.some(item => item === false)) {
                todosClasificacion.checked = false
            } else {
                todosClasificacion.checked = true
            }
        }
        const label = document.createElement('label')
        label.classList.add('orm-check-label')
        label.textContent = element.siglas + ' - ' + element.nombre
        contenedor.appendChild(inputcheck)
        contenedor.appendChild(label)
        clasificacion.appendChild(contenedor)
    });

    const inputsClasificacion = clasificacion.querySelectorAll('input')
    todosClasificacion.onchange = e => {
        if (!e.target.checked) return
        const inputsarray = Array.from(inputsClasificacion)
        inputsarray.forEach((input, index) => {
            input.checked = true
            estadoClasificacion[index] = true
        })

    }

    const informeSolicitudesExcel = seccion.querySelector('.informeSolicitudesExcel')
    informeSolicitudesExcel.onclick = e => descargarInformeSolicitudesMtto(seccion)


    return seccion
}

export {
    InformeSolicitudes,
}
