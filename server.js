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

app.post('/beers/:id/ratings', function(req, res, next) {
    var updateObject = { $push: { ratings: req.body.rating } };
    Beer.findByIdAndUpdate(req.param.id, updateObject, { new: true }, handler(res,next));
});

app.post('/beers/:beerId', function (req, res, next) {
    Beer.update({_id: req.params.beerId}, {$set: {'name': req.body.name, 'style': req.body.style, 'image_url':req.body.image_url, 'abv': req.body.abv}}, handler(res,next));
})

// // 4) to handle adding a comment to a post
// app.post('/beersDB/:beerId/comments', function(req, res) {
//   var update = { $push: { comments: req.body } };
//   Post.findByIdAndUpdate(req.params.postId, update, { new: true }, handler(res));
// });

// // 5) to handle deleting a comment from a post
// app.delete('/beersDB/:beerId/comments/:commentId', function(req, res) {
//   var update = { $pull: { comments: { _id: req.params.commentId } } };
//   Post.findByIdAndUpdate(req.params.postId, update, { new: true }, handler(res));
// });







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
