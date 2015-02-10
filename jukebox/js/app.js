'use strict';

/* App Module */

var jukeboxApp = angular.module('jukeboxApp', [
  'ngRoute',
  'jukeboxControllers'
]);

jukeboxApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/playlist/:username/:setname', {
        templateUrl: 'partials/playlist.html',
        controller: 'PlaylistCtrl'
      })
      .when('/pizza', {
        template: 'nom',
        controller: "PizzaCtrl"
      })
      .otherwise({
        redirectTo: '/pizza'
      })

}]);
