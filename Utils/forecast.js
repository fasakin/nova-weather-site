const request = require('request')
const keys = require('./config.js')

const forecast = (lat, long, callback) => {
    const url = keys.url.replace('lat', lat).replace('long', long)
   request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            const {weather_descriptions, temperature, feelslike, humidity, wind_speed} = body.current
      callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees.
       It feels like ${feelslike} degrees out. 
       The humidity is ${humidity} and the wind speed is ${wind_speed}`)
        }
   })
}



module.exports = forecast