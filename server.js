var express = require("express");
var url = require("url");
var http = require("http");
var Mustache = require("mustache");
var fs = require("fs");

var randomInt = require("./random-integer");

var app = express();

var port = 3000;

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

app.get("/", function(req, res){
  res.send("Hello, world!");
});

app.listen(port, function(){
  console.log("Express app started on port 3000.")
})

function requestHandler(req,res){
  if (req.url === "/"){
    res.end("WELCOME TO PAGE!!");
  } else if (req.url === "/about") {
    res.end("Welcome to the about page!");
  } else {
    res.end("Error! File not found!")
  }
  console.log("In comes a request to: " + req.url);
  res.end("Hello, world!");
}

var server = http.createServer(requestHandler);
server.listen(port+1);
