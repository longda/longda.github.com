'use strict';

/* App Module */

var jukeboxApp = angular.module('jukeboxApp', [
  'ngRoute',
  'jukeboxControllers'
]);

jukeboxApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/pizza', {
        template: 'nom',
        controller: "PizzaCtrl"
      })
      .otherwise({
        redirectTo: '/pizza'
      })

}]);