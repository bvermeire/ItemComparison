var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UrlPrice = require("./urlprice").schema;

var ItemInfoSchema = new Schema({
  itemname: String,
  wantedprice: Number,
  priceperurlday: [UrlPrice],
  lowestPrice:Number
});

module.exports = mongoose.model("ItemInfo", ItemInfoSchema);
