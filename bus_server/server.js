function getData(setup) {
  const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
  const request = require("request");


  var requestSettings = {
    method: "GET",
    url: "https://gtfs.halifax.ca/realtime/Vehicle/VehiclePositions.pb",
    encoding: null,
  };

  request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const feed =
        GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      busDataJSON = feed.toJSON();
    //  console.log(myJSON.entity[0]);

      if (setup) {
      startServer();
    } else {
        setTimeout(getData, 5000);
    }

    // console.log("getData was called.")

    }
  });
}

function startServer() {

  var corsOptions = {
    origin: 'http://yigitdincsoy.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  const express = require("express");
  const app = express();
  const cors = require('cors')
  app.use(cors(corsOptions));
  const port = 3000;

  


  app.get("/", (req, res) => {
    res.send(busDataJSON);
  });

  app.listen(port, () => {
    console.log(`Serving now on ${port}`);
  });

  setTimeout(getData, 9000);

}

let busDataJSON;
getData(true);