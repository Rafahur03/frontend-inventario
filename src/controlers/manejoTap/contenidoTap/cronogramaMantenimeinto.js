const { ipcRenderer } = require('electron')

const cronogramaMantenimiento = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">                          
                <div class="row  justify-content-center mx-2 contenedorfiltros">
                    <h3 class="text-center mt-1 mb-3 fw-bold">Cronograma de Mantenimiento</h3>
                    <h4 class="text-center mt-1 mb-3 fw-bold">Selecciones los Filtros Que Desee Realziar</h4>
                                       
                    <div class="col-6">
                        <h5 class="text-center mt-1 mb-3 fw-bold">Clasificacion Activos</h5> 
                        <div class="d-flex flex-column justify-content-center align-items-center clasificacion">
                            <div class="form-check form-switch my-2">
                                <input class="form-check-input checkTodosClasificacion" type="checkbox" checked>
                                <label class="form-check-label" for="checkTodosClasificacion">Incluir todos</label>
                            </div>

                        </div>
                    </div>
                        
                    <div class=" col-6">
                        <h5 class="text-center mt-1 mb-3 fw-bold">Tipos de activos</h5> 
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <div class="form-check form-switch my-2">
                                <input class="form-check-input checkTodosTipoActivo" type="checkbox" checked>
                                <label class="form-check-label" for="checkUsuarios">Incluir todos</label>
                            </div>
                            <div class="form-check form-switch my-2">
                                <input class="form-check-input checkActivos" type="checkbox">
                                <label class="form-check-label" for="checkActivos">Crear, Editar Activos</label>
                            </div>  
                            <div class="form-check form-switch my-2">
                                <input class="form-check-input checkActivos" type="checkbox">
                                <label class="form-check-label" for="checkActivos">Crear, Editar Activos</label>
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
    const listadoTipo = ipcRenderer.sendSync('datalist', 'clasificacionActivos')
    if (listadoTipo.msg) return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudo consultar el listado de filtros' })
    console.log(listadoClasificacion)
    console.log(listadoTipo)
    const clasificacion = seccion.querySelector('.clasificacion')
    listadoClasificacion.forEach(element => {
        const contenedor = document.createElement('div')
        contenedor.classList.add('form-check', 'form-switch', 'my-2')
        const inputcheck = document.createElement('input')
        inputcheck.classList.add('form-check-input')
        inputcheck.type = 'checkbox'
        inputcheck.id = element.siglas
        const label = document.createElement('label')
        label.classList.add('orm-check-label')
        label.textContent = element.siglas + ' - ' + element.nombre
        contenedor.appendChild(inputcheck)
        contenedor.appendChild(label)
        clasificacion.appendChild(contenedor)
    });

    // const clasificacion = seccion.querySelector('.clasificacion')
    // listadoClasificacion.forEach(element => {
    //     const contenedor = document.createElement('div')
    //     contenedor.classList.add('form-check', 'form-switch', 'my-2')
    //     const inputcheck = document.createElement('input')
    //     inputcheck.classList.add('form-check-input')
    //     inputcheck.type = 'checkbox'
    //     inputcheck.id = element.siglas
    //     const label = document.createElement('label')
    //     label.classList.add('orm-check-label')
    //     label.textContent = element.siglas + ' - ' + element.nombre
    //     contenedor.appendChild(inputcheck)
    //     contenedor.appendChild(label)
    //     clasificacion.appendChild(contenedor)
    // });

    return seccion
}

export {
    cronogramaMantenimiento,
}
