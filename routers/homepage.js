
var express = require('express')
var router = express.Router();

var Model = require('../models');

router.get('/', function(req, res){
  res.render('homepage');
})



module.exports = router;
