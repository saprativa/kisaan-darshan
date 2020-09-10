var express = require('express')
var router = express.Router()
var passport = require('passport')
var jwt = require('jsonwebtoken')
var User = require('../models/user')
var Crop = require('../models/crop')
const { body, validationResult } = require('express-validator');


// ADD CROP
router.post('/crop', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  req.body.user = req.user._id
  const crop = new Crop(req.body)
  crop.save(err => {
    if(err)
      console.log(err)
    else
      console.log('Crop Added Successfully.')
  })
})

// GET USER DETAILS
router.get('/auth', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  res.status(200).json(req.user)
})


// LOGOUT
router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.clearCookie('token')
  res.json({success: true})
})


// LOGIN
router.post('/login',
  passport.authenticate('local', { session: false }),
  function(req, res) {
    const token = jwt.sign({_id: req.user._id}, 'jai_jawan_jai_kisaan')
    res.cookie("token", token, { httpOnly: true, sameSite: true })
    return res.status(200).json({
      success: true, 
      user: req.user
    })
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
  body('village', 'Please enter village.').notEmpty().bail().isString().trim().escape(),
  body('block', 'Please enter block.').notEmpty().bail().isString().trim().escape(),
  body('district', 'Please enter disctrict.').notEmpty().bail().isString().trim().escape(),
  body('state', 'Please enter state.').notEmpty().bail().isString().trim().escape(),
  body('password', 'Please enter password of atleast 5 characters.').notEmpty().bail().isLength({min: 5}).trim().escape(),
], function(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.send({errors: errors.array()})
  }
  User.register(new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    sex: req.body.sex,
    mobile: req.body.mobile,
    email: req.body.email,
    village: req.body.village,
    block: req.body.block,
    district: req.body.district,
    state: req.body.state,
    role: req.body.role}), req.body.password, function(err) {
      if (err) {
        console.log(err);
        return res.send({exists: true});
      }
      console.log('User registered!');
      return res.send({success: true});
  });
});


module.exports = router
