const { ipcRenderer } = require('electron')
import { modalMensaje, modalEleccion } from "../helpers/modalEleccion.js"

const descargarInformeSolicitudesMtto = async seccion => {
    const clasificacion = seccion.querySelector('.clasificacion')
    const input = clasificacion.querySelectorAll('input')
    const inputs = Array.from(input)

    const filtros = inputs.map(element => {
        return { id: element.getAttribute('siglas'), valor: element.checked ? true : false }
    })
    if (filtros.every(item => item.valor === false)) return modalMensaje({ titulo: 'ERROR', mensaje: 'Debe escoger una Clasificacion de Activo' })
    const fechaInicialSolicitud = seccion.querySelector('.fechaInicialSolicitud').value
    const fechaFinalSolicitud = seccion.querySelector('.fechaFinalSolicitud').value
    if (fechaInicialSolicitud == '' || fechaFinalSolicitud == '') {
        const respuesta = await modalEleccion({ titulo: 'Advertencia', mensaje: 'Falta una de las fechas de inicio o final o ambas, si continua se consultaran los datos de los ultimos seis meses o los seis meses anteriores o posteriores acorde a una de las fechas Ingresada' })
        if (!respuesta) return
    }
    const data = {
        filtros,
        fechaInicialSolicitud,
        fechaFinalSolicitud
    }

    console.log(data, 'solicitud')
    const descarga = ipcRenderer.sendSync('descargarIfolistadoSolicitudes', data);
    if (descarga.msg) return modalMensaje({ titulo: 'error', mensaje: descarga.msg })

    const byteCharacters = atob(descarga.reportePDF);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = descarga.nombre;
    // Simular un clic en el enlace para abrir el administrador de archivos
    link.click();
}

export { descargarInformeSolicitudesMtto }