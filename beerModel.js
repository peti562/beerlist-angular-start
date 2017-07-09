var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  user: String,
  review: String
});

var beerSchema = new Schema({
  name: String,
  style: String,
  image_url: String,
  abv: Number,
  ratings: [Number],
  ratingAvg: Number,
  reviews: [reviewSchema]
});



var Beer = mongoose.model('beer', beerSchema)

module.exports = Beer
