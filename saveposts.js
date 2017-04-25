function savePosts(app,entries){
   var fs = require('fs');

   var keys = Object.keys(entries[0]);
   //csv header
   var csvPosts = keys.join(',') + "\n";
   //add rows
   entries.forEach(function(obj){
     keys.forEach(function(j,k){
       if (k) csvPosts += ",";
       csvPosts += obj[j];
     });
     csvPosts += "\n";
   })


   var postsFile = fs.writeFile('static/posts.csv',csvPosts,'utf-8',function(err){
     if (err){
       console.log('error saving posts');
       return console.log(err);
     }

     console.log('posts file saved');

   })

}
module.exports = savePosts;
