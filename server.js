// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("*", function (request, response) {
  var dateStr = request.params[0].slice(1);
  var ms = null;
  if (isNaN(parseInt(dateStr))) {
    var parsed = Date.parse(dateStr);
    if (!isNaN(parsed)) {
      ms = parsed;
    }
  }
  else {
    ms = dateStr * 1000;
  }
  var date = ms == null ? null : new Date(ms);
  
  response.send({ 
    "unix" : ms == null ? null : Math.round(ms/1000), 
    "natural" : date == null ? null : formatDate(date)
  });
  response.end();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


function formatDate(fullDate) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  var date = fullDate.getDate();
  var month = months[fullDate.getMonth()];
  var year = fullDate.getFullYear();
  
  return month + " " + date + ", " + year;
}