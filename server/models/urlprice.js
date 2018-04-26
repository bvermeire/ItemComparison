var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var priceOnDay = require("./priceonday").schema;

var UrlPriceSchema = new Schema({
  url: String,
  priceonday: [priceOnDay]
});

module.exports = mongoose.model("UrlPrice", UrlPriceSchema);
