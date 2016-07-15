
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
    .when('/takesurvey', {
      templateUrl: 'views/takesurvey.html',
      controller: 'takesurveyCtrl'
    })
    .when('/survey', {
      templateUrl: 'views/survey.html',
      controller: 'surveyCtrl'
    })
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'mainCtrl'
    })
    .otherwise({
      redirectTo: '/register'
    });
});

