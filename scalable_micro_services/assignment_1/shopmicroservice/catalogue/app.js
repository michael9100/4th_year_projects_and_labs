var http = require("http"),
  fs = require("fs"),
  url = require("url");
var p = require("path");
var qs = require("querystring");
var mysql = require("mysql");
var root = __dirname;
var headers = ["Product Name", "Price", "Picture", "Buy Button"];

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shop"
});
var cart = [];
var theuser = null;
var theuserid = null;
var server = http.createServer(function(request, response) {
  var path = url.parse(request.url).pathname;
  var url1 = url.parse(request.url);
  console.log(request.method);
  if (request.method == "POST") {
    console.log("Entering here POST");
    switch (path) {
      // ==============================================
      // New Product
      // ==============================================
      case "/newProduct":
        var body = "";
        request.on("data", function(data) {
          body += data;
        });

        request.on("end", function() {
          var product = qs.parse(body);
          console.log("body ====", product);
        });

        response.end();

        break;
    } //switch
  } else {
    console.log("Entering here Else");
    switch (path) {
      case "/getProducts":
        console.log("getProducts");
        response.writeHead(200, {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*"
        });
        var query = "SELECT * FROM products ";

        db.query(query, [], function(err, rows) {
          if (err) throw err;
          console.log(JSON.stringify(rows, null, 2));
          response.end(JSON.stringify(rows));
          console.log("Products sent");
        });

        break;
      case "/getProduct":
        console.log("getProduct");
        var body = "";
        request.on("data", function(data) {
          body += data;
        });

        request.on("end", function() {
          var product = JSON.parse(body);
          response.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*"
          });
          console.log(JSON.stringify(product, null, 2));
          var query = "SELECT * FROM products where productID=" + product.id;

          db.query(query, [], function(err, rows) {
            if (err) throw err;
            console.log(JSON.stringify(rows, null, 2));
            response.end(JSON.stringify(rows[0]));
            console.log("Products sent");
          });
        });

        break;
    }
  }
});

server.listen(3002);
