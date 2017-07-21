var express = require('express')
var router = express.Router();

var Model = require('../models');

router.use((req, res, next) => {
  if (req.session.user){// undefined
    next()
  } else {
    res.redirect('/login');
  }
});

router.get('/', function(req, res){
  // console.log(Models.classf);
  Model.classname.findAll({order: [['name']]})
  .then (function (rows) {
    res.render('classname', {data_classname: rows, title: 'Class Name'});
  })
});

router.get('/add', function(req, res){
      res.render('classnameAdd', {title: 'Add Class'});
});

//add new teacher req.body
router.post('/add', function(req, res){
  Model.classname.create({name: req.body.name})
  .then( function(){
    res.redirect('/classname');
  })
});


router.get('/edit/:id', function(req, res){
  Model.classname.findById(req.params.id)
  .then (function (rows){
    res.render('classnameEdit', {data_classname: rows, title: 'Edit Class Name'});
    })
  });


router.post('/edit/:id', function(req, res) {
  Model.classname.update({ name: req.body.name},
    {
      where: {id: req.params.id}
    })
  .then( function(){
  res.redirect('/classname');
  })
});

router.get('/delete/:id', function(req, res){
    Model.classname.destroy({where: {id : req.params.id}})
    .then( function(){
  res.redirect('/classname');
  })
});

module.exports = router;
