const yargs = require('yargs');
const axios = require('axios');

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

var locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(argv.address)}`;


axios.get(locationUrl).then((response) => {
    if(response.data.status==='ZERO_RESULTS'){
        throw new Error('Cannot validate address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lon = response.data.results[0].geometry.location.lng;
    var weatherApiKey = 'ef075e4553ed06dad03e13d66e6e93a0';
    var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;
    return axios.get(weatherUrl);
}).then((response) => {
    var temp = response.data.main.temp;
    console.log(`It's ${temp} outside.`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Cannot connect to Google servers');
    } else {
        console.log(e.message);
    }
})
