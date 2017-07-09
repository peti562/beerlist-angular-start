var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/beers', function() {
  console.log("DB connection succesfully established!!!");
})

var Beer = require("./beerModel");

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function handler (res,next){
  return function (err, beer) {
    if (err) {
      return next(err);
    } else {
      return res.send(beer);
    }
  };
}

app.get('/beers', function (req, res, next) {
  Beer.find(function (error, beers) {
    if (error) {
      return next(error);
    } else {
      return res.send(beers);
    }
  });
});

app.post('/beers', function(req, res, next) {
  Beer.create(req.body, handler(res,next));
});

app.delete('/beers/:beerId', function(req, res, next) {
  Beer.findByIdAndRemove(req.params.beerId, handler(res,next));
});

app.post('/beers/:beerId/ratings', function(req, res, next) {
    var updateObject = { $push: { ratings: req.body.rating } };
    Beer.findByIdAndUpdate(req.params.beerId, updateObject, { new: true }, handler(res,next));
});

app.put('/beers/:beerId', function(req, res, next) {
  Beer.findByIdAndUpdate(req.params.beerId, req.body, { new: true }, function(err, beer) {
    if (err) {
      return next(err);
    }
    res.send(beer);
  });
});

app.post('/beers/:beerId/reviews', function(req, res, next) {
  var beerId = req.params.beerId;
  var review = {
    user: req.body.user,
    review: req.body.review
  }
  Beer.findById(beerId, function (error, result){
    if(error) { return console.error(error); }
    result.reviews.push(review);
    result.save(function(err,data){
      if(error) { return console.log(error); }
    res.send(data);
    });
  })
});









// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});









app.listen(8000, function() {
  console.log("yo yo yo, on 8000!!")
});
