const imprimirListadoMtoActivo = e =>{
    const tagName = e.target.tagName.toLowerCase()
    if(tagName === 'i'){
        const padre = e.target.parentNode
        console.log('imprimit mtto', padre.getAttribute('activo'))
        return
    }

    console.log(' buttonImprimirMtto', e.target.getAttribute('activo'))

}

export{
    imprimirListadoMtoActivo
}