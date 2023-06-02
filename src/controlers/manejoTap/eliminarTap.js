const eliminarTap = (nodo, id) => {
    // seleccionamos el contendor de los contenidos de las tap
    const contenTap = nodo.parentNode.nextSibling.nextSibling
    const hijoContenTap = contenTap.querySelector(`#${id}`)
    // eliminamos el contenedor asociado al tap y el tap
    contenTap.removeChild(hijoContenTap)
    const contendorSelectorTap = nodo.parentNode
    contendorSelectorTap.removeChild(nodo)

    // activar primer tap
    const contenidos = contenTap.querySelectorAll('.tab-pane')
    if(contenidos.length === 0) return
    const primerContenido = contenidos[0]
    const idContenido = primerContenido.id
    const tapActiva = contendorSelectorTap.querySelector(`.${idContenido} > .nav-link`)
    tapActiva.click()

}

export {
    eliminarTap,
}