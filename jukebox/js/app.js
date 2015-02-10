'use strict';

/* App Module */

var jukeboxApp = angular.module('jukeboxApp', [
  'ngRoute'
]);

jukeboxApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/pizza', {

      })
      .otherwise({
        redirectTo: '/pizza'
      })

}]);
