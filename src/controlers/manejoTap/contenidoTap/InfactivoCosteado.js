const { ipcRenderer } = require('electron')

const InfactivoCosteado = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
        <div class="container-fluid d-flex w-100 m-0 p-0 mb-4">
            <form class="w-100 d-flex flex-column">                          
                <div class="row  justify-content-center mx-2">
                    <h3 class="text-center mt-1 fw-bold">Permisos Asociados</h3>
                    <div class=" col-1">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkUsuarios" type="checkbox" >
                            <label class="form-check-label" for="checkUsuarios">Crea, Editar Usuarios</label>
                        </div>
                    </div>
                        
                    <div class=" col-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkActivos" type="checkbox">
                            <label class="form-check-label" for="checkActivos">Crear, Editar Activos</label>
                        </div>                        
                    </div>

                    <div class=" col-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input checkclasificacion" type="checkbox">
                            <label class="form-check-label" for="checkclasificacion">Cambiar Clasificacion activos</label>
                        </div>                        
                    </div>

                    <div class=" col-2"> 
                            <div class="form-check form-switch">
                            <input class="form-check-input checkSolicitudes" type="checkbox">
                            <label class="form-check-label" for="checkSolicitudes">Editar Solicitudes</label>
                        </div>
                    </div>
                    <div class=" col-2"> 
                        <div class="form-check form-switch">
                            <input class="form-check-input checkReportes" type="checkbox">
                            <label class="form-check-label" for="checkReportes">Crear, editar Reportes</label>
                        </div>
                    </div>
                    <div class=" col-2"> 
                        <div class="form-check form-switch">
                            <input class="form-check-input checkConfguraciones" type="checkbox" id>
                            <label class="form-check-label" for="checkConfguraciones">Crear, editar Configuraciones</label>
                        </div>
                    </div>

                    <div class=" col-1"> 
                        <div class="form-check form-switch">
                            <input class="form-check-input checkInformes" type="checkbox" id>
                            <label class="form-check-label" for="checkInformes">Informes</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `

    const listado = ipcRenderer.sendSync('datalist', 'proveedores')
    if (listado.msg) return modalMensaje({ titulo: 'ERROR', mensaje: 'No se pudo consultar el lsitado de proveedores' })
    console.log(listado)
    return seccion
}

export {
    InfactivoCosteado,
}
