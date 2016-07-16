
var UserModel = require('./userModel.js')
var db = require('./server.js')
var mongoose = require('mongoose');
var _ = require('lodash')

var currentUser;

//add new user with facebook login data to the db Users to create a new user.
//this is our login method and adds a unique id, username, picture, email, birthday and location within the user's facebookObject
//test user test has results
//if has results, compute difference between current user
//score for each test and each user in db
//add to matchesObject in order of scores difference <
//the order of the results for comparison is fixed in the
//FixedOrderOfResultsArray for the core deck test.
//if additional tests are added, this will need to be developed further.


var signup = function(facebookObject, cb) {
    var user = new UserModel.User({
        'facebookObject': facebookObject
    })
    user.save(function(err, user) {
        if (err) {
            return console.error('++++++++user signup ' + err);
        } else {
            currentUser = user;
            console.log('++++user added to signup', user)
            cb(user)
        }
    })
}

var queryMatches = function(currentUser, deck, cb) {
    var currentUserScores = currentUser.testObject.core.compareArray;
    console.log('+++query matches 51', currentUser, deck, currentUserScores)
    var matches = []

    //for each user in db with test deck core
    var cursor = UserModel.User.find().where({
        testObject: 'core'
    }).cursor();
    cursor.on('data', function(user) {
        compareArray = user.testObject.core.compareArray;
        var greatestDifference = 0,
            difference, matches = [];
        console.log('+++line 63  compareArray', compareArray)
            //find greatest difference between user scores

        for (var i = 0; i < compareArray.length; i++) {
            difference = Math.abs(compareArray[i] - currentUserScores[i])
            if (difference > greatestDifference) {
                greatestDifference = difference;
            }
        }
        //add each user's profile and their difference score to the matches object

        matches.push({
                greatestDifference: greatestDifference,
                facebookObject: user.facebookObject
            })
    })
    cursor.on('close', function() {
        })
        //sort the matches objet and return
    var resultsArray = _.orderBy(matches, ['greatestDifference', 'facebookObject'], ['desc'])
        // returns → objects for [[36, fbobj], [34, fbobj]]
    console.log('+++resultsArray of greatestDiff line 81', resultsArray)
        //return  {currentUser:{fbObj},data: [ fbObj , fbObj , fbObj ] }
    var matchesObject = {
        'currentUser': currentUser.facebookObject,
        'data': null
    }
    matches = []
    for (var i = 0; i < resultsArray.length; i++) {
        matches.push(resultsArray[i][1])
    }
    matchesObject.data = matches;
    console.log('+++matchesObject of greatestDiff line 92', matchesObject)
    cb(matchesObject)
}

var createCompareArray = function(testResults) {
    var compareArray = []
        //fixed order for personality_type results for comparisson.. varied order in testResults from traitify specific to core test
    var fixedOrderOfResultsArray = [
            'Adventurous', 'Reliable', 'Charismatic', 'Mellow', 'Rational', 'Thoughtful', 'Social',
        ]
        // pull compare data from test object
   // personality_types:
   // [ { personality_type: [Object], score: 69.18741 },
   //   { personality_type: [Object], score: 64.86154 },
   //   { personality_type: [Object], score: 60.268654 },
   //   { personality_type: [Object], score: 53.237137 },
   //   { personality_type: [Object], score: 45.30274 },
   //   { personality_type: [Object], score: 42.56005 },
   //   { personality_type: [Object], score: 35.24566 } ],
    var compareArray = []
    for (var i = 0; i < testResults.length; i++) {
        var name = testResults[i].personality_type.name
        var score = testResults[i].score
        var indexinfixedOrderOfResultsArrayofName = fixedOrderOfResultsArray.indexOf(name)
        if (indexinfixedOrderOfResultsArrayofName > -1) {
            compareArray[indexinfixedOrderOfResultsArrayofName] = score
        } else {
            console.log('++++the names of the personality_types have been changed by traitify')
        }
    }
    return compareArray
}


var addTestData = function(currentUser, deck, testResults, cb) {
  if (!testResults){
      console.log('no test resuts')
  }
        //create compareArray for matching users
        var compareArray = createCompareArray(testResults)
        console.log('++++compareArray', compareArray)
        //no currentuser here??
        console.log('++line 127 addTestdata curruser', currentUser)
        console.log('++line 127 addTestdata curruser._id', currentUser._id)

        UserModel.User.findById(currentUser._id, function(err, user) {
            user.testObject.core.testResults = testResults;
            user.testObject.core.compareArray = compareArray;
            user.save(function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('++++userdb compareArray stored')
                }
            });
        });
        cb('ok')
}

var getUserStatus = function(facebookObject, cb) {
    UserModel.User.findOne({
            'facebookObject.facebookId': facebookObject.facebookId
        },
        function(err, currentUser) {
            console.log('+++getuserStatus line 156 currentUser in db', currentUser)
            if (currentUser === null) {
                //newUser because not in db
                signup(facebookObject, function(err, res) {
                    console.log('++++ signup complete')
                    currentUser = res;
                    cb({
                        'newUser': true, 'currentUser': res
                    })
                })
            } else {
                console.log('+++ using otherwise route', currentUser)
                currentUser = currentUser;
                    //exitingUserUnfinishedSurvey
                cb({
                    'newUser': false, 'currentUser':currentUser
                })
            }
        })
}
module.exports = {
    currentUser:currentUser,
    queryMatches: queryMatches,
    currentUser: currentUser,
    addTestData: addTestData,
    getUserStatus: getUserStatus
};
