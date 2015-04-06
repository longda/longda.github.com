'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.stars = 6.9;
  $scope.planets = 0.9;
  $scope.earth = 4.6;
  $scope.life = 0.9;
  $scope.intelligence = 0.9;
  $scope.civilizations = 0.1;
  $scope.length = 100;
}]);