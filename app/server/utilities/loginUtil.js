var userController = require('../userController.js');
var traitifyUtil = require('./traitifyUtil.js');

var currentUser;
var loginUser = function(facebookData, callback) {
  userController.getUserStatus(facebookData, function(response) {
    currentUser = response.currentUser;
    //this could check to see if the user has takent he survey but for now, just checks that they are in the db as a user will return
    //response  >> {newUser': true, currentUser:currentUser}
    callback('ok');
  });
};

var assessmentId;
var getSurvey = function(callback){
  // create new 'core' survey and then retrieve it
  var surveyInfo;
  traitifyUtil.createAssessment('core', function(surveyInfo) {
    assessmentId = JSON.parse(surveyInfo).id;
    surveyInfo = surveyInfo;
    traitifyUtil.getAssessment(JSON.parse(surveyInfo).id, function(survey) {
      // surveyData = survey
      //  responseObject.data = surveyData

      //{route:survey,data:survey,currentUser:userObject}
      callback(survey);
    });
  });
};

var getMatches = function(callback){
    userController.queryMatches(currentUser, 'core', function(response){
    console.log('+++matchesDtaa line 109', response);
    callback(response);
  });
};

var getResults = function(testResponses,callback){
  var traitifyResults;
  traitifyUtil.testSubmitResults(assessmentId, "core", testResponses, function (){
    traitifyUtil.getResults( assessmentId, function(traitifyResults){
      userController.addTestData(currentUser,'core', traitifyResults, function(response){
        userController.queryMatches(currentUser,traitifyResults, function(response){
          //matches.data = response;
          callback(response);
        });
      });
    });
  });
}

var processFacebookData = function(facebookInfo) {
  facebookInfo.picture = facebookInfo.picture.data.url;
  var facebookId = facebookInfo.id;
  //facebookInfo.location = facebookInfo.location.name;
  delete facebookInfo.verified;
  facebookInfo.facebookId = facebookId;
  return facebookInfo;
};

module.exports = {
  getMatches:getMatches,
  getResults:getResults,
  processFacebookData:processFacebookData,
  loginUser:loginUser,
  getSurvey:getSurvey
};
