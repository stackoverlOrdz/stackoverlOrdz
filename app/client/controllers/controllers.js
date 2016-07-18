angular.module('spark.controller', ['ngAnimate', 'ui.bootstrap'])

.controller('registerCtrl', function($scope, $location){

  $scope.load = function(){
    //re-routes to takesurvey view upon login button click
    $location.path('/takesurvey');
  }

})

.controller('takesurveyCtrl', function($scope, $location, surveyFactory, mainFactory){

  //defines get request from surveyFactory http request
  $scope.getRequest = surveyFactory.getRequest;

  $scope.survey = function(){
    //initiates get for the survey data from surveyFactory http request
    $scope.getRequest()
    //async promise to reassign suvery data to local scope
    .then(function(data){
      // UNCOMMENT TO TEST console.log('Survey data received from traitify', data)
      $scope.data = data;
      //Re-routes the view to the survey
      $location.path('/survey');
    });
  };

  //posts survey response data and receives survey assessment results from traitify
  $scope.getMatches = mainFactory.getRequest;

  $scope.matches = function(){
    //initializes the get request for the matches data from database
    $scope.getMatches();
    //Re-routes the view to the main
    $location.path('/main');
  };

})

.controller('surveyCtrl', function($scope, $location, surveyFactory, mainFactory,appData,$rootScope){

   //loads survey data from traitify API through surveyFactory http get request
   $scope.questions = surveyFactory.getData();
   $scope.questions[0].isCurrentQuestion = true;
   console.log($scope.questions);

   //storage for survey response data to send to traitify for anaylsis
   $scope.response = [];

   //storage for survey assessment results sent back from traitify API
   $scope.surveyResults = [];

  //  $scope.currentQuestion = 0;
  console.log($scope.currentQuestion);
   $scope.addResponse = function () {
    $scope.loading = true;
    surveyFactory.postRequest($scope.response)
      .then(function (matchesData) {
        $scope.loading = false;
        //UNCOMMENT TO TEST console.log('This is the matchesData', matchesData);

        //$scope.matchesData = matchesData;
        $rootScope.matchesData = matchesData;
        //Re-routes the view to the main
        //appData.set('cacheScope', $scope);

        $location.path('/main');
        //$scope = appData.get('cacheScope');

      })
      .catch(function (error) {
        console.log(error);
      });
   };

   //Time stamp for page load
   $scope.date = Date.now();

   //Builds response data array for "That's me" response
   $scope.yes = function(id, index){
     //Storage for response object per traitify API specs
     var obj = {}
     //Assignment of id property from ng-click this object
     obj.id = id;
     //Assignment of response property to true per traitify API specs
     obj.response = true;
     //Assignment of time_taken property (Page load stamp less ng-click stamp in ms)
     obj.time_taken = Date.now() - $scope.date;
     //records response in $scope.response array
     $scope.response.push(obj);

     $scope.questions[index].isCurrentQuestion = false;

     if ($scope.questions[index + 1] === undefined) {
       $scope.addResponse();
     } else {
       $scope.questions[index + 1].isCurrentQuestion = true;
       $scope.date = Date.now();
     }
   };

   //Builds response data array for "Not Quite" response
   $scope.no = function(id, index){
     //Storage for response object per traitify API specs
     var obj = {}
     //Assignment of id property from ng-click this object
     obj.id = id;
     //Assignment of response property to false per traitify API specs
     obj.response = false;
     //Assignment of time_taken property (Page load stamp less ng-click stamp in ms)
     obj.time_taken = Date.now() - $scope.date;
     //records response in $scope.response array
     $scope.response.push(obj);

     $scope.questions[index].isCurrentQuestion = false;

     if ($scope.questions[index + 1] === undefined) {
       $scope.addResponse();
     } else {
       $scope.questions[index + 1].isCurrentQuestion = true;
       $scope.date = Date.now();
     }
   };



  $scope.getRequest = function(){
    mainFactory.getRequest()
    .then(function(matches){
      $scope.questions = matches;
    })
    .catch(function(error){
      console.error(error);
    });
  };

  $scope.logout = function(){
    $scope.loading = true;
    mainFactory.logoutRequest()
    .then(function(matches){
      $scope.loading = false;
      $location.path('/register');
    })
    .catch(function(error){
      console.error(error);
    });
  }
});
