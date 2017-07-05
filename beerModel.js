var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name: String,
  style: String,
  image_url: String,
  abv: Number,
  ratings: Object
});

var Beer = mongoose.model('beer', beerSchema)

module.exports = Beer
