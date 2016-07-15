angular.module('spark.controller', [])

.controller('registerCtrl', function($scope, $location){

  $scope.load = function(){
    $location.path('/takesurvey');
  }

})

.controller('takesurveyCtrl', function($scope, $location, surveyFactory, takesurveyFactory){

  $scope.getRequest = surveyFactory.getRequest;
  $scope.getMatches = takesurveyFactory.getRequest;

  $scope.survey = function(){
    //Makes the get for the survey data
    $scope.getRequest();
    //Re-routes the view to the survey
    $location.path('/survey');
  };

  $scope.matches = function(){
    //Makes the get for the survey data
    $scope.getMatches();
    //Re-routes the view to the survey
    $location.path('/main');
  };

})

.controller('surveyCtrl', function($scope, $location, surveyFactory){

   $scope.data = [];

   $scope.response = [];

   $scope.getRequest = function(){
     surveyFactory.getRequest()
       .then(function(data){
         $scope.data = data;
       }).catch(function(error){
         console.log(error);
       });
   };

   $scope.addResponse = function (response) {
    $scope.loading = true;
    surveyFactory.postRequest($scope.response)
      .then(function () {
        $scope.loading = false;
        // response is matches object
        $scope.matches = response;
        //init matches view and show
        $location.path('/main');
      })
      .catch(function (error) {
        console.log(error);
      });
   };

   $scope.yes = function(event, id){
     event = event;
     var obj = {}
     obj.id = id;
     obj.response = event;
     obj.time_taken = 1000;
     $scope.response.push(obj);
   };

   $scope.no = function(event, id){
     event = false;
     var obj = {}
     obj.id = id;
     obj.response = event;
     obj.time_taken = 1000;
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
