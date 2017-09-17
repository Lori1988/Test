var express = require('express');
var router = express.Router();
var useragent = require('express-useragent');

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.send(req.useragent);
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
      if (agentID) {
        res.redirect('/phone/');
        // res.sendfile('phone/index.html');
      } else {
        res.redirect('/pc/');
        // res.sendfile('pc/index.html');
      }
});
// 
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//分栏查询
router.post('/columns',function(req,res,text){
	
	// connect.query(`select *}`,function(error,results,f){
	// 	if(error)throw error;
	// 	res.send(results);
	// })
})


module.exports = router;
