const request = require('postman-request')
// es6 function approach
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieWFzaGdhdXRhbTExMyIsImEiOiJja2VwcGdzcGUwNGRhMnpxc3Fodjhud2o3In0.X60FB21ioExyDwsxmu5-_g&limit=1 '
    request({url, json : true},(error,{body}) => {
        if(error){
            callback('NO internet',undefined)
        }
        else if(body.features.length ===0){
                   console.log('No such location',undefined)
         }
         else {
             callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name 
             })
         }
    })
}

geocode('Aligarh' ,(error,data) => {
    console.log('Error',error)
    console.log('Data',data)
})


module.exports = geocode 