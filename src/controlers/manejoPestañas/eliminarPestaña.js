const eliminarTap = (nodo, id) => {
    // seleccionamos el contendor de los contenidios de las tap
    const contenTap = nodo.parentNode.nextSibling.nextSibling
    const hijoContenTap = contenTap.querySelector(`#${id}`)
    // eliminamos el contenedor asociado al tap y el tap
    contenTap.removeChild(hijoContenTap)
    nodo.parentNode.removeChild(nodo)
}

export {
    eliminarTap,
}