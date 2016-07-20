var bodyParser = require('body-parser');
var engines = require('consolidate');
var express = require('express');
var loginUtil = require('./utilities/loginUtil.js');
var mongoose = require ('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var path = require('path');
var session = require('express-session');
var userModel = require ('./userModel.js');
var userController = require('./userController.js');

var app = express();

app.use(bodyParser.json())

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static(__dirname + '/../client'));

app.use(morgan('dev'));

app.use(session({
  secret: 'blue flamingo',
  resave: true,
  saveUninitialized: true
}));

// Facebook OAuth
var responseObject;

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '150248838715978',
    clientSecret: '8a2911236f2e730fe93f84f060f38063',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'profileUrl', 'location', 'verified']
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_birthday', 'user_photos', 'user_location', 'public_profile']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    var facebookData = loginUtil.processFacebookData(req.user._json);
    loginUtil.loginUser(facebookData, function(response) {
          res.redirect('/takesurvey')
      })
  });

/*FACEBOOK OBJECT RETURNED
{ name: 'Jane Doe',
  picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/xxx.jpg?oh=xxxx&oe=5821B128',
  email: 'example@gmail.com',
  facebookId: '99999999999999999'
*/

//Express routes
app.get('/login', function(req, res){
   res.redirect('/auth/facebook');
});

app.get('/loadSurvey', function(req, res){
  loginUtil.getSurvey(function(surveyData){
     res.send(surveyData)
  });
});

app.get('/loadMatches', function(req, res){
  //creates main view for matches from takesurvey view
  loginUtil.getMatches(function(response){
    res.send(response);
  });
})

app.post('/sendSurvey', function(req, res) {
  //this is the submission of the survey to traitify
  var testResponses = req.body;
  loginUtil.getResults(testResponses, function(matchesObject){
    res.status(200).json(matchesObject);
  })
});

app.get('/logout', function(req, res){
  delete req.session.passport;
  res.redirect('/');
});

app.get('/*', function(req, res){
  res.redirect('/');
});

//initialize server
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port ' + port);
});

//initialize the mongoose db server
mongoose.connect('mongodb://sparkdb:spark@ds029328.mlab.com:29328/heroku_b7z7sd7t');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
   console.log('++++line 123 connect to mLab!');
});
