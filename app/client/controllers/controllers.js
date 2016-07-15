angular.module('spark.controller', [])

.controller('registerCtrl', function($scope, registerFactory){
 $scope.data = {};
 $scope.getRequest = function(){
   registerFactory.getRequest()
     .then(function(data){
       $scope.data = data;
     }).catch(function(error){
       console.log(error);
     });
 };
})

.controller('takesurveyCtrl', function($scope, $location, takesurveyFactory){
 $scope.data = {};

 $scope.getRequest = function(){
   takesurveyFactory.getRequest()
     .then(function(data){
       if(response.route === "survey"){
          $scope.loading = false;
          $scope.data = data;
          $location.path('/survey');
        } if(response.route === "matches"){
          $scope.loading = false;
          $location.path('/main');
        }
     }).catch(function(error){
       console.log(error);
     });
 };

})

.controller('surveyCtrl', function($scope, $location, surveyFactory){

 $scope.getRequest = function(){
   surveyFactory.getRequest()
     .then(function(data){
       $scope.data = data;
     }).catch(function(error){
       console.log(error);
     });
 };

 $scope.getRequest();

 $scope.data = [
 {
   "id": "2a7f6eca-f2c8-44c9-bb6c-4a280e74c3a9",
   "position": 1,
   "caption": "Extreme Sports",
   "image_desktop": "https://cdn.traitify.com/slides/2a7f6eca-f2c8-44c9-bb6c-4a280e74c3a9/desktop_retina",
   "image_desktop_retina": "https://cdn.traitify.com/slides/2a7f6eca-f2c8-44c9-bb6c-4a280e74c3a9/desktop_retina",
   "response": null,
   "time_taken": null,
   "completed_at": null,
   "created_at": 1468251485047,
   "focus_x": 50,
   "focus_y": 50
 }];


 $scope.response = [];

 $scope.getRequest = function(){
   surveyFactory.getRequest()
     .then(function(data){
       $scope.data = data;
     }).catch(function(error){
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
    console.log($scope.response)
  };

  $scope.no = function(event, id){
    event = false;
    var obj = {}
    obj.id = id;
    obj.response = event;
    obj.time_taken = 1000;
    $scope.response.push(obj);
    console.log($scope.response)
  };


  $scope.addResponse = function (response) {
    $scope.loading = true;
    surveyFactory.postRequest($scope.response)
      .then(function () {
        $scope.loading = false;
        $location.path('/main');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
})

.controller('mainCtrl', function($scope, mainFactory){
  $scope.message = 'Made it to main view';
  $scope.data = {};

  $scope.getRequest = function(){
    mainFactory.getRequest()
    .then(function(matches){
      $scope.data = matches;
    })
    .catch(function(error){
      console.error(error);
    });
  };
  $scope.getRequest();
});
