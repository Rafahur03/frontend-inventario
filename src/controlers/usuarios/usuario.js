require('dotenv').config()
const url = process.env.API_URL

const iniciarSesion = async data => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json
    } catch (error) {
        console.error(error);
    }

}

module.exports =  {
    iniciarSesion
}