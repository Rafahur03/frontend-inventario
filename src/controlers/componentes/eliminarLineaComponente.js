const eliminarLineaComponente = e => {
    const tagName = e.target.tagName.toLowerCase()
    let tr 
    if (tagName === 'i') {
        const button = e.target.parentNode
        tr = button.parentNode.parentNode
    } else {
        tr = e.target.parentNode.parentNode
    }
    tr.parentNode.removeChild(tr)
}

export {
    eliminarLineaComponente
}