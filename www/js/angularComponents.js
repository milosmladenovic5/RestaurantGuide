var myApp = angular.module('myApp', ['ngRoute'] );

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/nearbyRestaurants',{
    templateUrl: 'partials/nearbyRestaurants.html',
    controller: 'NearbyRestaurantsController'
  }).
  when('/restaurantDetails/:placeId',{
    templateUrl: 'partials/placeDetails.html',
    controller: 'PlaceDetailsController'
  }).
  otherwise('/homepage',{
    templateUrl:'partials/homepage.html',
    controller: 'HomepageController'
  });
}]);
