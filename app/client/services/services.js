angular.module('spark.factory', [])

.factory('takesurveyFactory', function ($http, $location) {

  var getRequest = function(){
    return $http({
      method: 'GET',
      url: '/loadMatches',
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
  var data = [];

  var getData = function(){
    return data;
  }

  var getRequest = function(){
    return $http({
      method: 'GET',
      url: '/loadSurvey',
    }).then(function successCallback(response) {
      data = response.data;
        return response.data;
      }, function errorCallback(response) {
        console.log("Get request error!");
      });
  }

  var postRequest = function(data){
   console.log('inpostrequest', data)
   return $http({
        method: 'POST',
        url: '/sendSurvey',
        data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(response) {
        console.log('made a successful post', response.data);
        return response.data;
      }, function errorCallback(response) {
        console.log("Get request error!");
      });
  }

  return {
    getRequest: getRequest,
    postRequest: postRequest,
    getData: getData
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
