const yargs = require('yargs');
const location = require('./location/geolocation');
const weather = require('./weather/weather');

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

location.getLocation(argv.address, (errorMessage, locationResults) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        weather.getWeather(locationResults.lat, locationResults.lon, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            } else {
                console.log(`It's ${weatherResults.temp} outside.`);
            }
        });
    }
});
