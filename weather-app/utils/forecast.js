const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/' +lat +','+ lon + '?units=si'

    request({ url: url, json : true}, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + " It is currently " +response.body.currently.temperature+ " degrees out. There is a " +response.body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports = forecast