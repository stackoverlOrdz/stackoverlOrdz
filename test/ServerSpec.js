var expect = require('chai').expect;


var mongoose = require('mongoose')
var User = require('../app/server/userModel.js').User
var userController = require('../app/server/userController.js')

mongoose.createConnection('mongodb://localhost:3000/spark_test')

describe('user', function(){
  var currentUser = null;
})

afterEach(function(done){
  User.model.remove({}, function(){
     done()
  })
})

it('registers a new User', function(done){
  userController.getUserStatus('4430212397966',
      { 'id': '4430212397966',
      'name': 'Deniz Myers',
      'picture':
            'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12439125_4310556926653_2253072521179427388_n.jpg?oh=67ae176717d2fa1efcfe0c2e8bc8aee9&oe=57FD153F ',
      'email': 'myersTest@gmail.com',
      'birthday': '10/31/1991'},
      function(resp){
          resp.newUser.facebookObject.name.should.equal('Deniz Myers')
          done()
          },
          function (message){
          message.should.equal(null);
          })
          })

