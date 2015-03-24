'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.stars = 1.0;
  $scope.planets = 0.5;
  $scope.earth = 5;
  $scope.life = 1.0;
  $scope.intelligence = 1.0;
  $scope.civilizations = 0.1;
  $scope.length = 1000000;
}]);