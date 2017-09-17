var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); 
var useragent = require('express-useragent');


var index = require('./routes/index');
var users = require('./routes/users');
var artical = require('./routes/artical');
var collection = require('./routes/collection');

var app = express();

// In your ExpressJS app on node.js
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/artical', artical);
app.use('/collection', collection);


// 创建验证连接
app.use(session({
    secret: 'keyboard cat',   // 用来对 session 数据进行加密，这个属性值为必须指定的属性
    resave: false,            // 指每次请求都重新设置 session cookie
    saveUninitialized: true   // 指无论有没有 session cookie，每次请求都设置个 session cookie
}));

// 
app.use(useragent.express());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
