const solicitarMttoActivo = e =>{
    const tagName = e.target.tagName.toLowerCase()
    if(tagName === 'i'){
        const padre = e.target.parentNode
        console.log('solicitar', padre.getAttribute('activo'))
        return
    }

    console.log(' buttonsolicitar', e.target.getAttribute('activo'))

}

export{
    solicitarMttoActivo
}