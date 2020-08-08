const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for express config.
const publicStaticPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and view location.
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server.
app.use(express.static(publicStaticPath));

 app.get('',(req,res)=>{
     res.render('index',{
         title: 'This is Index.',
         name: 'Shiva'
     });
 });

 app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'This is about.',
        name: 'Shiva'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address,(error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        
        forecast(latitude, longitude,(error,forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecaste: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Delhi',
    //     address: req.query.address
    // });
});

app.get('/products',(req,res)=>{
    res.send({
        products: []
    });
});

app.get('*',(req,res)=>{
    res.send('Page did not find!');
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});
