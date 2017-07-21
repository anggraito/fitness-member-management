var express = require('express');
var root = express.Router();

var Model = require('../models');

root.use((req, res, next) => {
  if (req.session.user){// undefined
    next()
  } else {
    res.redirect('/login');
  }
});


root.get('/', function(req, res){
  Model.member.findAll()
  .then (function(rows){
    res.render('member', {data_member: rows})
  })
})
//
root.get('/add', function(req, res){
  Model.member.findAll() //model,nama model=namatabel.temukansemuadata
  .then(function(rows){
    res.render('memberAdd', {data_member: rows}) //ambil file memberAdd
  })
})
root.post('/add', function(req,res){
  Model.member.create(req.body)
  .then(function(){
    res.redirect('/member');
  })
})

root.get('/edit/:id', function(req, res){
  Model.member.findById(req.params.id)
  .then(function(rows){
    res.render('memberEdit', {member_edit: rows})
  })
})
root.post('/edit/:id', function(req, res){
  Model.member.update(req.body,
  {
    where:{id:req.params.id}
  })
  .then(function(){
    res.redirect('/member')
  })
})

root.get('/delete/:id', function(req, res){
  Model.member.destroy({where:{id: req.params.id}})
  .then(function(){
    res.redirect('/member')
  })
})

 root.get('/history/:id', function(req, res){
   Model.member.findAll({
     where: {
       id: req.params.id
     },
     include: [{all:true}]
   })
    .then(function (rows) {
      // res.send(rows);
      Model.classname.findAll()
      .then(function (rows2) {
        Model.memberclass.findAll({
          attributes: ['id', 'ClassnameId', 'MemberId', 'date'],
          where: {
            MemberId: req.params.id
          },
          include: [{all:true}]
        })
        .then (function (rows3){
          console.log(rows3);
          // res.send({data_member: rows, data_classname: rows2, data_memberclass: rows3});
          res.render('memberclass', {data_member: rows, data_classname: rows2, data_memberclass: rows3});
         })
      })
    })
 });

root.post('/history/:id', function(req, res) {
  Model.memberclass.create({ MemberId: req.params.id, ClassnameId: req.body.ClassnameId, date: req.body.date})
  .then( function(){
  res.redirect(`/member/history/${req.params.id}`);
  })
});

root.get('/history/edit/:id', function(req, res) {
Model.memberclass.findAll({
  where: {
    MemberId: req.params.id
  },
  include: [{all:true}]
})
.then(function (rows){
  Model.classname.findAll()
  .then (function (rows2){
    Model.member.findAll({
      where: {
        id: req.params.id
      },
      include: [{all:true}]
    })
    .then (function (rows3){
  res.render('memberclassEdit', {data_memberclass: rows, data_classname: rows2, data_member: rows3});
      })
    })
  })
});

root.post('/history/edit/:id', function(req, res) {
  Model.memberclass.update({ ClassnameId: req.body.ClassnameId, date: req.body.date},
    {
      where: {MemberId: req.params.id}
    }
  )
  .then( function(){
  res.redirect(`/member/history/${req.params.id}`);
  })
});


root.get('/history/delete/:id', function(req, res){
      let data = req.params.id.split(",");
      Model.memberclass.destroy({where: {id: data[0]}})
      .then( function(){
        res.redirect(`/member/history/${data[1]}`);
      })
});



module.exports= root;

// root.get('/history/:id', function(req, res){
//   Model.memberclass.findAll({
//     where: {
//       MemberId: req.params.id
//     },
//     include: [{all:true}]
//   })
//   .then(function (rows){
//     Model.classname.findAll()
//     .then (function (rows2){
//       Model.member.findAll({
//         where: {
//           id: req.params.id
//         },
//         include: [{all:true}]
//       })
//       .then (function (rows3){
//     res.render('memberclass', {data_memberclass: rows, data_classname: rows2, data_member: rows3});
//   })
//     })
//   })
//  });
//
//
// root.post('/history/:id', function(req, res) {
//   Model.memberclass.create({ MemberId: req.params.id, ClassnameId: req.body.ClassnameId, date: req.body.date})
//   .then( function(){
//   res.redirect(`/member/history/${req.params.id}`);
//   })
// });
//
// root.get('/history/delete/:id', function(req, res){
//   Model.memberclass.destroy({where: {MemberId: req.params.id}})
//   .then( function(){
//     res.redirect('/memberclass');
//   })
// });
//
//
//
// module.exports= root;
