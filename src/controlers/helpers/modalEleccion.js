const tituloModal = document.querySelector('#staticBackdropLabel')
const textoModal = document.querySelector('#modalBodyText')
const botonCancelar = document.querySelector('#modalCancelar')
const botonAceptar = document.querySelector('#modalAceptar')
const mostrarModal = document.querySelector('#abrirModal')
const tipomodal = document.querySelector('#staticBackdrop')
const cerrarModal = document.querySelector('#cerrarModal')
const contentModal = document.querySelector('#modal-content')
const spinnerModal = document.querySelector('#spinner')
const estadomodal = document.querySelector('#staticBackdrop')


const modalEleccion = async data => {

    return new Promise((resolve, reject) => {
        if (!spinnerModal.classList.contains('d-none')) spinnerModal.classList.add('d-none')
        if (contentModal.classList.contains('border-success')) cerrarModal.classList.remove('border-success')
        if (contentModal.classList.contains('border-danger')) cerrarModal.classList.remove('border-danger')
        if (!contentModal.classList.contains('border-warning')) cerrarModal.classList.add('border-warning')
        if (tituloModal.classList.contains('text-success')) tituloModal.classList.remove('text-success')
        if (tituloModal.classList.contains('text-danger')) tituloModal.classList.remove('text-danger')
        if (!tituloModal.classList.contains('text-warning')) tituloModal.classList.add('text-warning')
        if (textoModal.classList.contains('text-success')) textoModal.classList.remove('text-success')
        if (textoModal.classList.contains('text-danger')) textoModal.classList.remove('text-danger')
        if (!textoModal.classList.contains('text-warning')) textoModal.classList.add('text-warning')
        if (botonAceptar.classList.contains('d-none')) botonAceptar.classList.remove('d-none')
        if (botonCancelar.classList.contains('d-none')) botonCancelar.classList.remove('d-none')
        if (!cerrarModal.classList.contains('d-none')) cerrarModal.classList.add('d-none')
        if (!cerrarModal.classList.contains('d-none')) cerrarModal.classList.add('d-none')
        if (!tipomodal.hasAttribute('data-bs-backdrop')) tipomodal.setAttribute('data-bs-backdrop', 'static')
        tituloModal.textContent = data.titulo
        textoModal.textContent = data.mensaje
        mostrarModal.click()
        botonAceptar.addEventListener("click", () => resolve(true))
        botonCancelar.addEventListener("click", () => resolve(false))

    })
}

const modalMensaje = data => {
    if (data.titulo.toUpperCase() == 'ERROR') {
        if (!spinnerModal.classList.contains('d-none')) spinnerModal.classList.add('d-none')
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
        if (!spinnerModal.classList.contains('d-none')) spinnerModal.classList.add('d-none')
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
    if (tipomodal.hasAttribute('data-bs-backdrop')) tipomodal.removeAttribute('data-bs-backdrop')

    tituloModal.textContent = data.titulo
    textoModal.textContent = data.mensaje
    mostrarModal.click()
}

const mostrarModalSpinner = () => {
    setTimeout(() => {
        if (contentModal.classList.contains('border-success')) contentModal.classList.remove('border-success')
        if (contentModal.classList.contains('border-warning')) contentModal.classList.remove('border-warning')
        if (contentModal.classList.contains('border-danger')) contentModal.classList.remove('border-danger')
        if (tituloModal.classList.contains('text-success')) tituloModal.classList.remove('text-success')
        if (tituloModal.classList.contains('text-warning')) tituloModal.classList.remove('text-warning')
        if (tituloModal.classList.contains('text-danger')) tituloModal.classList.remove('text-danger')
        if (textoModal.classList.contains('text-success')) textoModal.classList.remove('text-success')
        if (textoModal.classList.contains('text-warning')) textoModal.classList.remove('text-warning')
        if (textoModal.classList.contains('text-danger')) textoModal.classList.remove('text-danger')

        if (!cerrarModal.classList.contains('d-none')) cerrarModal.classList.add('d-none')
        if (!botonAceptar.classList.contains('d-none')) botonAceptar.classList.add('d-none')
        if (!botonCancelar.classList.contains('d-none')) botonCancelar.classList.add('d-none')
        if (!tipomodal.hasAttribute('data-bs-backdrop')) tipomodal.setAttribute('data-bs-backdrop', 'static')
        if (spinnerModal.classList.contains('d-none')) spinnerModal.classList.remove('d-none')

        tituloModal.textContent = 'PROCESANDO SOLICITUD'
        textoModal.textContent = ''
        mostrarModal.click()
    }, 200)
}

const cerrarrModalSpinner = () => {
    setTimeout(() => {
       cerrarModal.click()
    }, 200)

}


export {
    modalEleccion,
    modalMensaje,
    mostrarModalSpinner,
    cerrarrModalSpinner
}