var mongoose = require ('mongoose');

  var User;
  var initialize = function(){

      var userSchema = mongoose.Schema({
        facebookObject:Object,
        testObject:Object
      })


  User = mongoose.model('Users', userSchema)

}
  module.exports = {
    User: User,
    initialize:initialize
  }


