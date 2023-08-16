
const mime = require('mime-types')

const validarDocumentos = docuemnto =>{
     // documentos
     const mimeType = docuemnto.split(',')[0].split(';')[0].split(':')[1]
     if (mime.extension(mimeType) !== 'pdf') return { msg: 'Solo se aceptan documentos en formato pdf' }

     const imgBase64 = docuemnto.split(',')[1]
     const decodedData = Buffer.from(imgBase64, 'base64');
     const sizeInBytes = decodedData.length
     if (sizeInBytes > 3145728) return { msg: 'Solo se aceptan documentos de tamaño menor de 3 Mb' }
}

module.exports = {
    validarDocumentos
}