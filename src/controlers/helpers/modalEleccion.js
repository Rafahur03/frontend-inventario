const tituloModal = document.querySelector('#modalMensajeLabel')
const textoModal = document.querySelector('#modalBodyText')
const botonCancelar = document.querySelector('#modalCancelar')
const botonAceptar = document.querySelector('#modalAceptar')
const mostrarModal = document.querySelector('#abrirModal')
const tipomodal = document.querySelector('#modalMensaje')
const cerrarModal = document.querySelector('#cerrarModal')
const contentModal = document.querySelector('#modal-content')

const modalEleccion = async data => {

    return new Promise((resolve, reject) => {
        if (contentModal.classList.contains('border-success')) contentModal.classList.remove('border-success')
        if (contentModal.classList.contains('border-danger')) contentModal.classList.remove('border-danger')
        if (!contentModal.classList.contains('border-warning')) contentModal.classList.add('border-warning')
        if (tituloModal.classList.contains('text-success')) tituloModal.classList.remove('text-success')
        if (tituloModal.classList.contains('text-danger')) tituloModal.classList.remove('text-danger')
        if (!tituloModal.classList.contains('text-warning')) tituloModal.classList.add('text-warning')
        if (textoModal.classList.contains('text-success')) textoModal.classList.remove('text-success')
        if (textoModal.classList.contains('text-danger')) textoModal.classList.remove('text-danger')
        if (!textoModal.classList.contains('text-warning')) textoModal.classList.add('text-warning')
        if (botonAceptar.classList.contains('d-none')) botonAceptar.classList.remove('d-none')
        if (botonCancelar.classList.contains('d-none')) botonCancelar.classList.remove('d-none')
        if (!cerrarModal.classList.contains('d-none')) cerrarModal.classList.add('d-none')
        tipomodal.setAttribute('data-bs-backdrop', 'true')
        tipomodal.setAttribute('data-bs-keyboard', 'false')
        tituloModal.textContent = data.titulo
        textoModal.textContent = data.mensaje
        mostrarModal.click()
        botonAceptar.addEventListener("click", () => resolve(true))
        botonCancelar.addEventListener("click", () => resolve(false))

    })
}

const modalMensaje = data => {
    setTimeout(() => {
        if (data.titulo.toUpperCase() == 'ERROR') {
            if (contentModal.classList.contains('border-success')) contentModal.classList.remove('border-success')
            if (contentModal.classList.contains('border-warning')) contentModal.classList.remove('border-warning')
            if (!contentModal.classList.contains('border-danger')) contentModal.classList.add('border-danger')
            if (tituloModal.classList.contains('text-success')) tituloModal.classList.remove('text-success')
            if (tituloModal.classList.contains('text-warning')) tituloModal.classList.remove('text-warning')
            if (!tituloModal.classList.contains('text-danger')) tituloModal.classList.add('text-danger')
            if (textoModal.classList.contains('text-success')) textoModal.classList.remove('text-success')
            if (textoModal.classList.contains('text-warning')) textoModal.classList.remove('text-warning')
            if (!textoModal.classList.contains('text-danger')) textoModal.classList.add('text-danger')


        } else {
            if (contentModal.classList.contains('border-warning')) contentModal.classList.remove('border-warning')
            if (contentModal.classList.contains('border-danger')) contentModal.classList.remove('border-danger')
            if (!contentModal.classList.contains('border-success')) contentModal.classList.add('border-success')
            if (!tituloModal.classList.contains('text-danger')) tituloModal.classList.remove('text-danger')
            if (tituloModal.classList.contains('text-warning')) tituloModal.classList.remove('text-warning')
            if (!tituloModal.classList.contains('text-success')) tituloModal.classList.add('text-success')
            if (textoModal.classList.contains('text-danger')) textoModal.classList.remove('text-danger')
            if (textoModal.classList.contains('text-warning')) textoModal.classList.remove('text-warning')
            if (!textoModal.classList.contains('text-success')) textoModal.classList.add('text-success')
        }


        if (cerrarModal.classList.contains('d-none')) cerrarModal.classList.remove('d-none')
        if (!botonAceptar.classList.contains('d-none')) botonAceptar.classList.add('d-none')
        if (!botonCancelar.classList.contains('d-none')) botonCancelar.classList.add('d-none')
        tipomodal.setAttribute('data-bs-backdrop', 'false')
        tipomodal.setAttribute('data-bs-keyboard', 'true')

        tituloModal.textContent = data.titulo
        textoModal.textContent = data.mensaje
        mostrarModal.click()
    }, 200)
}



export {
    modalEleccion,
    modalMensaje,
}