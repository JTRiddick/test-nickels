var express = require("express");
var path = require("path");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var weather = new ForecastIo("34d139190485d692ee02d43c10724938");


  var router = express.Router();

   router.get("/", function(req,res){
    res.render("forecast");
  });

  router.get(/^\/(\d{5})$/, function(req,res,next){
    console.log("zipcode search for ",req.params[0]);
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode){
      next();
      return;
    }

  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.forecast(latitude,longitude,function(err,data){
    if (err){
      next();
      return;}

      res.json({
        zipcode:zipcode,
        temperature:data.currently.temperature
      });
    });
  });

module.exports = router
