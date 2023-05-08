const { ipcRenderer } = require('electron')

const form = document.querySelector('form')
const user = document.querySelector('#idUsuario')
const password = document.querySelector('#password')
const divform = document.querySelector('.form')

window.addEventListener('DOMContentLoaded', e => {
    user.value = 1102849823
    password.value = 'Anakarina5'
})

// solicita salior de la aplicacion
form.addEventListener('reset', async (e) => {
    ipcRenderer('salir')
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (user.value === "" && password.value === "") {
        alert('Todos los campos son obligatorios', divform, form, 'alert-danger')
        return
    }

    if (user.value === "") {
        alert('Debe ingresar un usuario', divform, form, 'alert-danger')
        return
    }
    if (password.value === "" || password.value.length <= 0) {
        alert('Debe ingresar su password', divform, form, 'alert-danger')
        return
    }
    if (password.value.length <= 5) {
        alert('El password ingresado es muy corto', divform, form, 'alert-danger')
        return
    }

    const userData = await usuario(user.value)
    console.log(userData)
    if (userData.password !== password.value) {
        alert('Password incorrecta', divform, form, 'alert-danger')
    }

    delete userData.password

    localStorage.setItem('userData', JSON.stringify(userData))
    ipcRenderer.send('userData', userData)

    user.value = ""
    password.value = ""
})