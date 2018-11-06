var express = require("express") 
var app = express()


// Import API's
var auth = require('./api/auth')
var list = require('./api/list')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Mount API endpoints */
app.use(auth)
app.use(list)


app.post('/api/items', function(req, res) {
  res.send({items: ['item_1', 'item_2']})
})


var server = app.listen(3001, () => {
  var port = server.address().port;
  console.log("Frontend service running on port", app.get("env"), port)
})
