require('dotenv').config()
const urlbase = process.env.API_URL

const eliminarComponente = async (data, token) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
    }

    try {
        const url = urlbase + '/eliminarComponente'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    eliminarComponente
}   