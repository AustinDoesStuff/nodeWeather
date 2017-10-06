const request = require('request');

var getWeather = (lat, lon, city, state) => {
    var apiKey = 'ef075e4553ed06dad03e13d66e6e93a0';
    var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if(error){
            console.log("Can't connect to OpenWeatherMap.");
        } else if (response.) {

        }
        var temp = body.main.temp;

        console.log(`In ${city}, ${state} it's ${temp} outside!`);
    });
}

module.exports.getWeather = getWeather;
