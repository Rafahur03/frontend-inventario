const editarActivo = e =>{
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const contenedorBotones = boton.parentNode.parentNode
    const form = contenedorBotones.nextSibling.nextSibling
    const activo = boton.getAttribute('activo')
    const id = activo.split('-')[1]
    console.log(id)
    console.log(form)
    const codigoInterno = form.querySelector('.codigoInterno')
    const modeloActivo = form.querySelector('.modeloActivo')
    const areaActivo = form.querySelector('.areaActivo')
    const nombreActivo = form.querySelector('.nombreActivo')
    const serieActivo = form.querySelector('.serieActivo')
    const ubicacionActivo = form.querySelector('.ubicacionActivo')
    const marcaActivo = form.querySelector('.marcaActivo')
    const procesoActivo = form.querySelector('.procesoActivo')
    const estadoActivo = form.querySelector('.estadoActivo')
    const proveedorActivo = form.querySelector('.proveedorActivo')
    const nitProveedor = form.querySelector('.nitProveedor')
    const responsableActivo = form.querySelector('.responsableActivo')
    const tipoActivo = form.querySelector('.tipoActivo')
    const facturaActivo = form.querySelector('.facturaActivo')
    const valorActivo = form.querySelector('.valorActivo')
    const ingresoActivo = form.querySelector('.ingresoActivo')
    const fechaCompra = form.querySelector('.fechaCompra')
    const garantiaActivo = form.querySelector('.garantiaActivo')
    const frecuenciaMtto = form.querySelector('.frecuenciaMtto')
    const proximoMtto = form.querySelector('.proximoMtto')
    const descripcionActivo = form.querySelector('.descripcionActivo')
    const recomendacionActivo = form.querySelector('.recomendacionActivo')
    const observacionActivo = form.querySelector('.observacionActivo')
}


export{
    editarActivo
}