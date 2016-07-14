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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*

{ id: '10153929891029332',
  name: 'Rebecca Gray',
  picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12742343_10153578598784332_5479975309254932247_n.jpg?oh=add386259087036d59d52ae84416b0c1&oe=5821B128',
  email: 'example@gmail.com',
  link: 'https://www.facebook.com/app_scoped_user_id/10153929891029332/' }

  */


passport.use(new FacebookStrategy({
    clientID: '150248838715978',
    clientSecret: '8a2911236f2e730fe93f84f060f38063',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'profileUrl', 'location', 'verified']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('in passport use',accessToken, refreshToken, profile)
    done(null, profile);
  }
));


  app.get('/auth/facebook?', passport.authenticate('facebook', { scope: ['email', 'user_birthday', 'user_photos', 'user_location', 'public_profile']}));



app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) { console.log('+++ line 69 in auth callback')
    var facebookData = facebookUtil.processFacebookData(req.user._json);
    loginUtil.routeUser(facebookData, function(route, survey, user) {
      ////DO STUFF HERE
     console.log("survey", survey);
      if (route == 'survey') {
        console.log({route: route, data: survey, currentUser: user});
        res.send({route: route, data: survey, currentUser: user});
      } else {
        res.send('/');
      }
    });
  });



 app.get('/login', function(req, res){
   console.log('Getting to /login get request')
   res.redirect('/auth/facebook');
   //loginToFacebook()
 });

app.get('/signup', function(req, res){
  // create new survey for new user
});

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

//initialize the mongoose db server
mongoose.connect('mongodb://sparkdb:spark@ds029328.mlab.com:29328/heroku_b7z7sd7t');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
   console.log('connected');
});

