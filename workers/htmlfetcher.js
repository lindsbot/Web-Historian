// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var http = require('http');
var htmlFetcherHelpers = require("./lib/html-fetcher-helpers")

var fetchHTML = function() {
  htmlFetcherHelpers.readUrls('../data/sites.txt', htmlFetcherHelpers.downloadUrls);
};

fetchHTML();