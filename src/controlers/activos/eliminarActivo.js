const eliminarActivo = e =>{
    const tagName = e.target.tagName.toLowerCase()
    if(tagName === 'i'){
        const padre = e.target.parentNode
        console.log('eliminar', padre.getAttribute('activo'))
        return
    }
    const activo = e.target.getAttribute('activo')
    const id = activo.split('-')[1]
    console.log(id)

}

export{
    eliminarActivo
}