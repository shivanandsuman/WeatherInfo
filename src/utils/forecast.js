const request = require('postman-request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4930f269f7128cdb929215c3540f035b&query='+ latitude + ',' + longitude +'&units=f';
    //const url = 'http://api.weatherstack.com/current?access_key=4930f269f7128cdb929215c3540f035b&query=37.8267,-122.4233&units=f';

    request({url: url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }
        else if(response.body.error){
            callback('Unable to find location!', undefined);
        }
        else{
            callback(undefined,'Weather is ' + response.body.current.weather_descriptions[0]);
        }
    });

}

module.exports = forecast;