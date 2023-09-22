const filtroBusqueda = (e) => {
    const tapActiva = document.querySelector('#TabContent').querySelector('.active')
    const tablaTr = tapActiva.querySelector('tbody').querySelectorAll('tr')
    tablaTr.forEach(tr => {
        if (tr.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1) {
            tr.classList.add('d-none')
        } else {
            tr.classList.remove('d-none')

        }
    })
}

const filtroBusquedaTablas = (e) => {
    const id = e.target.getAttribute('tabla')
    const tbody = document.querySelector('#'+id)
    const tablaTr = tbody.querySelectorAll('tr')
    tablaTr.forEach(tr => {
        const inputs = tr.querySelectorAll('input')
        const values =  Array.from(inputs).map(input => {return input.value})
        const valores = values.join(' ')
        if (valores.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1) {
            tr.classList.add('d-none')
        } else {
            tr.classList.remove('d-none')
        }
    })
}

export { filtroBusqueda, filtroBusquedaTablas } 