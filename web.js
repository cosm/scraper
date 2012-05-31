var express = require('express');
var app = express.createServer(express.logger());
var jsdom = require('jsdom');
var jquery = 'http://code.jquery.com/jquery-1.7.2.min.js'

app.get('/fetch', function(request, response) {
  var url = request.query.url
  var css_selector = request.query.css_selector

  jsdom.env({
    html: url,
    scripts: [jquery],
    done: function(errors, window) {
      var $ = window.$;

      var output = {
        version: "1.0.0",
        datastreams: []
      };

      $(css_selector).each(function(index) {
        output.datastreams.push({
          id: index,
          current_value: $(this).text()
        });
      });

      var json = JSON.stringify(output)

      response.send(json);
    }
  });
});

var port = process.env.PORT || 8080;
console.log("Listening on " + port);

app.listen(port);
