(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , qs        = require("querystring")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , bodyParser   = require("body-parser")
    , app       = express()

  app.use(bodyParser.json());

  app.get("/catalogue/images*", function (req, res, next) {
    var url = endpoints.catalogueUrl + req.url.toString();
    console.log("images url "+url);
    request.get(url)
        .on('error', function(e) { next(e); })
        .pipe(res);
  });

  app.get("/getProducts", function (req, res, next) {
    var x = endpoints.catalogueUrl+"/getProducts" ;//+ req.url.toString();
    console.log("getProducts "+x);
    helpers.simpleHttpRequest(x
     , res, next);
  });

  app.post("/newProduct", function (req, res, next) {
    var url = endpoints.catalogueUrl + req.url.toString();

    var body = '';
    console.log("add ");
    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      var product = qs.parse(body);
      let options = {  
        url: url,
        form: product
      };
      
      request.post(options, function(error, response, body) {
        console.log("data", response)
      });

      res.end();
    });

  });
  
  app.get("/tags", function(req, res, next) {
    helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
  });

  module.exports = app;
}());
