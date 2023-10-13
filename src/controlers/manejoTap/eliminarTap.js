const eliminarTap = (e) => {    
    const id = e.target.id.split('-')[0]
    const liTapEL = document.querySelector('.'+id)
    const contenTapEl = document.querySelector('#'+id)
   
    // seleccionamos el contendor de los contenidos de las tap
    const contenTap = contenTapEl.parentNode
    const contenidos = contenTap.querySelectorAll('.tab-pane')
    if(contenidos.length === 0) return
    liTapEL.parentNode.removeChild(liTapEL)
    contenTapEl.parentNode.removeChild(contenTapEl)
    const primerContenido = contenidos[0]
    const idContenido = primerContenido.id
    const tapActiva = document.querySelector(`.${idContenido} > .nav-link`)
    tapActiva.click()

    setTimeout(() =>{if(!primerContenido.classList.contains("active")) primerContenido.classList.add("active")},160) 
}

export {
    eliminarTap,
}