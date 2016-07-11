var express = require('express');
var path = require('path');
var mongoose = require ('mongoose');
var userModel = require ('userModel.js')

var rootPath = path.normalize(__dirname +'./../client')

var app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/',function(req,res){
      res.sendFile(path.join(rootPath + '/index.html'));
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port ' + port)



//initialize the mongoose db server
mongoose.connect('mongodb://sparkdb:spark@ds029328.mlab.com:29328/heroku_b7z7sd7t');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('connected')
})

userModel.initialize() //this won't work because userModel not connecting.

// var userSchema = mongoose.Schema({
//   //fbObj:object
//   name:String
// })

// //add methods for the User db to get and add info

// userSchema.methods.greeting = function(){
//   var greeting = this.name
//      ? 'Hey ' + this.name
//      : "You don't have a name";
//   console.log(greeting)
// }
// var User = mongoose.model('Users', userSchema)



// var user = new User({'name':'Mary'})

//     user.save(function(err,user){
//       if(err) return console.error(err);
//     })
//     user.greeting()



