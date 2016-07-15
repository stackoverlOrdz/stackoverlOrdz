var userController = require('../userController.js');
var traitifyAPICalls = require('./traitifyUtils/traitifyAPICalls.js');

var surveyData = {}
var matchesData = {}

var loginUser = function(facebookData, callback) {
   userController.getUserStatus(facebookData.id, facebookData, function(response) {
    console.log("+++ line 8routeUser", response);
    //{newUser:{route:survey,data:survey,currentUser:userObject}}
    if (response.newUser) {
      var responseObject = response.newUser
      // create new 'core' survey and then retrieve it
      traitifyAPICalls.createAssessment('core', function(surveyInfo) {
        traitifyAPICalls.getAssessment(JSON.parse(surveyInfo).id, function(survey) {
          surveyData = survey
          //{route:survey,data:survey,currentUser:userObject}
          //callback(responseObject);
        });
      });
    } else if (response.existingUserSurveyComplete) {
    //  var responseObject = response.existingUserSurveyComplete
    matchesData = response.existingUserSurveyComplete
      //{route:matches,data:matches,currentUser:userObject}
      console.log("existing user, survey complete");
     // callback(responseObject);
    } else {
      callback("fail");
    }
  });

}


module.exports = {
  loginUser:loginUser,
  surveyData:surveyData,
  matchesData:matchesData
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
