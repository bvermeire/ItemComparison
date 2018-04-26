var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PriceOnDayUrlSchema = new Schema({
  date: { type: Date, default: new Date() },
  price: Number
});

module.exports = mongoose.model("PriceOnDay", PriceOnDayUrlSchema);
