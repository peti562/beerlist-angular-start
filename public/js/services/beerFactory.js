app.factory('beerFactory', function($http) {

  var beerFactory = {};

  beerFactory.getBeers = function() {
    return $http.get('/beers')
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

  beerFactory.addBeer = function(newBeer) {
  	return $http.post('/beers', newBeer)
  	  .then(function(response) {
        return angular.copy(response.data);
      });
  };

  beerFactory.addRating = function(beerId, newRating) {
  	return $http.post('/beers/'+beerId+'/ratings', newRating)
  	  .then(function(response) {
        return angular.copy(response.data);
      });
  };

  beerFactory.updateBeer = function(beerId, newDetails) {
  	return $http.put('/beers/' + beerId, newDetails)
  	  .then(function(response) {
        return angular.copy(response.data);
      });
  };

  beerFactory.removeBeer = function(beerId) {
    return $http.delete('/beers/' + beerId)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

  return beerFactory;


});
