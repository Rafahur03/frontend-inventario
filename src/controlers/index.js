const { ipcRenderer } = require("electron");
import { agregartap } from "./manejoPestañas/crearPestaña.js"
import { eliminarTap } from "./manejoPestañas/eliminarPestaña.js"


const nuevaTap = document.querySelector('#nueva-tap')

nuevaTap.addEventListener("click", e => {
    agregartap(nuevaTap)
})

document.addEventListener('click', e => {
    if (e.target.classList.contains('cerrar-tap')) {
        const selector = e.target.id.split('-')[0]
        const tapli = document.querySelector(`.${selector}`)
        eliminarTap(tapli, selector)
    }

    if (e.target.classList.contains('item-nav-bar')) {
        document.querySelector('#cerrarNavBar').click()
        const bodyTap = document.querySelector('#bodyTap')
        // con estos datos podemos cargar la vita que requiera el usuario ademas de crear una nuevaventana verificando si hay o no tap y cual esta activa
        console.log(e.target.id)
        console.log(bodyTap.querySelectorAll('.tab-pane').length)
        console.log(bodyTap.querySelector('#TabContent .active'))


        ipcRenderer.send('cargarContenido')
    }
});

