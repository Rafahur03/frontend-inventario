const listadoReportes = () => {
    const seccion = document.createElement('section');
    seccion.classList.add('d-block', 'mt-1')
    seccion.innerHTML = `
    <h2 class="text-center mt-1">Listado Reportes</h2>
        <div class="w-100 bg-light my-2 p-2">
            <form class="w-50 mb-4">
                <h2>Filtrar por:</h2>
                <p>Escriba cuaquiera de estos datos: id equipo, Id Reporte, Nombre del activo marca, modelo, serie, ubicacion, responsable</p>
                <input class="form-control" id="inputFiltro" type="text" placeholder="Buscar...">
            </form>
        </div>
        <div class="w-100 p-3">
            <table class="table W-100 table-striped table-hover table-responsive">
                <thead>
                    <tr class="text-uppercase text-center">
                        <th scope="col">id Reporte</th>
                        <th scope="col">id Solicitud</th>
                        <th scope="col">id activo</th>
                        <th scope="col">nombre</th>
                        <th scope="col">marca</th>
                        <th scope="col">modelo</th>
                        <th scope="col">ubicacion</th>
                        <th scope="col">Solicitante</th>
                        <th scope="col">estado</th>
                    </tr>
                </thead>
                <tbody id="listado">
                </tbody>
            </table>
        </div>
        
    `

    return seccion
}

export {
    listadoReportes,
}
