'use strict';

/* Controllers */

var jukeboxControllers = angular.module('jukeboxControllers', []);

jukeboxControllers.controller('PlaylistCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    console.log('IM IN YR playlist controller...')
}]);

jukeboxControllers.controller('PizzaCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    console.log('IM IN YR pizza controller...')
}]);
