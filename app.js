var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session')
var path = require('path');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use(session({
  secret: 'hacktiv8',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

// app.get('/', function(req, res){
//   res.send('hallo anggie and renata');
// })

app.use(express.static(path.join(__dirname, 'public')));


var Member = require('./models/member');
var Classname = require('./models/classname');
var User = require('./models/User');

var member = require('./routers/member');
var login = require('./routers/login');
var signup = require('./routers/signup');
var classname = require('./routers/classname');
var homepage = require('./routers/homepage');

app.use('/member', member);
app.use('/classname', classname);
app.use('/signup', signup);
app.use('/login', login);
app.use('/', homepage);

app.listen(3500);
