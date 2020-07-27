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
  res.json({name: "Som", title: "Bhattacharjee"})
})

module.exports = router
