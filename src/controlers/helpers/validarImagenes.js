require('dotenv').config()
const mime = require('mime-types')

const validarImagenes = imagen =>{
     // imagenes
     const mimeType = imagen.split(',')[0].split(';')[0].split(':')[1]
     const extensiones = ['png', 'jpg', 'jpeg']
     if (!extensiones.includes(mime.extension(mimeType))) return { msg: 'Solo se aceptan imagenes en formato png, jpg o jpeg' }

     const imgBase64 = imagen.split(',')[1]
     const decodedData = Buffer.from(imgBase64, 'base64');
     const sizeInBytes = decodedData.length
     if (sizeInBytes > 3145728) return { msg: 'Solo se aceptan imagenes de tamaño hasta 3 Mb' }

     return true
}

module.exports ={
    validarImagenes
}