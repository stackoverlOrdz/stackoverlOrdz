angular.module('spark.factory', [])

.factory('registerFactory', function ($http) {

  var getRequest = function(){
    return $http({
      method: 'GET',
      url: '/login',
    }).then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log("Get request error!");
      });
  }

  return {
    getRequest: getRequest
  }
})
