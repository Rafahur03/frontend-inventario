const { ipcRenderer } = require("electron");
import { agregarTap }  from "./manejoTap/agregarTap.js";
import {eliminarTap}  from "./manejoTap/eliminarTap.js"
import { cagarTapContenido } from "./manejoTap/cargarTapContenido.js";

const nuevaTap = document.querySelector('#nueva-tap')

nuevaTap.addEventListener("click", e => {
    agregarTap(nuevaTap)
})


document.addEventListener('click', e => {
    if (e.target.classList.contains('cerrar-tap')) {
        const selector = e.target.id.split('-')[0]
        const tapli = document.querySelector(`.${selector}`)
        eliminarTap(tapli, selector)
    }

    if (e.target.classList.contains('item-nav-bar')) {
        document.querySelector('#cerrarNavBar').click()
        cagarTapContenido(e.target.id)
    }
});

 