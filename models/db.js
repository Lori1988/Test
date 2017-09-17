var mysql = require('mysql');
var con = mysql.createConnection({
    host     : 'localhost',
    port     : '8889',
    user     : 'root',
    password : 'root',
    database : 'juejin_db'
  });


module.exports = con;