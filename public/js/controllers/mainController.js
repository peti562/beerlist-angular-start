app.controller('beerController', ['$scope', 'beerFactory', function($scope, beerFactory) {

  $scope.beers = [];

  $scope.addBeer = function() {
    var newBeer = {
      name: $scope.name,
      style: $scope.style,
      abv: $scope.abv,
      image_url: $scope.image_url,
    };
    beerFactory.addBeer(newBeer)
      .then(function(beer) {
        $scope.beers.push(beer);
      })
      .catch(function(error) {
        console.log(error)
      });
  }

  $scope.addRating = function() {
    var newRating = { rating: this.rating };
    var beerId = this.beer._id
    beerFactory.addRating(beerId, newRating)
      .then(function(beer) {
        for (var i = 0; i < $scope.beers.length; i++) {
          if ($scope.beers[i]._id === beerId) {
            $scope.beers[i] = beer
          }
        }
        $scope.calcRatingsAverage();
      })
      .catch(function(error) {
        console.log(error)
      });
  }

  $scope.updateBeer = function() {
    var beerId = this.beer._id;
    var newDetails = {
      name: this.nameUpdate,
      style: this.styleUpdate,
      abv: this.abvUpdate,
      image_url: this.image_urlUpdate,
    };
    beerFactory.updateBeer(beerId, newDetails)
      .then(function(beer) {
        for (var i = 0; i < $scope.beers.length; i++) {
          if ($scope.beers[i]._id === beerId) {
            $scope.beers[i] = beer
          }
        }
        $scope.calcRatingsAverage();
      })
      .catch(function(error) {
        console.log(error)
      });
  }

  $scope.removeBeer = function() {
    var beerId = this.beer._id
    beerFactory.removeBeer(beerId)
      .then(function(beer) {
        for (var i = 0; i < $scope.beers.length; i++) {
          if ($scope.beers[i]._id === beer._id) {
            $scope.beers.splice(i, 1);
            break;
          }
        }
      })
      .catch(function(error) {
        console.log(error)
      });
  }

  $scope.calcRatingsAverage = function() {
    for (var i = 0; i < $scope.beers.length; i++) {
      var rs = 0;
      var thisBeerRatings = $scope.beers[i].ratings;
      for (var j = 0; j < thisBeerRatings.length; j++) {
        rs += thisBeerRatings[j];
      }
      $scope.beers[i].ratingsAvg = rs / thisBeerRatings.length;
    }
  }

  $scope.averageSort = function() {
    $scope.beers.sort(function(a, b) {
      return a.ratingsAvg - b.ratingsAvg;
    });
  }

  beerFactory.getBeers()
    .then(function(beers) {
      $scope.beers = beers;
      $scope.calcRatingsAverage();
    })
    .catch(function(error) {
      console.log(error)
    });

  // $scope.calcRatingsAverage();
}]);
