import { agregartap } from "./manejoPestañas/crearPestaña.js"
import { eliminarTap } from "./manejoPestañas/eliminarPestaña.js"

const nuevaTap = document.querySelector('#nueva-tap')

nuevaTap.addEventListener("click", (e) => {
    agregartap(nuevaTap)
})


document.addEventListener('click', function (event) {
    if (event.target.classList.contains('cerrar-tap')) {
        const selector = event.target.id.split('-')[0]
        const tapli = document.querySelector(`.${selector}`)
        eliminarTap(tapli, selector)
    }
});
