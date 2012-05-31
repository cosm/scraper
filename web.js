var express = require('express');
var app = express.createServer(express.logger());
var jsdom = require('jsdom');
var jquery = 'http://code.jquery.com/jquery-1.7.2.min.js'

app.get('/fetch', function(request, response) {
  var url = "https://www.google.co.uk/finance?client=ob&q=NASDAQ:FB";
  var css_expression = "#ref_296878244325128_l";

  jsdom.env({
    html: url,
    scripts: [jquery],
    done: function(errors, window) {
      var $ = window.$;
      response.send($(css_expression).text());
    }
  });
});

var port = process.env.PORT || 8080;
console.log("Listening on " + port);

app.listen(port);
