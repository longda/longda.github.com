'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.stars = 6.9;
  $scope.planets = 0.9;
  $scope.earth = 4.6;
  $scope.life = 0.9;
  $scope.intelligence = 0.9;
  $scope.civilizations = 0.1;
  $scope.length = 1000;
}]);