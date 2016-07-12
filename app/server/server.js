var bodyParser = require('body-parser');
var engines = require('consolidate');
var express = require('express');
var mongoose = require ('mongoose');
var morgan = require('morgan');
// 'passport and passport-facebook allow OAuth login'
var passport = require('passport');
var path = require('path');
var session = require('express-session');
var util = require('./util.js');
var userModel = require ('./userModel.js');

FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.use(morgan('dev'));

// directs app to static files and specifies view engine using 'consolidate' and 'mustache'
app.set('views', __dirname + '/../client');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

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
   var facebookData = util.processFacebookData(profile._json);

    // check if new user (db/mongoose check if exists by facebookID)
      // route to user page
    // else
      // send facebookData to db
      // route to survey

done(null, profile);
   }
 ));

 app.get('/auth/facebook',
   passport.authenticate('facebook', { scope: ['email', 'user_birthday', 'user_photos', 'user_location', 'public_profile']}));

 app.get('/auth/facebook/callback',
   passport.authenticate('facebook', { failureRedirect: '/login' }),
   function(req, res) {
     res.redirect('/');
 });

 app.get('/', function(req, res){
   if (req.session.passport && req.session.passport.user) {
     res.render('user');
   } else {
     res.render('index');
   }
 });

 app.get('/login', function(req, res){
   res.redirect('/auth/facebook');
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
})

userModel.initialize();
