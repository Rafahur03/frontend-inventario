const spinner = document.querySelector('#spinner')

const mostarSpinner = ()=>{
    spinner.classList.remove('d-none')

}

const cerrarSpinner = ()=>{
    spinner.classList.add('d-none')
}


export {
    mostarSpinner,
    cerrarSpinner 
}