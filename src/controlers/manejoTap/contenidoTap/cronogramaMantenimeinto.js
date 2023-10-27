const { ipcRenderer } = require('electron')
import { descargarCronograma } from '../../informes/cronogramaMtto.js';
const cronogramaMantenimiento = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">                          
                <div class="row  justify-content-center mx-2 contenedorfiltros">
                    <h3 class="text-center mt-1 mb-3 fw-bold">Cronograma de Mantenimiento</h3>                              
                    <div class="col-6">
                    <h4 class="text-center mt-1 mb-3 fw-bold">Seleccione los Activos y el año</h4>
                        <div class="row">
                            <div class="d-inline clasificacion col-9">
                                <h5 class="text-center mt-1 mb-3 fw-bold">Clasificacion Activos</h5> 
                                <div class="form-check form-switch my-2">
                                    <input class="form-check-input checkTodosClasificacion" type="checkbox" siglas="TD">
                                    <label class="form-check-label" for="checkTodosClasificacion">Incluir todos</label>
                                </div>
                            </div>
                            <div class="d-inline AñoClasificacion col-3">
                                <h5 class="text-center mt-1 mb-3 fw-bold">Año</h5>
                                <select class="form-select selectYear" aria-label="Select Año">
                                    <option selected>Seleccione un año</option>
                                </select>
                            </div>                           
                        </div>
                    </div>
                        
                    <div class=" col-6">
                        <h5 class="text-center mt-1 mb-3 fw-bold">Generar informe</h5> 
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <div class="d-inline tipoActivos">
                           
                                <button type="button" class="btn mt-0 mx-5 pt-0 cronogramaPdf" title="Cronograma en PDF" tipo="pdf"> 
                                     <i class="bi bi-file-earmark-pdf-fill fs-1 text-primary">PDF</i>
                                </button>

                                <button type="button" class="btn mt-0 mx-5 pt-0 cronogramaExcel" title="Cronograma en EXCEL" tipo="excel">
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

    const selectYear = seccion.querySelector('.selectYear')
    let year = 2023
    for (let i = 0; i < 101; i++) {
        const opcion = document.createElement('option')
        opcion.value = year + i
        opcion.textContent = year + i
        selectYear.appendChild(opcion)
    }

    const cronogramaPdf = seccion.querySelector('.cronogramaPdf')
    const cronogramaExcel = seccion.querySelector('.cronogramaExcel')
    cronogramaPdf.onclick = e  => descargarCronograma(e, seccion)
    cronogramaExcel.onclick = e  => descargarCronograma(e, seccion)
    return seccion
}

export {
    cronogramaMantenimiento,
}
