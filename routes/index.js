var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Farmer'})
})

router.get('/login', function(req, res, next) {
  res.json({name: "Som", title: "Bhattacharjee"})
})

module.exports = router
