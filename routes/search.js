var express = require('express');
var request = require('request');
var _ = require('lodash');
var router = express.Router();

router.get('/', function(req, res, next) {
  var url = "https://www.google.co.uk/complete/search?client=chrome-omni&q=" + req.param("q") + " vs ";
  request(url, function (error, response, body) {
    if (!error && (response.statusCode >= 200 && response.statusCode < 400)) {
      var results  = JSON.parse(body)[1]
      results = _.map(results, function(result){
        return result.replace(req.param("q") + " vs ", "");
      });
      res.send(results);
    }
  })

});

module.exports = router;
