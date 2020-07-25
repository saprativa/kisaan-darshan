var express = require('express');
var router = express.Router();
var passport = require('passport');
var Farmer = require('../models/farmer');
const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.send('GET /register');
});

router.get('/farmer/register', function(req, res, next) {
  res.render('farmer-register');
});

router.post('/farmer/register', [
  body('firstname', 'Please enter a valid first name.').notEmpty().bail().isAlpha().trim().escape(),
  body('lastname', 'Please enter a valid last name.').notEmpty().bail().isAlpha().trim().escape(),
  body('age', 'Please enter a valid age.').notEmpty().bail().isInt({min: 1, max: 125, allow_leading_zeroes: false}),
  body('sex', 'Please enter sex.').notEmpty().bail().isAlpha().trim().escape(),
  body('mobile', 'Please enter a valid mobile number.').notEmpty().bail().isMobilePhone("en-IN"),
  body('email', 'Please enter a valid email.').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('village', 'Please enter village.').notEmpty().bail().isAlpha().trim().escape(),
  body('block', 'Please enter block.').notEmpty().bail().isAlpha().trim().escape(),
  body('district', 'Please enter disctrict.').notEmpty().bail().isAlpha().trim().escape(),
  body('state', 'Please enter state.').notEmpty().bail().isAlpha().trim().escape(),
  body('password', 'Please enter password of atleast 5 characters.').notEmpty().bail().isLength({min: 5}).trim().escape(),
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.render('farmer-register', {errors: errors.array()});
  }
  Farmer.register(new Farmer({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    age: req.body.age,
    sex: req.body.sex,
    mobile: req.body.mobile,
    email: req.body.email,
    village: req.body.village,
    block: req.body.block,
    district: req.body.district,
    state: req.body.state}), req.body.password, function(err) {
      if (err) {
        console.log('error while user register!', err);
        return res.render('farmer-register', {exists: true});
      }
      console.log('user registered!');
      res.render('farmer-login', {success: 'Farmer registerd successfully.'});
  });
});

router.get('/farmer/login', function(req, res, next) {
  res.render('farmer-login');
});

router.post('/farmer/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.render('farmer-login', {errors: err}); }
    if (!user) { return res.render('farmer-login', {errors: 'Invalid'}); }
    req.logIn(user, function(err) {
      if (err) { return res.render('farmer-login', {errors: err}); }
      return res.render('success', {user: req.user});
    });
  })(req, res, next);
});
  

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
