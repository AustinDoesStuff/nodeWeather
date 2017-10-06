const request = require('request');

var getLocation = (address, callback) => request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}`,
    json: true
}, (error, response, body) => {
    if(error){
        callback("Couldn't connect to Google servers");
    } else if (body.status === 'ZERO_RESULTS') {
        callback("Couldn't validate address");
    } else {
        //var city = body.results[0].address_components[2].long_name;
        //var state = body.results[0].address_components[5].short_name;
        callback(undefined, {
            lat: body.results[0].geometry.location.lat,
            lon: body.results[0].geometry.location.lng,
        });
        //getWeather(lat, lon, city, state);
    }
});


module.exports.getLocation = getLocation;
