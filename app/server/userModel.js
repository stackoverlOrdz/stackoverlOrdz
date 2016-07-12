var mongoose = require ('mongoose');

  var User;
  var initialize = function(){

      var userSchema = mongoose.Schema({
        fbObj:Object
        //name:String
      })

      //add methods for the User db to get and add info

      // userSchema.methods.greeting = function(){
      //   var greeting = this.name
      //      ? 'Hey ' + this.name
      //      : "You don't have a name";
      //   console.log(greeting)
      //}


  User = mongoose.model('Users', userSchema)

}
  module.exports = {
    User: User,
    initialize:initialize
  }


