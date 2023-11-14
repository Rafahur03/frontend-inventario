const eliminarTap = (e) => {
    const id = e.target.id.split('-')[0]
    const liTapEL = document.querySelector('.' + id)
    const contenTapEl = document.querySelector('#' + id)

    // seleccionamos el contendor de los contenidos de las tap
    const contenTap = contenTapEl.parentNode
    const contenidos = contenTap.querySelectorAll('.tab-pane')
    if (contenidos.length === 0) return
    liTapEL.parentNode.removeChild(liTapEL)
    contenTapEl.parentNode.removeChild(contenTapEl)
    let tapAnterior = contenidos[contenidos.length - 2]
    let idContenido = tapAnterior.id.split('-')[0]

    if (idContenido == id) {
        tapAnterior = contenidos[0]
        idContenido = tapAnterior.id.split('-')[0]
    }

    const tapActiva = document.querySelector(`.${idContenido} > .nav-link`)
    tapActiva.click()

    setTimeout(() => { if (!tapAnterior.classList.contains("active")) tapAnterior.classList.add("active") }, 160)
}

export {
    eliminarTap,
}