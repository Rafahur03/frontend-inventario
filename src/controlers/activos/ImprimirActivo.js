const { ipcRenderer } = require('electron')
const imprimirActivo = e =>{
    const tagName = e.target.tagName.toLowerCase()
    let boton
    if (tagName === 'i') {
        boton = e.target.parentNode
    } else {
        boton = e.target
    }
    const activo = boton.getAttribute('activo')

    const data = {
        activo
    }
    const descarga = ipcRenderer.sendSync('descargarHojaDeVida', data);
    if(descarga.msg) return modalMensaje({titulo:'error', mensaje:descarga.msg});
    console.log(descarga)
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = descarga.hojadevida;
    link.download = `${descarga.nombre}.pdf`;

    // Simular un clic en el enlace para abrir el administrador de archivos
    link.click();
  

}

export{
    imprimirActivo
}