angular.module('spark.controller', ['ngAnimate', 'ui.bootstrap'])

.controller('registerCtrl', function($scope, $location){

  $scope.login = function(){
    $location.path('/takesurvey');
  }

  $scope.logout = function(){
    $scope.loading = true;
    mainFactory.logoutRequest()
    .then(function(){
      $scope.loading = false;
      $location.path('/register');
    })
    .catch(function(error){
      console.error('++++ line 17 controllers.js ERROR! ', error);
    });
  }

})

.controller('takesurveyCtrl', function($scope, $location, surveyFactory, mainFactory, $rootScope){

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
    $scope.getMatches()
    //async promise to reassign matchesData to local scope from database query
    .then(function(response){
      $rootScope.matchesData = response;
      $location.path('/main');
    })
  };

  $scope.logout = function(){
    $scope.loading = true;
    mainFactory.logoutRequest()
    .then(function(){
      $scope.loading = false;
      $location.path('/register');
    })
    .catch(function(error){
      console.error('++++ line 60 controllers.js ERROR! ', error);
    });
  }

})

.controller('surveyCtrl', function($scope, $location, surveyFactory, mainFactory, $rootScope){

  //loads survey data from traitify API through surveyFactory http get request
  //UNCOMMENT TO TEST console.log(++++line 69 controllers.js SUVERY QUESTIONS ARRAY, $scope.questions);
  $scope.questions = surveyFactory.getData();

  //Assigns default of true to initial surevy question
  if($scope.questions[0] !== undefined){
  $scope.questions[0].isCurrentQuestion = true;
}
  //storage for survey response data to send to traitify for anaylsis
  $scope.response = [];

  //storage for survey assessment results sent back from traitify API
  $scope.surveyResults = [];

   $scope.addResponse = function () {
    $scope.loading = true;
    surveyFactory.postRequest($scope.response)
      .then(function (matchesData) {
        $scope.loading = false;
        //UNCOMMENT TO TEST console.log('++++line 88 controllers.js This is the matchesData', matchesData);
        $rootScope.matchesData = matchesData;
        $location.path('/main');
      })
      .catch(function (error) {
        console.error('++++ line 92 controllers.js ERROR! ', error);
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
      console.error('++++ line 151 controllers.js ERROR! ', error);
    });
  };

  $scope.logout = function(){
    $scope.loading = true;
    mainFactory.logoutRequest()
    .then(function(){
      $scope.loading = false;
      $location.path('/register');
    })
    .catch(function(error){
      console.error('++++ line 163 controllers.js ERROR! ', error);
    });
  }
});
