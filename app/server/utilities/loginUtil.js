var userController = require('../userController.js');
var traitifyAPICalls = require('./traitifyUtils/traitifyAPICalls.js');


exports.routeUser = function(facebookData, callback) {
   userController.getUserStatus(facebookData.id, facebookData, function(response) {
  returnNewUser(function(response) {
    console.log("+++ line 8routeUser", response);
    if (response.newUser) {
      var responseObject = response.newUser
      // console.log("new user! :", response);
      // create new 'core' survey and then retrieve it
      traitifyAPICalls.createAssessment('core', function(surveyInfo) {
        traitifyAPICalls.getAssessment(JSON.parse(surveyInfo).id, function(survey) {
          // TO-DO: get userData instead of facebookData when getUserStatus fixed
          responseObject.data = survey
          //{route:survey,data:survey,currentUser:userObject}
          callback(responseObject);
        });
      });
    } else if (response.existingUserSurveyComplete) {
      var responseObject = response.existingUserSurveyComplete
      //{route:matches,data:matches,currentUser:userObject}
      console.log("existing user, survey complete");
      callback(responseObject);
    } else {
      callback("fail");
    }
  });
})
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
