var UserModel = require('./userModel.js')
var db = require ('./server.js')
var mongoose = require ('mongoose');
var _  = require ('lodash')


//add new user with facebook login data to the db Users to create a new user.
//this is our login method and adds a unique id, username, picture, email, birthday and location within the user's facebookObject


var currentUser;
var gotNewUser = function(param){
  console.log('gotNewUser', param)

}
  var signup =  function(facebookObject, cb){
    var user = new UserModel.User({
     'facebookObject': facebookObject
   })
    user.save(function(err,user){
      if(err){
       return console.error('user signup ' + err);
    } else {
      currentUser = user;
      console.log('u',user)
      //gotNewUser(user)
      //console.log(cb)
      cb(user)
    }
   })
  }
  var queryMatches = function(currentUser,deck,cb){
    var currentUserScores = currentUser.testObject.deck.compareArray;

      UserModel.User.find().all(function(user){
        //forEach user in Users generate differences array with currentUser

        compareArray = user.testObject.deck.compareArray;
        var greatestDifference=0, difference, matches = [];

        //find greatest difference between user scores

        for(var i=0;i<compareArray.length;i++){
          difference = Math.abs(compareArray[i] - currentUserScores[i])
          if (difference > greatestDifference){
            greatestDifference = difference;
          }
         }

         //add each user's profile and their difference score to the matches object

         matches.push(
           {
             greatestDifference: greatestDifference, facebookObject: user.facebookObject
           })
        })

        //sort the matches objet and return
        var resultsArray = _.orderBy(matches, ['greatestDifference', 'facebookObject'], ['desc'])
        // returns → objects for [[36, fbobj], [34, fbobj]]

        //return  {currentUser:{fbObj},matches: [ fbObj , fbObj , fbObj ] }
        var matchesObjet =
        {
          'currentUser': user.facebookObject,
          'matches': null
        }
        matches = []
        for (var i=0;i<resultsArray.length;i++){
          matches.push(resultsArray[i][1])
        }
        cb(matchesObject)

    //test user test has results
       //if has results, compute difference between current user
       //score for each test and each user in db
       //add to matchesObject in order of scores difference <
       //the order of the results for comparison is fixed in the
       //FixedOrderOfResultsArray for the core deck test.
       //if additional tests are added, this will need to be developed further.
  }


  var addTestData = function(currentUser, deck, testResults, cb){
    //create compareArray & add it to data before inserting it
    var compareArray = []

    //fixed order for personality_type results
    var fixedOrderOfResultsArray =
    [
    'Adventurous', 'Reliable', 'Charismatic', 'Mellow', 'Rational', 'Thoughtful', 'Social',
    ]
    // pull compare data from test object
    var  res = []
    for (var i=0;i<personality_types.length;i++){
      item = personality_types[i]
      res.push(item.score)
    }

    compareArray = res

    //to currentUser
      UserModel.User.findByIdAndUpdate(currentUser._id, {
       $set:{
        'testObject.deck.testResults': testResults
      ,'testObject.deck.compareArray': compareArray
    }},null,function(err,res){
        if (err){
          console.error(err)
          cb(false)
        } else {
          console.log('testResults and compare array added')
          cb(true)
        }
      })
  }

  var addTestObject = function(currentUser, deck, testQuestions, uniqueTestId, cb){
    //this adds the object and id used to present the survey
    //to the currentUser testObj under the deck name
     UserModel.User.findByIdAndUpdate(currentUser._id, {
       $set: {
        'testObject.deck.testQuestions': testQuestions
      ,'testObject.deck.uniqueTestId' : uniqueTestId
      }
    }, null,function(err,res){
        if (err){
          console.error(err)
          cb(false)
        } else {
          cb(true)
        }
      })
  }

  var getUserStatus = function(facebookId, facebookObject, cb){
    //this is the user routing function
console.log('getuserStatus', facevookID, facebookObject)
    //if new user add to db & cb{'newUser':null}
    //if existing user no survey data cb {'existingUserUnfinshedSurvey':null}
    //if existing user with survey data
    //>>query db for matches
    //cb {'existingUserSurveyComplete': matchQueryResultsObj}
   UserModel.User.findOne({
     'facebookObject': facebookObject
   },
     function(err,currentUser){
console.log('currUser from db' + currentUser)
     if (currentUser === null){
  console.log('newuser')
       //newUser because not in db
       //proced to signup if new User
       signup(facebookObject, function(err,res){
         console.log('res',res)
         cb({'newUser':res})
       })
     } else
     if (currentUser.testObject.testResults === []){
  console.log('existing no test')
       //existingUserSurveyComplete
       //get matches query results
       //deck is variable.. setting to core default

          //exitingUserUnfinishedSurvey
       cb({'exitingUserUnfinishedSurvey':currentUser})

     }else
       if (currentUser.testObject.testResults.length > 0){
console.log('existing has test')
       //existingUserSurveyComplete
       //get matches query results
       //deck is variable.. setting to core default

       if (!deck){
         var deck = 'core';
       }
       queryMatches(currentUser, deck, function(err,matches){
         if (err){
           console.error(err)
         } else {
           cb({'existingUserSurveyComplete':matches})
         }
       })
     } else {
       //exitingUserUnfinishedSurvey
       cb({'exitingUserUnfinishedSurvey':currentUser})
     }
     })
  }



module.exports = {
  currentUser:currentUser,
  addTestObject:addTestObject,
  addTestData:addTestData,
  getUserStatus:getUserStatus
}
