const { ipcRenderer } = require('electron')
import { generateRandomId } from '../../helpers/nombreRandon.js';
import { modalMensaje } from '../../helpers/modalEleccion.js';
const InfactivoCosteado = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">                          
                <div class="row  justify-content-center mx-2 contenedorfiltros">
                    <h3 class="text-center mt-1 mb-3 fw-bold">Infome Por Activo Costeado</h3>
                    <h4 class="text-center mt-1 mb-3 fw-bold">Seleccione Un Activo</h4>
                                       
                    <div class="col-6">
                        <h5 class="text-center mt-1 mb-3 fw-bold">Clasificacion Activos</h5> 
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <div class="row mx-3 align-items-center"> 
                                <div class="form-group col-6">
                                    <label for="idActivo"> Id Activo</label>
                                    <input type="text" class="form-control my-1 fw-bold idActivo" list="listActivo" opcionId="Act--0">
                                    <datalist id="listActivo"></datalist> 

                                    <label for="nombreActivo">Nombre</label>
                                    <input type="text" class="form-control my-1 nombreActivo" readonly>
                                    
                                    <label for=" nombreResponsable">Responsable </label>
                                    <input type="text" class="form-control my-1 nombreResponsable"  readonly>
                                    
                                    <label for="ubicacionActivo">Ubicacion Especifica</label>
                                    <input type="text" class="form-control my-1 ubicacionActivo" readonly>
                                </div>                            
                                <div class="form-group col-6">
                                    
                                    <label for="codigoInterno">Codigo interno</label>
                                    <input type="text" class="form-control my-1  fw-bold codigoInterno">                                  
                                    
                                    <label for="marcaActivo">Marca</label>
                                    <input type="text" class="form-control my-1 marcaActivo"  readonly>
                                
                                    
                                    <label for="serieActivo">Serie</label>
                                    <input type="text" class="form-control my-1 serieActivo"  readonly>
                                   
                                </div>
                            </div>
                       </div>
                    </div>
                        
                    <div class=" col-6">
                        <h5 class="text-center mt-1 mb-3 fw-bold">Generar informe</h5> 
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <div class="d-inline tipoActivos">
                           
                                <button type="button" class="btn mt-0 mx-5 pt-0 cronogramaPdf" title="Cronograma en PDF"> 
                                     <i class="bi bi-file-earmark-pdf-fill fs-1 text-primary">PDF</i>
                                </button>

                                <button type="button" class="btn mt-0 mx-5 pt-0 cronogramaExcel" title="Cronograma en EXCEL">
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

    const listado = ipcRenderer.sendSync('listadoActivo');
    if (listado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudieron cargar los activos.' })

    const idlista = generateRandomId()
    const idActivo = seccion.querySelector('.idActivo')
    const listActivo = seccion.querySelector('#listActivo')
    listActivo.id = `${listActivo.id}${idlista}`
    idActivo.setAttribute('list', listActivo.id)
    listado.forEach(element => {
        const option = document.createElement('option')
        option.value = 'Act-' + element.id
        option.textContent = element.codigoInterno + '--' + element.nombreActivo + '--' + element.ubicacion + '--' + element.nombreResponsable + '--' + element.marca + '--' + element.serie
        listActivo.appendChild(option)
    })

    const nombreActivo = seccion.querySelector('.nombreActivo')
    const nombreResponsable = seccion.querySelector('.nombreResponsable')
    const ubicacionActivo = seccion.querySelector('.ubicacionActivo')
    const codigoInterno = seccion.querySelector('.codigoInterno')
    const marcaActivo = seccion.querySelector('.marcaActivo')
    const serieActivo = seccion.querySelector('.serieActivo')

    let encontrado = false
    idActivo.onblur = e => {
        const id = parseInt(e.target.value.split('-')[1])
        if (id == NaN) {
            nombreActivo.value = ''
            nombreResponsable.value = ''
            ubicacionActivo.value = ''
            codigoInterno.value = ''
            marcaActivo.value = ''
            serieActivo.value = ''
            return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger un activo del listado' })
        }
        encontrado = false
        for (let i = 0; i < listado.length; i++) {
            if (listado[i].id === id) {
                nombreActivo.value = listado[i].nombreActivo
                nombreResponsable.value = listado[i].nombreResponsable
                ubicacionActivo.value = listado[i].ubicacion
                codigoInterno.value = listado[i].codigoInterno
                marcaActivo.value = listado[i].marca
                serieActivo.value = listado[i].serie
                encontrado = true
                return
            }
        }

        if (!encontrado) {
            nombreActivo.value = ''
            nombreResponsable.value = ''
            ubicacionActivo.value = ''
            codigoInterno.value = ''
            marcaActivo.value = ''
            serieActivo.value = ''
            return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger un activo del listado' })
        }

    }

    idActivo.addEventListener('keydown', (e) => {
        // 3. Verificar si la tecla presionada es "Enter" (keyCode 13)
        if (e.keyCode !== 13) return
        const id = parseInt(e.target.value.split('-')[1])
        if (id == NaN) {
            nombreActivo.value = ''
            nombreResponsable.value = ''
            ubicacionActivo.value = ''
            codigoInterno.value = ''
            marcaActivo.value = ''
            serieActivo.value = ''
            return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger un activo del listado' })
        }
        for (let i = 0; i < listado.length; i++) {
            if (listado[i].id === id) {
                nombreActivo.value = listado[i].nombreActivo
                nombreResponsable.value = listado[i].nombreResponsable
                ubicacionActivo.value = listado[i].ubicacion
                codigoInterno.value = listado[i].codigoInterno
                marcaActivo.value = listado[i].marca
                serieActivo.value = listado[i].serie
                encontrado = true
                return
            }
        }

        if (!encontrado) {
            nombreActivo.value = ''
            nombreResponsable.value = ''
            ubicacionActivo.value = ''
            codigoInterno.value = ''
            marcaActivo.value = ''
            serieActivo.value = ''
            return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger un activo del listado' })
        }
    })

    return seccion
}

export {
    InfactivoCosteado,
}
