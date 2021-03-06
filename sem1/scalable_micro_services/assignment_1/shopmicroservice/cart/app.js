var express = require("express")
    , morgan = require("morgan")
    , path = require("path")
    , bodyParser = require("body-parser")

    , app = express();


app.use(morgan('combined'));
app.use(morgan("dev", {}));
app.use(bodyParser.json());

//app.use(morgan("dev", {}));
var cart = [];

app.post("/add", function (req, res, next) {
    var obj = req.body;
    console.log("add ");
    console.log("Attempting to add to cart: " + JSON.stringify(req.body));


    //  var obj = JSON.parse(body);

    //       console.log('addToCart id '+id)
    var max = 0;
    var ind = 0;
    console.log("customerID:", obj.custId)
    if (cart["" + obj.custId] === undefined)
        cart["" + obj.custId] = [];
    var c = cart["" + obj.custId];
    for (ind = 0; ind < c.length; ind++)
        if (max < c[ind].cartid)
            max = c[ind].cartid;
    var cartid = max + 1;
    var data = {
        "cartid": cartid,
        "productID": obj.productID,
        "name": obj.name,
        "price": obj.price,
        "image": obj.image,
        "quantity": obj.quantity
    };
    console.log(JSON.stringify(data));
    
    var item;
    var itemFound = false;
    for (let i = 0; i < c.length; i++) {
        item = c[i];

        if (item.productID == data.productID) {
            item.quantity = parseInt(item.quantity) + parseInt(data.quantity)
            itemFound = true;
            break;
        }
    }
    
    if(!itemFound) {
        c.push(data);
    }

    console.log("item", item)
    

    res.status(201);

    res.send("");


});

/* toDO */
app.delete("/cart/:custId/items/:id", function (req, res, next) {
    var body = '';
    console.log("Delete item from cart: for custId " + req.url + ' ' +
        req.params.id.toString());
    console.log("delete ");
    // console.log("id", req.params.id )
    // console.log("custid", req.params.custId )
    var custId = req.params.custId;
    var itemId = req.params.id;

    var c = cart["" + req.params.custId]
    
    console.log("Cart for me, =================", c);
    console.log("Cart Size", c.length)

    for (i = 0; i < c.length; i++) {
        if (c[i].cartid == itemId) {
            console.log("Item found ",c[i])
            c.splice(i, 1)
        }
    }

    console.log("New Cart, =================", c);


    res.send(' ');


});


app.get("/cart/:custId/items", function (req, res, next) {
    var custId = req.params.custId;

    console.log("======================================================================================")
    console.log("mycart", cart["" + custId])
    console.log("======================================================================================")

    console.log("getCart" + custId);


    console.log('custID ' + custId);


    console.log(JSON.stringify(cart["" + custId], null, 2));

    res.send(JSON.stringify(cart["" + custId]));
    console.log("cart sent");

});


var server = app.listen(process.env.PORT || 3003, function () {
    var port = server.address().port;
    console.log("App now running in %s mode on port %d", app.get("env"), port);
});
