var express = require('express');
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('hello, world');
});

var port = process.env.PORT || 8080;
console.log("Listening on " + port);

app.listen(port);
