angular.module('spark', [
  'ngRoute'
])

.config(function($routeProvider, $httpProvider){
  $routeProvider
  .when('/', {
    templateURL: '',
    controller: ''
  })
  .when('', {
    templateURL: '',
    controller: ''
  })
  .otherwise({
      redirectTo: '/index'
    });
});
