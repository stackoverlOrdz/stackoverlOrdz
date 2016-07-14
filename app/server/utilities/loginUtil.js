var userController = require('../userController.js');
var traitifyAPICalls = require('./traitifyUtils/traitifyAPICalls.js');

exports.routeUser = function(facebookData, callback) {
  userController.getUserStatus(facebookData.id, facebookData, function(response) {
    // returnNewUser(function(response) {
    console.log("response", response);
    if (response.newUser) {
      // console.log("new user! :", response);
      // create new 'core' survey and then retrieve it
      traitifyAPICalls.createAssessment('core', function(surveyInfo) {
        traitifyAPICalls.getAssessment(JSON.parse(surveyInfo).id, function(survey) {
          // TO-DO: get userData instead of facebookData when getUserStatus fixed
          callback("survey", survey, facebookData);
        });
      });
    } else if (response.existingUserSurveyComplete) {
      console.log("existing user, survey complete");
      // get "matches from DB"
      callback("matches", matches, facebookData);
    } else {
      callback("fail");
    }
  });
}


/// test functions for database queries
function returnNewUser(cb) {
  cb({newUser: true});
}
//
// function returnExistingUserUnfinishedSurvey(cb) {
//   cb({existingUserUnfinishedSurvey: null});
// }

function returnExistingUserSurveyComplete(cb) {
  cb({existingUserSurveyComplete: "matches"})
}
