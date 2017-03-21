var express = require("express");
var url = require("url");
var http = require("http");
var Mustache = require("mustache");
var fs = require("fs");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var rollDice = require("./random-integer");

var app = express();

var port = 3000;

app.use(logger("short"));

var publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

var entries = [];
var dieSides = 12;
var dieRolls = 1;
app.locals.entries = entries;
app.locals.dieSides = dieSides;
app.locals.dieRolls = dieRolls;

app.use(bodyParser.urlencoded({extended:false}));
// ==================================== Testing
// var parsedURL = url.parse("http://www.jtriddick.com/profile?name=taylor");
//
// console.log(parsedURL.protocol);
// console.log(parsedURL.host);
// console.log(parsedURL.query);
//
// var result = Mustache.render("Hi, {{first}} {{last}}!", {
//   first: 'Taylor',
//   last: 'Riddick'
// });
// console.log(result);
//


// ====================================
// var options = { encoding: "utf-8" };
// fs.readFile("myFile.txt",options,function(err,data){
//   if (err) {
//     console.error("Error reading file!");
//     return;
//   }
//   console.log(data.match(/x/gi).length + " letter X's");
// });
// =====================================

app.use(function(req,res,next){
  console.log("In comes a " + req.method + " to " + req.url);
  next();
});

app.get("/", function(req, res){
  // console.log('locals', app.locals);
  res.render("index.ejs");
});

app.get("/roll", function(req,res){
  res.render("roll",{
    diceroll: rollDice(dieRolls,dieSides)
  });
});

app.get("/new-entry", function(req,res){
  res.render("new-entry");
});

app.post("/dice",function(req,res){
  console.log("dice button req.body ", req.body);
  dieSides = (req.body.sides - 0);
  dieRolls = (req.body.rolls - 0);
  console.log("now sides and rolls are ", dieSides, dieRolls)
  res.redirect("/roll");
})

app.post("/new-entry", function(req,res){
  if(!req.body.title || !req.body.body){
    res.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  });
  res.redirect("/");
});

app.use(function(req,res){
  res.status(404).render("404");
});


// http.createServer(app).listen(port, function(){
//   console.log("Test Nickels App Started on Port " + port);
// });

app.listen(port, function(){
  console.log("Express app started on port 3000.")
})
