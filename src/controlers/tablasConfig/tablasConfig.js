require('dotenv').config()
const urlbase = process.env.API_URL

const consultarTablasConfig = async (config, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({config})

    }
    try {
        const url = urlbase + '/consultarconfig'
        const response = await fetch(url, options);
        const json = await response.json();
        return (json)
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    consultarTablasConfig
}