function getPosts(app) {
  var fs = require('fs');
  var entries = []

  var postsFile = fs.readFile('static/posts.csv','utf-8',function(err,posts){
    var posts = posts.split('\n');
    for (var i=1;i<posts.length;i++){
      let row = posts[i].split(',');
      let entry = {
        "title": row[0],
        "content": row[1],
        "published": row[2]
      };
      if (entry.title !== ""){
        entries.push(entry);
      }
    };
    app.locals.entries = entries;
  });

}


module.exports = getPosts;
