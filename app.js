const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
    a: {
        demand: true,
        alias: "address",
        describe: "Input your address to get the weather",
        string: true
    }
})
    .help()
    .alias('help', 'h')
    .argv;

var address = encodeURI(argv.address);

var getWeather = (lat, lon, city, state) => {
    var apiKey = 'ef075e4553ed06dad03e13d66e6e93a0';
    var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        var temp = body.main.temp;

        console.log(`In ${city}, ${state} it's ${temp} outside!`);
    });
}



request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
}, (error, response, body) => {
    var lat = body.results[0].geometry.location.lat;
    var lon = body.results[0].geometry.location.lng;
    var city = body.results[0].address_components[2].long_name;
    var state = body.results[0].address_components[5].short_name;

    getWeather(lat, lon, city, state);
});
