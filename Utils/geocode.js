const request = require('request')
const keys = require('./config.js')

const geocode = (address, callback) =>{
    const url =   keys.mapBoxUrl.replace('address', encodeURIComponent(address))
   request({url, json:true}, (error, {body}={}) => {
   
       if (error) {
           callback('unable to connect to location services', undefined)
       } else if (body.features.length === 0) {
           callback('unable to find location. Try another search')
       } else {
        const {center, place_name} = body.features[0]
        
        const latitude = center[1]
        const longtitude = center[0]
       const location = place_name
           callback(undefined, {
               latitude,
               longtitude,
               location
           })
   
       }
   })
   }

   module.exports = geocode