const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const User = require('./models/user');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt



// database connect
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


// initialize express and passport
var app = express();
app.use(passport.initialize());


const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies)
  {
      token = req.cookies['token'];
  }
  return token;
};

// passport-jwt-strategy
var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = 'jai_jawan_jai_kisaan';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload._id}, function(err, user) {
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
passport.use(User.createStrategy());


// following came with express-generator
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// build production
app.use(express.static(path.join(__dirname, "client/build")))


// initilaize the routes
app.use('/api', require('./routes/api'));

// build production
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "/client/build/index.html"))
})


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
