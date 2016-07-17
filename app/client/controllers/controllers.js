angular.module('spark.controller', [])

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

.controller('surveyCtrl', function($scope, $location, surveyFactory){

   //loads survey data from traitify API through surveyFactory http get request
   $scope.data = surveyFactory.getData();

   //storage for survey response data to send to traitify for anaylsis
   $scope.response = [];

   //storage for survey assessment results sent back from traitify API
   $scope.surveyResults = [];

   $scope.addResponse = function () {
    $scope.loading = true;
    surveyFactory.postRequest($scope.response)
      .then(function (matchesData) {
        $scope.loading = false;
        //UNCOMMENT TO TEST console.log('This is the matchesData', matchesData);
        $scope.surveyResults = matchesData;
        //Re-routes the view to the main
        $location.path('/main');
      })
      .catch(function (error) {
        console.log(error);
      });
   };

   //Time stamp for page load
   $scope.date = Date.now();

   //Builds response data array for "That's me" response
   $scope.yes = function(id){
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
   };

   //Builds response data array for "Not Quite" response
   $scope.no = function(id){
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
   };

})

.controller('mainCtrl', function($scope, $location, surveyFactory, mainFactory){

  //loads currentUser data from Facebook API through surveyFactory http post response
  $scope.data = []

  $scope.data.push(surveyFactory.postData());

  //UNCOMMENT TO TEST console.log('This is the currentUser data', $scope.data);

  //UNCOMMENT FOR TESTING PURPOSES
  // $scope.data = [{'currentUser': {
  // 'email': "ndrewleonardi2@gmail.com",
  // 'facebookId': "10210427029418377",
  // 'name': "Andrew Leonardi",
  // 'picture': "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10173736_10203834730535025_4221067989246668134_n.jpg?oh=d632046bb11e6f6fbb26a1ee60245f7b&oe=582743C7"
  // }}];

  $scope.getRequest = function(){
    mainFactory.getRequest()
    .then(function(matches){
      $scope.data = matches;
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
