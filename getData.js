var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var requestSettings = {
  method: 'GET',
  url: 'https://gtfs.halifax.ca/realtime/Vehicle/VehiclePositions.pb',
  encoding: null
};

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
     const myJSON = feed.toJSON();
     console.log(typeof(myJSON))
     console.log(myJSON.entity[0])


  }
});
