angular.module('spark.factory', [])



.factory('surveyFactory', function ($http) {

  //storage for survey data received from Facebook API
  var data = [];

  //helper function to inject survey data received from Facebook API into controller into surveyCtrl
  var getData = function(){
    return data;
  }

  //http get request to traitify API for survey data
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

  //storage for currentUser data received as response from Facebook API
  var matchesPostData = [];

  //helper function to inject survey data received from Facebook API into mainCtrl
  var postData = function(){
    return matchesPostData;
  }

  //http post request to Facebook API for currentUser data
  var postRequest = function(data){
   console.log('inpostrequest', data)
   return $http({
        method: 'POST',
        url: '/sendSurvey',
        data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(response) {
       // console.log('made a successful post', response.data);
        matchesPostData = response.data;
        return response.data;

      }, function errorCallback(response) {
        console.log("Get request error!");
      });
  }

  return {
    getRequest: getRequest,
    postRequest: postRequest,
    getData: getData,
    postData: postData
  }
})

.factory('mainFactory', function ($http) {

  //http get request to database for survey data
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

  var logoutRequest = function(){
    return $http({
      method: 'GET',
      url: '/logout',
      }).then(function successCallback(response) {
        return response.data;
      }, function errorCallback(response) {
        console.log("Get request error!");
      });
  }

  return {
    getRequest: getRequest,
    logoutRequest: logoutRequest
  }
})
.factory('appData', [function(){
  var cache = {};
  return { 
     set:function(location, payload){
       cache[location]=payload
     },
     get:function(location){
       return cache[location];

     },
     clear:function(){
       cache={}
     }
   }
}])


