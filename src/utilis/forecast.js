  const request = require('postman-request')
// normal approach
  const forecast = (latitude , longitude , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=723a508ccb0473b3c20668a156e08b28&query='+longitude+','+latitude+'&units=f'  
   request({url : url ,json : true},(error,response)=>{
       if(error)
       {
           callback('No internet',undefined)
       }
       else if(response.body.error){
           console.log("No such location")
       }
       else{
           callback(undefined,response.body)
       }
   })
  }

  module.exports = forecast 