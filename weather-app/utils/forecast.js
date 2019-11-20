const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/' +lat +','+ lon + '?units=si'

    request({ url, json : true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " +body.currently.temperature+ " degrees out. There is a " +body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports = forecast