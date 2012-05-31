var express = require('express');
var app = express.createServer(express.logger());
var jsdom = require('jsdom');
var jquery = 'http://code.jquery.com/jquery-1.7.2.min.js'

app.get('/fetch', function(request, response) {
  var url = request.query.url
  var css_expression = request.query.css_expression

  jsdom.env({
    html: url,
    scripts: [jquery],
    done: function(errors, window) {
      var $ = window.$;

      var output = ""

      $(css_expression).each(function() {
        output += $(this).text();
      });

      response.send(output);
    }
  });
});

var port = process.env.PORT || 8080;
console.log("Listening on " + port);

app.listen(port);
