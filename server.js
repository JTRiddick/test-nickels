var express = require("express");

var app = express();

var port = 3000;

app.get("/", function(request, response){
  res.send("Hello, world!");
});

app.listen(port, function(){
  console.log("Express app started on port 3000.")
})
