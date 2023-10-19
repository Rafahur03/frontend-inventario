const { ipcRenderer } = require('electron')
import { agregarTap } from "./manejoTap/agregarTap.js";
import { insertarMenu } from "./manejoTap/insertarMenu/insertarMenu.js";
import { cargarTapContenido } from "./manejoTap/cargarTapContenido.js";
import { mostrarFrase } from "./manejoTap/mostrarFrases.js";

ipcRenderer.on('sesion', (e, sesion) => {
    insertarMenu(sesion.data)
    mostrarFrase(sesion.motivacion)
})

const nuevaTap = document.querySelector('#nueva-tap')
const cerrarmenu = document.querySelector('#cerrarNavBar')
const itemsNavbar = document.querySelectorAll('.item-nav-bar')
const itemsNavbararray = Array.from(itemsNavbar)
itemsNavbararray.forEach(item => {
    item.onclick = e => {
        agregarTap(nuevaTap, e.target.id)
        cerrarmenu.click()
        cargarTapContenido(e.target.id)
    }
})

const salir = document.querySelector('#SalirAplicacion')
salir.onclick = () =>{
	ipcRenderer.send("salir");
};


const cerrarSesion = document.querySelector('#cerrarSesion')
cerrarSesion.onclick = () =>{
    
	ipcRenderer.send("cerrarSesion");
};

