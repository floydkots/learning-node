const request = require('request');

module.exports.geocodeAddress = function (address, callback) {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address')
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  })
};
