const GOOGLE_API_KEY = require('./apiKeys')
const axios = require("axios")

const API = "https://maps.googleapis.com/maps/api/directions/json?"

const getDistance = (origin, destination) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API}origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`)
        .then(data => {
            if (data.data.status == "OK") {
                var distance = data.data.routes[0].legs.reduce((acc, cur) => {
                    return acc + cur.duration.value
                }, 0)
                resolve(distance)
            } else {
                reject(data.data.error_message)
            }
        })
    })
}

module.exports = getDistance;