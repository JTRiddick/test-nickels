var express = require("express");
var url = require("url");
var http = require("http");
var Mustache = require("mustache");
var fs = require("fs");
var path = require("path");
var logger = require("morgan");

var randomInt = require("./random-integer");

var app = express();

var port = 3000;

app.use(logger("short"));

var publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));
// ====================================
var parsedURL = url.parse("http://www.jtriddick.com/profile?name=taylor");

console.log(parsedURL.protocol);
console.log(parsedURL.host);
console.log(parsedURL.query);

var result = Mustache.render("Hi, {{first}} {{last}}!", {
  first: 'Taylor',
  last: 'Riddick'
});
console.log(result);

console.log(randomInt());
console.log(randomInt());
console.log(randomInt());

// ====================================
var options = { encoding: "utf-8" };
fs.readFile("myFile.txt",options,function(err,data){
  if (err) {
    console.error("Error reading file!");
    return;
  }
  console.log(data.match(/x/gi).length + " letter X's");
});
// =====================================

app.use(function(req,res,next){
  console.log("In comes a " + req.method + " to " + req.url);
  // console.log("REQ IS...",req);
  // console.log("RES IS...",res);
  next();
});
app.use(function(req,res,next){
  let minute = (new Date()).getMinutes();
  if ((minute % 2) === 0){
    next();
  } else {
    res.statusCode = 403;
    res.end("Not Authorized");
  }
});
app.use(function(req,res){
  res.end('Secret info: the password is "swordfish"!');
})
app.use(function(req,res){
  res.writeHead(200,{ "Content-Type": "text/plain"});
  res.end("Hello world")
});

http.createServer(app).listen(port);

app.get("/", function(req, res){
  res.send("Hello, world!");
});
//
// app.listen(port, function(){
//   console.log("Express app started on port 3000.")
// })
