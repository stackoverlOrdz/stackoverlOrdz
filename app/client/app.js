
angular.module('spark', [
  'spark.controller',
  'spark.factory',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'registerCtrl'
    })
    .otherwise({
      redirectTo: '/register'
    });
});

