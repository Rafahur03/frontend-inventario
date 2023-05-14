const mostrarFrase = data =>{
    const titulo = document.querySelector('#usuarioFrase')
    const frase = document.querySelector('#fraseText')
    const author = document.querySelector('#author')
    titulo.textContent = `¡¡ HEY... !! ${data.nombre} Recuerda Que:`
    frase.textContent = `" ${data.frase} "`
    author.textContent = data.author
}

export{mostrarFrase}