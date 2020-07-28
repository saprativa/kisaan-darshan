var express = require('express')
var router = express.Router()
var passport = require('passport')
var Farmer = require('../models/farmer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Farmer'})
})

router.post('/login', function(req, res, next) {
  console.log(req.body)
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return res.json({success: false}) 
    }
    if (!user) { 
      return res.json({success: false}) 
    }
    req.logIn(user, function(err) {
      if (err) { 
        return res.json({success: false}) 
      }
      return res.json({success: true})
    })
  })(req, res, next)
})

module.exports = router
