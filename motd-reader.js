

function motdReader(app){

  var fs = require('fs');
  var messagesFile = fs.readFile('./static/motd.csv','utf-8',function(err,messages){

  var messages = messages.split(',');

  var motdIndex = Math.floor(Math.random() * messages.length);
  console.log('message is ',messages[motdIndex]);
  app.locals.motd = messages[motdIndex];
  });

}

module.exports = motdReader;
