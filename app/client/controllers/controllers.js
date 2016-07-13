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
});

