const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()
//IMPORTANT
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
// setting handlebars Template Engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
// setup static directory to serve etc html css
app.use(express.static(publicDirectory))
app.get('', (req,res)=>{
    res.render('index', {
        city : 'Aligarh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'YASH'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name: 'YASH'
    })
})
///////////////////////////////
// var conn= mysql.createConnection({
//     host : 'localhost',
//     user: 'root',
//     password : '',
//     database: s
// })






////////////////////////////////

// app.get('',(req,res) =>{
//     res.send('<h1>Weather</h1>')
// })

//const aboutpage = path.join(__dirname+'./about.html')

// app.get('/help', (req,res)=> {
//     res.send({
//         name : 'YASH',
//         age : 20
//     })
// })
// app.get('/about', (req,res)=> {
//     res.send('<h1>about Page</h1>')
// })
// app.get('/weather', (req,res)=> {
//     res.send({
//         forecast : 'RAining',
//         location : "ALigarh"
//     })
// })


//getting QUeries from browser
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must supply search terms'  
        })
    }
    console.log(req.query)
    //query with key developer
    console.log(req.query.developer)
    res.send({
      forecast : 'It is snowing',
      location : 'Aligarh'  
    })
})
// for weather Page
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error : 'Provide an address'
        })
    }
 //       console.log(req.query.address)

        // res.send({
        //     forecast : 'RAining',
        //     location : "ALigarh",
        //     address : req.query.address
        // })

        geocode(req.query.address,(error,{latitude,longitude,location})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error) {
                    return res.send(error)
                }
                res.send({
                    forecast : forecastData,
                    location : location,
                    address : req.query.address
                })
            })
        })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage : 'Page Not Found',
        city : 'Aligarh'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage : 'Help Page Not Found',
        city : 'Aligarh'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port : 3000')
})