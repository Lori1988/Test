var mysql = require('mysql');
var $conf = require('../models/config');
// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);