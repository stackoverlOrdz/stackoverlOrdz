var mongoose = require ('mongoose');
var User = require('./userModel.js')



//add new user with facebook login data to the db Users to create a new user.
//this is our login method and adds a unique id, username, picture, email, birthday and location within the user's fbObj

module.exports = {
  signup: function(fbObj){
    //var user = new User({ 'fbObj': fbObj})
    var user = new User({'name':'Mary'})
    user.save(function(err,user){
      if(err) return console.error(err);
    })
    user.greeting()
}

