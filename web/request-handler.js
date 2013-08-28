var path = require('path');
var fs = require('fs');
var http = require('http');

module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

module.exports.handleRequest = function (req, res) {
  if (req.method === "GET") {
    if (req.url === "/") {
      fs.readFile("./public/index.html", function(err, data){
        if (err) {
          sendData(500, JSON.stringify(err));
        }
        sendData(200, data);
      });
    } else {
      fs.readFile("." + req.url, function(err, data){
        if (err) {
          sendData(404, JSON.stringify(err));
        }
        sendData(200, data);
      });
    }
  } else if (req.method === "POST") {
    console.log('post received');
    var string = "";
    req.on('data', function(chunk){
      string += chunk;
    });
    req.on('end', function(){
      string = string.slice(4);
      validateURL(string);
    });
  }

  var sendData = function(code, data) {
    res.writeHead(code);
    res.end(data);
  }

  var validateURL = function(string) {
    console.log("stupid text" + string);
    var options = {
      hostname: string,
      method: "GET"
    };
    var request = http.request(options, function(response){
      console.log("attempting to request");
      response.on("end", function(){
        console.log('made it into .on end. status code = ' + response.statusCode);
        var regex = /(2|3)../
        if (((response.statusCode).toString()).match(regex)) {
          console.log('made it into status-code check')
          string = "\n" + string;
          fs.appendFile('../data/sites.txt', string, function(err){
            if (err) throw err;
            console.log('works for: ' + string);
          });
        }
      });
    });
    request.end();
  }


  console.log(exports.datadir);
};
