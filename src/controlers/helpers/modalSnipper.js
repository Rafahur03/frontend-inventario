const spinner = document.querySelector('#spinner')

const mostarSnipper = ()=>{
    spinner.classList.remove('d-none')

}

const cerrarSnipper = ()=>{
    spinner.classList.add('d-none')
}


export {
    mostarSnipper,
    cerrarSnipper
}