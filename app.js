var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
  res.send('hallo anggie and renata');
})

var Member = require('./models/member');
var Classname = require('./models/classname');

var member = require('./routers/member');
var classname = require('./routers/classname');

app.use('/member', member);
app.use('/classname', classname);

app.listen(3000)
