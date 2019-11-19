const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]

if (location) {
    geocode(location, (error, data) => {
        if (error) {
            return console.log(error)
        } 
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
    
            console.log(data.location)
            console.log(forecastData)
    
        })
    })
} else {
    console.log("Please provide an address.")
}




