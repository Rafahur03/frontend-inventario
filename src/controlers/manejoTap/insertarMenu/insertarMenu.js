import {menu} from './menu.js';
const insertarMenu = (data) =>{
   const usuarioMenu = document.querySelector('.nombreUsuarioMenu')
   const usuarioVentanas = document.querySelector('.nombreUsuarioVentana')
   usuarioVentanas.textContent = data.nombre
   usuarioMenu.textContent = data.nombre
   menu(data.permisos)
}

export {
    insertarMenu
}