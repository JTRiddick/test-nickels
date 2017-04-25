function getPosts(app) {
  var fs = require('fs');

  var postsFile = fs.readFile('static/posts.csv','utf-8',function(err,posts){
    var posts = posts.split('\n');
  })

}


module.exports = getPosts;
