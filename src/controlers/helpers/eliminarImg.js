const eliminarImg = e =>{
    const tagName = e.target.tagName.toLowerCase()
    if(tagName === 'i'){
        const padre = e.target.parentNode
        console.log('eliminar imagen', padre.id)
        return
    }

    console.log(' eliminar imagen', e.target.id)
}

export{
    eliminarImg
}