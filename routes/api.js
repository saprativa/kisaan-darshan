var express = require('express')
var router = express.Router()
var passport = require('passport')
var jwt = require('jsonwebtoken')
var Farmer = require('../models/farmer')
const { body, validationResult } = require('express-validator');

// GET USER DETAILS
router.get('/auth', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  res.json(req.user)
})


// LOGIN
router.post('/login',
  passport.authenticate('local', { session: false }),
  function(req, res) {
    const token = jwt.sign({_id: req.user._id}, 'jai_jawan_jai_kisaan')
    return res.json({token: token, success: true})
  }
)

// REGISTER
router.post('/register', [
  body('firstName', 'Please enter a valid first name.').notEmpty().bail().isAlpha().trim().escape(),
  body('lastName', 'Please enter a valid last name.').notEmpty().bail().isAlpha().trim().escape(),
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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.send({errors: errors.array()})
  }
  Farmer.register(new Farmer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    sex: req.body.sex,
    mobile: req.body.mobile,
    email: req.body.email,
    village: req.body.village,
    block: req.body.block,
    district: req.body.district,
    state: req.body.state}), req.body.password, function(err) {
      if (err) {
        console.log(err);
        return res.send({exists: true});
      }
      console.log('Farmer registered!');
      return res.send({success: true});
  });
});


module.exports = router
