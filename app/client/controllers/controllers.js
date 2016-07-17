angular.module('spark.controller', [])

.controller('registerCtrl', function($scope, $location){

  $scope.load = function(){
    //re-routes to takesurvey view upon login button click
    $location.path('/takesurvey');
  }

})

.controller('takesurveyCtrl', function($scope, $location, surveyFactory, takesurveyFactory){

  //contains loaded surevy data from traitify API
  $scope.data = [];

  //defines get request from tavesurveyFactory http request
  $scope.getRequest = surveyFactory.getRequest;

  //posts completed survey data and receives surevy results from traitify
  $scope.getMatches = takesurveyFactory.getRequest;

  $scope.survey = function(){
    //initiates get for the survey data from surveyFactory http request
    $scope.getRequest()
    //async promise to reassign suvery data array from
    .then(function(data){
      console.log('=',data)
      $scope.data = data;
      //Re-routes the view to the survey
      $location.path('/survey');
    });
  };

  $scope.matches = function(){
    //Makes the get for the survey data
    $scope.getMatches();
    //Re-routes the view to the survey
    $location.path('/main');
  };

})

.controller('surveyCtrl', function($scope, $location, surveyFactory){

   $scope.data = surveyFactory.getData();

   $scope.response = [];

   $scope.date = Date.now();

   $scope.addResponse = function () {
    $scope.loading = true;
    surveyFactory.postRequest($scope.response)
      .then(function (matchesData) {
        $scope.loading = false;
        console.log(matchesData);
        // response is matches object
        //$scope.matches = $scope.response;
        //init matches view and show
        $location.path('/main');
      })
      .catch(function (error) {
        console.log(error);
      });
   };

   $scope.yes = function(id){
     var obj = {}
     obj.id = id;
     obj.response = true;
     obj.time_taken = Date.now() - $scope.date;
     $scope.response.push(obj);
   };

   $scope.no = function(id){
     var obj = {}
     obj.id = id;
     obj.response = false;
     obj.time_taken = Date.now() - $scope.date;
     $scope.response.push(obj);
   };

})

.controller('mainCtrl', function($scope, mainFactory){

  $scope.data = ['Test'];

  $scope.getRequest = function(){
    mainFactory.getRequest()
    .then(function(matches){
      $scope.data = matches;
    })
    .catch(function(error){
      console.error(error);
    });
  };

  // $scope.getRequest();
});
