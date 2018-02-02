const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const key = 'AIzaSyBUQ7bA7bxxyCZgmo_vN5ONCNsZ9q_1PRc';
const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL =  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`;

axios.get(geocodeURL)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.')
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.darksky.net/forecast/03127686294269d01f4c8de5233fd8e5/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
  })
  .then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers')
    } else {
      console.log(error.message)
    }
  });