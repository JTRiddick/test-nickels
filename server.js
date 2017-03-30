var express = require("express");
var url = require("url");
var http = require("http");
var Mustache = require("mustache");
var fs = require("fs");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var rollDice = require("./random-integer");
var motdReader = require("./motd-reader");

var app = express();

var port = process.env.PORT || 3000;

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
app.locals.motd = "Hey look, nothing!";

app.use(bodyParser.urlencoded({extended:false}));


app.use(function(req,res,next){
  console.log("In comes a " + req.method + " to " + req.url);
  next();
});

app.get("/", function(req, res){
  // console.log('locals', app.locals);
  motdReader(app);
  res.render("index.ejs");
});

//request middleware
app.use(function(req,res,next){
  console.log("Request IP: " + req.url);
  console.log("Request date: " + new Date());
  next();
});

//serve static file middleware without express.static
app.use(function(req,res,next){
  var filePath = path.join(__dirname,"static", req.url);
  fs.stat(filePath, function(err,fileInfo){
    if (err){
      next(new Error("Error sending file!"));
      return;
    }
    if(fileInfo.isFile()){
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});
//on Error, throw 500 Responsive
app.use(function(err,req,res,next){
  res.status(500);
  res.send("Internal server error.");
});

var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'), {flags:'a'});
app.use(logger('combined', {stream: accessLogStream}));

app.get("/posts", function(req,res){
  res.render("posts.ejs");
})

app.get("/roll", function(req,res){
  res.render("roll",{
    diceroll: rollDice(dieRolls,dieSides)
  });
});

app.get("/new-entry", function(req,res){
  res.render("new-entry");
});

app.get("/dice", function(req,res){
  res.render("dice");
})

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

app.listen(port, function(){
  console.log("Express app started on port 3000.")
})
