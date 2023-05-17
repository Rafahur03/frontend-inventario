const filtroBusqueda = (e) => {
    const tapActiva = document.querySelector('#TabContent').querySelector('.active')
    const tablaTr = tapActiva.querySelector('tbody').querySelectorAll('tr')
    tablaTr.forEach(tr => {
        if (tr.innerText.toLowerCase().indexOf(e.target.value) === -1) {
            tr.classList.add('d-none')
        } else {
            tr.classList.remove('d-none')

        }
    })
}

export { filtroBusqueda } 