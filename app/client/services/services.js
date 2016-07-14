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

.factory('surveyFactory', function ($http) {

  var getRequest = function(){
    return $http({
      method: 'GET',
      url: '/signup',
    }).then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log("Get request error!");
      });
  }

  var postRequest = function(data){
    return $http({
      method: 'POST',
      url: '/survey',
      data: data,
    }).then(function successCallback(response) {
        console.log('made a successful post');
        return response.data;
      }, function errorCallback(response) {
        console.log("Get request error!");
      });
  }

  return {
    getRequest: getRequest,
    postRequest: postRequest
  }
})

.factory('mainFactory', function ($http) {

  var getRequest = function(){
    return $http({
      method: 'GET',
      url: '/survey',
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
