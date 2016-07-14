var bodyParser = require('body-parser');
var engines = require('consolidate');
var express = require('express');
var morgan = require('morgan');
// 'passport and passport-facebook allow OAuth login'
var passport = require('passport');
var path = require('path');
var session = require('express-session');

var userModel = require ('./userModel.js');
var userController = require('./userController.js');
var mongoose = require ('mongoose');


var facebookUtil = require('./utilities/facebookUtil.js');
var traitifyUtil = require('./utilities/traitifyUtils/traitifyUtil.js');
var traitifyAPICalls = require('./utilities/traitifyUtils/traitifyAPICalls.js');
var loginUtil = require('./utilities/loginUtil.js');

var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/../client'));
app.use(session({
  secret: 'blue flamingo'
}));


// Facebook OAuth
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: '150248838715978',
    clientSecret: '8a2911236f2e730fe93f84f060f38063',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'profileUrl', 'location', 'verified']
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_birthday', 'user_photos', 'user_location', 'public_profile']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    var facebookData = facebookUtil.processFacebookData(req.user._json);
    loginUtil.routeUser(facebookData, function(response) {
      ////DO STUFF HERE
      // console.log("survey", survey);
    var route = response.route
    var data = response //JSON.stringify(response)

      if (route == 'survey') {
        //console.log({route: route, data: survey, currentUser: user});

        res.redirect('/showSurvey?data=' + data);
      } else if (route == 'matches'){
        res.redirect('/showMatches?data=' + data);
        //res.send('/');
      }
    });
  });

 app.get('/login', function(req, res){
   console.log('Getting to /login get request')
   res.redirect('/auth/facebook');
 });

// app.get('/showSurvey', function(req, res){
//   console.log('showsurvey')
//   // create new survey for new user
// });
// app.get('/showMatches', function(req, res){
//   //create main view for matches
// })
app.get('/survey', function(req, res) {
  traitifyUtil.createAssessment("core");
});

app.get('/logout', function(req, res){
  delete req.session.passport;
  res.redirect('/');
});

app.get('/*', function(req, res){
  res.redirect('/');
});


var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port ' + port);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  // console.log('connected');
});

// userModel.initialize();
