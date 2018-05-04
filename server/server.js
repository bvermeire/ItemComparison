// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express");
var app = express(); 
var bodyParser = require("body-parser");
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var cors = require("cors");

// Cross-origin resource sharing
app.use(cors());
app.options("http://localhost:3000", cors());


// setup the mongo database
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/price");

//import the database scheme
var ItemInfo = require("./models/iteminfo");
var UrlPrice = require("./models/urlprice");
var PriceOnDay = require("./models/priceonday");

// implement security
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://pricing.eu.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://localhost:8080/api/sitesinfo",
  issuer: "https://pricing.eu.auth0.com/",
  algorithms: ["RS256"]
});
app.use(jwtCheck);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the port
var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {

  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

// more routes for our API will happen here
// on routes that end in /sites
// ----------------------------------------------------
router
  .route("/iteminfo")
  // create a new item with url, price and itemname (http://localhost:8080/api/iteminfo)
  .post(async function(req, res) {
    var itemInfo = new ItemInfo(); // create a new instance of the SiteInfo model
    itemInfo.itemname = req.body.itemname; // set the item name (comes from the request)
    itemInfo.wantedprice = req.body.wantedprice; //set the wanted price
    itemInfo.priceperurlday = []; // as url comes in array, we have to split array
    itemInfo.lowestPrice=0;
    itemInfo.currentPrice=0;
    let urlarray = JSON.parse(JSON.stringify(req.body.url));
    for (url in urlarray) {
      var urlPrice = new UrlPrice(); //create a new instance of the UrlPrice model
      urlPrice.url = urlarray[url]; //set the url
      urlPrice.priceonday = [];
      itemInfo.priceperurlday.push(urlPrice);
    }
    // save item to DB
    try {
      await itemInfo.save();
      res.json({ message: "Item Info created!" });
    } catch (err) {
      res.send(err);
    }
  })
  // get all the items (http://localhost:8080/api/iteminfo)
  .get(function(req, res) {
    ItemInfo.find(function(err, itemsinfo) {
      if (err) res.send(err);

      res.json(itemsinfo);
    });
  });
// on routes that end in /iteminfo/:iteminfo_id
// ----------------------------------------------------
router
  .route("/iteminfo/:itemInfo_id")

  // get the iteminfo with that id (accessed at GET http://localhost:8080/api/iteminfo/:iteminfo_id)
  .get(function(req, res) {
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);
      res.json(itemInfo);
    });
  })
  // delete the iteminfo with this id (accessed at DELETE http://localhost:8080/api/iteminfo/:iteminfo_id)
  .delete(function(req, res) {
    ItemInfo.remove(
      {
        _id: req.params.itemInfo_id
      },
      function(err, itemInfo) {
        if (err) res.send(err);

        res.json({ message: "Successfully deleted" });
      }
    );
  })
  .post(function(req,res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);
      itemInfo.itemname = req.body.itemname; // update the item info
      itemInfo.wantedprice = req.body.wantedprice;
      itemInfo.lowestPrice = req.body.lowestPrice;
      // save the siteinfo
      itemInfo.save(function(err) {
      if (err) res.send(err);

      res.json({ message: "itemInfo updated!" });

      })
    })
  })
router
  .route("/iteminfoprice/:itemInfo_id/url")
  .get(function(req,res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);
        res.json(itemInfo.priceperurlday)
    })
  })  
  .post(function(req,res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      var urlPrice = new UrlPrice(); //create a new instance of the UrlPrice model
      urlPrice.url = req.body.url; //set the url
      itemInfo.priceperurlday.push(urlPrice);
      // save item to DB
     itemInfo.save(function(err) {  
      if (err) res.send(err);

     res.json({ message: "site added!" });
      }) 
    })
  });
  router
  .route("/iteminfoprice/:itemInfo_id/url/:priceOnDay_id")
  .get(function(req,res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);
      for (var i = 0; i < itemInfo.priceperurlday.length; i++) {
        if (itemInfo.priceperurlday[i] !== undefined) {
          if (itemInfo.priceperurlday[i]._id == req.params.priceOnDay_id) {
            res.json(itemInfo.priceperurlday[i]);
          }
        }
      }
    })
  })
  .delete(function(req,res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);
      for (var i = 0; i < itemInfo.priceperurlday.length; i++) {
        if (itemInfo.priceperurlday[i] !== undefined) {
          if (itemInfo.priceperurlday[i]._id == req.params.priceOnDay_id) {
            itemInfo.priceperurlday[i].remove();
            itemInfo.save();
            res.json({ message: "itemInfo deleted!" });
          }
        }
      }
    })
  })
  .post(function (req,res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);
      let price = new PriceOnDay()
      price.date = new Date()
      price.price = req.body.price
      for (var i = 0; i < itemInfo.priceperurlday.length; i++) {
        if (itemInfo.priceperurlday[i] !== undefined) {
          if (itemInfo.priceperurlday[i]._id == req.params.priceOnDay_id) {
            itemInfo.priceperurlday[i].priceonday.push(price)
            
            console.log(itemInfo)
           
            itemInfo.save();
            res.json({ message: "Price added!" });
          }
        }
      }
    })
  })
  .put(function(req,res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);

      for (var i = 0; i < itemInfo.priceperurlday.length; i++) {
        if (itemInfo.priceperurlday[i] !== undefined) {
          if (itemInfo.priceperurlday[i]._id == req.params.priceOnDay_id) {
            itemInfo.priceperurlday[i].url = req.body.url
            itemInfo.save();
            res.json({ message: "url updated!" });
          }
        }
      }
    })
  });
  router
  .route("/iteminfoprice/:itemInfo_id/url/:priceOnDay_id/:price_id")
  .delete(function(req,res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);
      for (var i = 0; i < itemInfo.priceperurlday.length; i++) {
        if (itemInfo.priceperurlday[i] !== undefined) {
          if (itemInfo.priceperurlday[i]._id == req.params.priceOnDay_id) {
            for(var j = 0; j<itemInfo.priceperurlday[i].priceonday.length;j++){
              if(itemInfo.priceperurlday[i].priceonday[j].id!==undefined){
                if(itemInfo.priceperurlday[i].priceonday[j].id == req.params.price_id){
                  itemInfo.priceperurlday[i].priceonday[j].remove()
                 itemInfo.save();
                  res.json({ message: "price deleted!" });
                }
                
              }
            }
            
            
          }
        }
      }
    })
  })
  .put(function(req, res){
    ItemInfo.findById(req.params.itemInfo_id, function(err, itemInfo) {
      if (err) res.send(err);
      for (var i = 0; i < itemInfo.priceperurlday.length; i++) {
        if (itemInfo.priceperurlday[i] !== undefined) {
          if (itemInfo.priceperurlday[i]._id == req.params.priceOnDay_id) {
            for(var j = 0; j<itemInfo.priceperurlday[i].priceonday.length;j++){
              if(itemInfo.priceperurlday[i].priceonday[j].id!==undefined){
                if(itemInfo.priceperurlday[i].priceonday[j].id == req.params.price_id){
                  itemInfo.priceperurlday[i].priceonday[j].price = req.body.price
                  itemInfo.save();
                  res.json({ message: "price updated!" });
                }
                
              }
            }
            
            
          }
        }
      }
    })
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
