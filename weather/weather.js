const request = require('request');

var getWeather = (lat, lon, callback) => {
    var apiKey = 'ef075e4553ed06dad03e13d66e6e93a0';
    var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if(error){
            callback("Can't connect to OpenWeatherMap.");
        } else if (response.statusCode != '200' ) {
            callback("Can't find that weather");
        } else {
            var temp = body.main.temp;

            callback(undefined, {
                temp: temp
            });

        }
    });
}

module.exports.getWeather = getWeather;
