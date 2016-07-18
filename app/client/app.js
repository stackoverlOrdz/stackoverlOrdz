
angular.module('spark', [
  'spark.controller',
  'spark.factory',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'views/register.html',
        controller: 'registerCtrl'
    })
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
      controller: 'surveyCtrl'
    })
    .otherwise({
      redirectTo: '/takesurvey'
    });
});

