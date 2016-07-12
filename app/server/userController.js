var mongoose = require ('mongoose');
var User = require('./userModel.js')
var db = require ('./server.js')


//add new user with facebook login data to the db Users to create a new user.
//this is our login method and adds a unique id, username, picture, email, birthday and location within the user's facebookObject

module.exports = {
  addTestData: function(currentUser, deck, testResults, cb){
    //create compareArray & add it to data before inserting it
    var compareArray = []

    //to currentUser
      db.User.findByIdAndUpdate(currentUser._id, {
       $set:
       {
        'testObject.deck.testResults': testResults
      },
      {
        'testObject.deck.compareArray': compareArray
      }
    }, ,
    function(err,res){
        if (err){
          console.error(err)
        } else {
          cb('test results added')
        }
      })
  },
  addTestObject: function(currentUser, deck, testQuestions, uniqueTestId, cb){
    //this adds the object and id used to present the survey
    //to the currentUser testObj under the deck name
     db.User.findByIdAndUpdate(currentUser._id, {
       $set: {
        'testObject.deck.testQuestions': testQuestions
      },
      {
        'testObject.deck.uniqueTestId' : uniqueTestId
      }
    }, ,
    function(err,res){
        if (err){
          console.error(err)
        } else {
          cb('test questions added')
        }
      })
  },
  signup: function(facebookObject){
    var user = new User({
     'facebookObject': facebookObject
   })
   // var user = new User({'name':'Mary'})
    user.save(function(err,user){
      if(err) return console.error(err);
    })
  },
  queryMatches(currentUser,deck,cb){
    var currentUserScores = currentUser.testObject.deck.compareArray;
    //forEach user in Users

      db.User.find().all(function(user){

      })


    //test user test has results
       //if has results, test scoreArray with fuzzy match
       //add to matchesObject in order of scores difference
       //may need intermediate object with keys of difference

  },
  getUserStatus: function(facebookId, cb){
    //if new user return {'newUser':null}
    //if existing user no survey data cb {'existingUserUnfinshedSurvey':null}
    //if existing user with survey data
    //>>query db for matches
    //cb {'existingUserSurveyComplete': matchQueryResultsObj}

   db.User.findOne(
     {
       'facebookObject.id':facebookId
     },
     function(err,currentUser){
     if (err){
       cb({'newUser':null})
     }
     if (currentUser.tObj.testResults.length > 0){
       //existingUserSurveyComplete
       //get matches query results
       //deck is variable.. setting to core default
       if (!deck){
         var deck = 'core';
       }
       exports.queryMatches(currentUser, deck, function(err,matches){
         if (err){
           console.error(err)
         } else {
           cb({'existingUserSurveyComplete':matches})
         }
       })
     } else {
       //exitingUserUnfinishedSurvey
       cb({'exitingUserUnfinishedSurvey':null})
     }
     })
  }

}

//this is the data structure

// user1{_id:mongoID,fbObj:fObj,tObj:tObj}
// {
//   _id:mongoId,

// facebookObject: { 'facebookId': fbId,
//  'name': userName,
//  'picture': picUrl(will be pic file),
//  'email': email,
//  'birthday': birthday},

// testObject:
// {core:
//   {uniqueTestId:id,testQuestions:[{testQs}], testResults: [{testResultsEntire}], compareArray:[score0,score1,score2,score3,score4,score5]},
//   career:{...} }
// }



