
function timedEntry(){
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
  });
  app.use(function(req,res){
    res.writeHead(200,{ "Content-Type": "text/plain"});
    res.end("Hello world")
  });
}

module.exports = timedEntry;
