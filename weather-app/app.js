const request = require('request')
const geocode = require('./utils/geocode')

// // const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/37.8267?units=si&lang=ko'
// const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/37.8267,-122.4233?units=si&lang=ko'

// request({ url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location.')
//     } else {
//         temperature = response.body.currently.temperature
//         precipProbability = response.body.currently.precipProbability
//         console.log(response.body.daily.data[0].summary + " It is currently " +temperature+ " degrees out. There is a " +precipProbability+"% chance of rain.")
//     }
// })

// Geocoding
// Address -> Lat/Long -> Weather

// // const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFwaG5ldyIsImEiOiJjazM0OW82Z28wdWpoM2JvYjh5ZThpanNlIn0.HB5kQ-HAANoU2yXPmDXA2w'
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/129999999.json?access_token=pk.eyJ1IjoibWFwaG5ldyIsImEiOiJjazM0OW82Z28wdWpoM2JvYjh5ZThpanNlIn0.HB5kQ-HAANoU2yXPmDXA2w'

// request({ url: geocodeURL, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location service!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try another search.')
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
    
// })



geocode('Boston', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})