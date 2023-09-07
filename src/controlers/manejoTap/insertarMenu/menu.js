const menu = (vector) => {
    const data = JSON.parse(vector)
    data.forEach(element => {
        const divUsuario = document.querySelectorAll('#collapseUsuario a')
        const divActivo = document.querySelectorAll('#collapseActivos a')
        const divReporte = document.querySelectorAll('#collapseReporte a')
        
        switch (element) {
            case 1:
                const uCrear = document.createElement('a')
                uCrear.setAttribute('href', '#')
                uCrear.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                uCrear.id = 'nuevoUsuario'
                uCrear.textContent = 'Nuevo Usuario'
                divUsuario[0].parentElement.insertBefore(uCrear, divUsuario[0])

                break;
            case 2:
                const uEditar = document.createElement('a')
                uEditar.setAttribute('href', '#')
                uEditar.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                uEditar.id = 'editarUsuario'
                uEditar.textContent = 'Editar Usuario'
                if (divUsuario.length > 1) {
                    divUsuario[1].parentElement.insertBefore(uEditar, divUsuario[1])
                } else {
                    divUsuario[0].parentElement.insertBefore(uEditar, divUsuario[0])
                }
                break;
            case 3:
                const aCrear = document.createElement('a')
                aCrear.setAttribute('href', '#')
                aCrear.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                aCrear.id = 'crearActivo'
                aCrear.textContent = 'Crear Activo'
                divActivo[1].parentElement.insertBefore(aCrear, divActivo[1])
                break;
            case 4:
                const aCambiar = document.createElement('a')
                aCambiar.setAttribute('href', '#')
                aCambiar.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                aCambiar.id = 'cambiarClasificacion'
                aCambiar.textContent = 'Cambiar Clasificacion'
                divActivo[0].parentElement.appendChild(aCambiar)
                break;
            case 6:
                const rCrear = document.createElement('a')
                rCrear.setAttribute('href', '#')
                rCrear.classList.add('nav-link', 'ms-3', 'item-nav-bar')
                rCrear.id = 'crearReporteMttoPreventivo'
                rCrear.textContent = 'Crear Reporte preventivo'
                divReporte[0].parentElement.insertBefore(rCrear, divReporte[1])
                break;
            default:
                break;
        }

    });
}

export { menu }