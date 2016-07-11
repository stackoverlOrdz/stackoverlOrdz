var mongoose = require ('mongoose');

module.exports = {
  var initialize = function(){

      var userSchema = mongoose.Schema({
        //fbObj:object
        name:string
      })

      //add methods for the User db to get and add info

      userSchema.methods.greeting = function(){
        var greeting = this.name
           ? 'Hey ' + this.name
           : 'You don't have a name';
        console.log(greeting)
      }
  var Users = mongoose.model('Users', userSchema)

}



