//
// angular.module('spark', [
//   'spark.controller',
//   'spark.factory',
//   'ngRoute'
// ])

// .config(function($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/register', {
//       templateUrl: 'views/register.html',
//       controller: 'registerCtrl'
//     })
//     .when('/survey', {
//       templateUrl: 'views/survey.html',
//       controller: 'surveyCtrl'
//     })
//     .when('/main', {
//       templateUrl: 'views/main.html',
//       controller: 'mainCtrl'
//     })
//     .otherwise({
//       redirectTo: '/register'
//     });
// });

var app = angular.module('spark', []);
app.controller('sparkCtrl', function($scope, $http) {

  $scope.signIn = function() {
    $http.get('/login').then(function(result) {
      console.log(result);
    }, function(err) {
      console.log(err);
    });
  };
});
