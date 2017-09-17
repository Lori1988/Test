var express = require('express');
var router = express.Router();
var connect = require('../models/db.js');

//查询所有
router.get('/selectAll',function(req,res,next){
	connect.query('select u.username,u.img_src,a.id,a.a_src,a.title,a.text,a.img_src,(select count(uc.id) from usercollection_tb uc where uc.a_id=a.id and uc.type ="C") as praise,(select count(uc.id) from usercollection_tb uc where uc.a_id=a.id and uc.type="B") as comments from article_tb a,users_tb u where a.u_id = u.id',function(error,results,f){
		if(error)throw error;
		res.send(results);
	})
})

//条件查询
router.post('/selectByMId',function(req,res,text){
	connect.query(`select u.username,u.img_src,a.id,a.a_src,a.title,a.text,a.img_src,(select count(uc.id) from usercollection_tb uc where uc.a_id=a.id and uc.type="C") as praise,(select count(uc.id) from usercollection_tb uc where uc.a_id=a.id and uc.type="B") as comments  from article_tb a inner join users_tb u on a.u_id=u.id inner join menu_tb m on a.m_id=m.id where m.id=${req.body.mid}`,function(error,results,f){
		if(error)throw error;
		res.send(results);
	})
})


module.exports = router;