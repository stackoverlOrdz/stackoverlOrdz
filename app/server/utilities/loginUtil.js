var userController = require('../userController.js');
var traitifyAPICalls = require('./traitifyUtils/traitifyAPICalls.js');


var loginUser = function(facebookData, callback) {
   userController.getUserStatus(facebookData, function(response) {
     console.log('++userStatus response', response)
     //this could check to see if the user has takent he survey but for now, just checks that they are in the db as a user will return 
     //response  >> {newUser': true, currentUser:currentUser}
   
        callback('ok')
    })
 }
var assessmentId;
var getSurvey = function(callback){
                // create new 'core' survey and then retrieve it
                var surveyInfo;
                traitifyAPICalls.createAssessment('core', function(surveyInfo) {
                  assessmentId = JSON.parse(surveyInfo).id
                   surveyInfo = surveyInfo
                      traitifyAPICalls.getAssessment(JSON.parse(surveyInfo).id, function(survey) {
                          // surveyData = survey
                          //  responseObject.data = surveyData

                          //{route:survey,data:survey,currentUser:userObject}
                          callback(survey);
              });
        })
}

var getResults = function(testResponses,callback){
  //var matches = {}
  var traitifyResults;
  traitifyAPICalls.testSubmitResults(assessmentId, "core", testResponses, function (){
    console.log('im in a callback')
      traitifyAPICalls.getResults( assessmentId, function(traitifyResults){
        console.log('+++testSubmitResults resp')
        // traitifyResults = resultsInfo.data
                userController.addTestData('core', traitifyResults, function(response){
                      console.log('+++addTestData',response)
                      userController.queryMatches(traitifyResults, function(response){
                        console.log('+++getMatches resp', response)
                        //matches.data = response;
                        callback(response)
                      })
             })
       })
    })
}

var processFacebookData = function(facebookInfo) {
  console.log('++++facebookinfo' ,facebookInfo);
  facebookInfo.picture = facebookInfo.picture.data.url;
  var facebookId = facebookInfo.id
  //facebookInfo.location = facebookInfo.location.name;
  delete facebookInfo.verified;
  facebookInfo.facebookId = facebookId
  return facebookInfo;
};

module.exports = {
  getResults:getResults,
  processFacebookData:processFacebookData,
  loginUser:loginUser,
  getSurvey:getSurvey
}

/// test functions for database queries
// function returnNewUser(cb) {
//   cb({newUser: true});
// }
//
// function returnExistingUserUnfinishedSurvey(cb) {
//   cb({existingUserUnfinishedSurvey: null});
// }

// function returnExistingUserSurveyComplete(cb) {
//   cb({existingUserSurveyComplete: "matches"})
// }
