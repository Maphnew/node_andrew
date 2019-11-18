const request = require('request')

const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/37.8267,-122.4233?units=si&lang=ko'

request({ url: url, json: true}, (error, response) => {
    temperature = response.body.currently.temperature
    precipProbability = response.body.currently.precipProbability
    console.log(response.body.daily.data[0].summary + " It is currently " +temperature+ " degrees out. There is a " +precipProbability+"% chance of rain.")
    // const data = JSON.parse(response.body)
    // console.log(data.currently)
})