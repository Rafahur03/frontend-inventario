const { ipcRenderer } = require("electron");

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

	if (user.value === "" && password.value === "") {
		alerta("Todos los campos son obligatorios", divform, form, "alert-danger");
		return;
	}

	if (user.value === "") {
		alerta("Debe ingresar un usuario", divform, form, "alert-danger");
		return;
	}
	if (password.value === "" || password.value.length <= 0) {
		alerta("Debe ingresar su password", divform, form, "alert-danger");
		return;
	}
	if (password.value.length <= 5) {
		alerta("El password ingresado es muy corto", divform, form, "alert-danger");
		return;
	}

	const datosInicioSesion = {
		usuario: user.value,
		password: password.value,
	};

    ipcRenderer.send("iniciarSesion", datosInicioSesion );
  	
});
