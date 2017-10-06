const request = require('request');

var getLocation = (address) => request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}`,
    json: true
}, (error, response, body) => {
    if(error){
        console.log("Couldn't connect to Google servers");
    } else if (body.status === 'ZERO_RESULTS') {
        console.log("Couldn't validate address");
    } else {
        var lat = body.results[0].geometry.location.lat;
        var lon = body.results[0].geometry.location.lng;
        //var city = body.results[0].address_components[2].long_name;
        //var state = body.results[0].address_components[5].short_name;
        console.log(`${lat}, ${lon}`);
        //getWeather(lat, lon, city, state);
    }
});

module.exports.getLocation = getLocation;
