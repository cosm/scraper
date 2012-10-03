var express = require('express');
var app = express.createServer(express.logger());
var jsdom = require('jsdom');
var jquery = 'http://code.jquery.com/jquery-1.7.2.min.js'

function sendError(response, errors) {
  response.statusCode = 422;
  console.log(errors);

  var json = JSON.stringify({
    title: "Error",
    errors: errors
  });

  response.send(json + "\n");
}

app.get('/fetch', function(request, response) {
  var url = decodeURIComponent(request.query.url);
  var css_selector = decodeURIComponent(request.query.css_selector);

  jsdom.env({
    html: url,
    scripts: [jquery],
    done: function(errors, window) {
      try {
        if ( errors != null && errors.length > 0 ) {
          return sendError(response, errors);
        } else {
          var $ = window.$;
          var elements = $(css_selector);

          if (elements.length > 0) {
            var output = {
              version: "1.0.0",
              datastreams: []
            };

            elements.each(function(index) {
              output.datastreams.push({
                id: index + '',
                current_value: $(this).text()
              });
            });

            var json = JSON.stringify(output)
            response.send(json + "\n");
          } else {
            return sendError(response, ["No elements matched your css expression"]);
          }
        }
      }
      catch(error) {
        return sendError(response, [error.message]);
      }
    }
  });
});

var port = process.env.PORT || 8080;
console.log("Listening on " + port);

app.listen(port);
