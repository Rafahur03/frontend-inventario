
const mime = require('mime-types')

const validarDocumentos = documento =>{
     // documentos
     const mimeType = documento.split(',')[0].split(';')[0].split(':')[1]
     if (mime.extension(mimeType) !== 'pdf') return { msg: 'Solo se aceptan documentos en formato pdf' }

     const imgBase64 = documento.split(',')[1]
     const decodedData = Buffer.from(imgBase64, 'base64');
     const sizeInBytes = decodedData.length
     if (sizeInBytes > 15000000) return { msg: 'Solo se aceptan documentos de tamaño menor de 15Mb' }
    return true;    
}

module.exports = {
    validarDocumentos
}