const { ipcRenderer } = require("electron");

import { modalMensaje } from "./helpers/modalEleccion.js";

const form = document.querySelector("form");
const user = document.querySelector("#idUsuario");
const password = document.querySelector("#password");
const divform = document.querySelector(".form");

window.addEventListener("DOMContentLoaded", (e) => {
	user.value = 1102849823;
	password.value = "Anakarina5";
});

// solicita salior de la aplicacion
form.addEventListener("reset", async (e) => {
	ipcRenderer.send("salir");
});

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	if (user.value === "" && password.value === "") return modalMensaje({titulo:'ERROR', mensaje:"Todos los campos son obligatorios"})
	

	if (user.value === "") return modalMensaje({titulo:'ERROR', mensaje:"Debe ingresar un usuario"})

	if (password.value === "" || password.value.length <= 0) return modalMensaje({titulo:'ERROR', mensaje:"Debe ingresar su password"})

	if (password.value.length <= 5) return modalMensaje({titulo:'ERROR', mensaje:"El password ingresado es muy corto"}) 

	const datosInicioSesion = {
		usuario: user.value,
		password: password.value,
	};

    ipcRenderer.send("iniciarSesion", datosInicioSesion );

	ipcRenderer.on('error', (event, data) => {
		modalMensaje({titulo:'ERROR', mensaje: data.msg})
	})

  	
});
