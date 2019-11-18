const request = require('request')

const url = 'https://api.darksky.net/forecast/a36cc7f940e72f0b614e6e427e964599/37.8267,-122.4233'

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.currently)
})