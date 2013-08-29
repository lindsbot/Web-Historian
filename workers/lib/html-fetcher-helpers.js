var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var http = require('http');

exports.readUrls = function(filePath, cb){
  var urlList = [];
  var filePath = path.join(__dirname, './../../data/sites.txt');
  fs.readFile(filePath, 'utf8', function(err, data){
    if (data) {
      urlList = data.split('\n');
      if (urlList !== _.uniq(urlList)) {
        fs.writeFile(filePath, _.uniq(urlList).join('\n'), function(err){});
      }
      return cb(urlList);
    }
  });
};

exports.downloadUrls = function(urls){
    // read url list
    // for each url, visit site, get page source
    // stick page source in /sites/
    var filePath = path.join(__dirname, './../../data/sites/');
    _.each(urls, function(url){
      var options = {
        hostname: url,
        method: "GET"
      };
      var request = http.request(options, function(response){
        var content = "";
        response.on("data", function(chunk){
          content += chunk;
        });
        response.on("end", function(){
          fs.writeFile(filePath + options.hostname, content, function(err){})
        });
      });
      request.end();
    });
};