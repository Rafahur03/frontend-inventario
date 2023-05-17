require('dotenv').config()
const urlbase = process.env.API_URL

const consultarListadoSolicitudes = async token => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },

    }



    try {
        const url = urlbase + '/consultarSoportesTodos'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    consultarListadoSolicitudes
}