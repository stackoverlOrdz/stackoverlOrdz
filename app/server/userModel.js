var mongoose = require ('mongoose');

  var User;
  var initialize = function(){

      var userSchema = mongoose.Schema({
        facebookObject:
        { facebookId: mongoose.Schema.Types.Mixed,
         name: String,
         picture: mongoose.Schema.Types.Mixed,
         email: mongoose.Schema.Types.Mixed,
         birthday: mongoose.Schema.Types.Mixed
       },
        testObject:
        {core:
          { uniqueTestId:mongoose.Schema.Types.Mixed,
          testQuestions:Array,
          testResults: Array,
          compareArray:Array
        }
       }
     })


  User = mongoose.model('Users', userSchema)

}
  module.exports = {
    User: User,
    initialize:initialize
  }


//this is the data structure

// user = {_id:mongoID,fbObj:fObj,tObj:tObj}

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
