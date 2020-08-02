const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const Farmer = require('./models/farmer');
const mongoose = require('mongoose');
const { use } = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt



// database connect
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


// initialize express and passport
var app = express();
app.use(passport.initialize());


// passport-jwt-strategy
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'jai_jawan_jai_kisaan';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  Farmer.findOne({_id: jwt_payload._id}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  })
}))


// method from passport-local-mongoose
// it is a shortcut for custom username field
// implements the passport local strategy
passport.use(Farmer.createStrategy());


// following came with express-generator
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// initilaize the routes
app.use('/api', require('./routes/api'));


// came with express generator
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
