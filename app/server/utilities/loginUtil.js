var userController = require('../userController.js');
var traitifyAPICalls = require('./traitifyUtils/traitifyAPICalls.js');


var loginUser = function(facebookData, callback) {
   userController.getUserStatus(facebookData.id, facebookData, function(response) {
        callback('ok')
    //{newUser:{route:survey,data:survey,currentUser:userObject}}
   // if (response.newUser) {
//                  responseObject = response.newUser
//                 // create new 'core' survey and then retrieve it
//                 var surveyInfo;
//                 traitifyAPICalls.createAssessment('core', function(surveyInfo) {
//                    surveyInfo = surveyInfo
//                       traitifyAPICalls.getAssessment(JSON.parse(surveyInfo).id, function(survey) {
//                           surveyData = survey
//                            responseObject.data = surveyData
// console.log('+++loginuser.respon',responseObject)
//                           //{route:survey,data:survey,currentUser:userObject}
//                           callback(responseObject);
//               });
  //           })
  //   } else if (response.existingUserSurveyComplete) {
  //               //  var responseObject = response.existingUserSurveyComplete
  //               matchesData = response.existingUserSurveyComplete
  //                 //{route:matches,data:matches,currentUser:userObject}
  //                 console.log("existing user, survey complete");
  //                // callback(responseObject);
  //   } else {
  //              callback("fail");
  //    }
  // });
    })
 }

var getSurvey = function(callback){
                //   responseObject = response.newUser
                // create new 'core' survey and then retrieve it
                var surveyInfo;
                traitifyAPICalls.createAssessment('core', function(surveyInfo) {
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
  var matches = {}
  var traitifyResults;
  traitifyAPICalls.testSubmitResults("core", testResponses, function (){
    console.log('im in a callback')
      traitifyAPICalls.getResults( function(traitifyResults){
        console.log('+++testSubmitResults resp')
        // traitifyResults = resultsInfo.data
                userController.getMatches(traitifyResults, function(response){
                  console.log('+++getMatches resp', response)
                  matches.data = response;
                  callback(matches)
                })
       })
    })
}

var processFacebookData = function(facebookInfo) {
  console.log('facebookinfo' ,facebookInfo);
  facebookInfo.picture = facebookInfo.picture.data.url;
  //facebookInfo.location = facebookInfo.location.name;
  delete facebookInfo.verified;
  return facebookInfo;
};

module.exports = {
  getResults:getResults,
  processFacebookData:processFacebookData,
  loginUser:loginUser,
  getSurvey:getSurvey
  // responseObject:responseObject,
  // matchesData:matchesData
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
