$(function(){
  var $h1 = $("h1[data='temp']");
  var $zip = $("input[name='zip']");

  $("#zipform").on("submit",function(evt){
    evt.preventDefault();
    var zipCode = $.trim($zip.val());
    $h1.text("loading...");

    var req = $.ajax({
      url:"/forecast/"+zipCode,
      dataType:"json"
    });
    req.done(function(data){
      var temperature = data.temperature;
      $h1.html("It is " + temperature + "&#176; in " + zipCode);
    });
    req.fail(function(){
      $h1.text("Error!");
    });
  });
});
