var express = require('express');
var router = express.Router();
var connect = require('../models/db.js');
//查询所有
router.get('/selectAll',function(req,res,next){
	connect.query('select c.id, c.c_title, u.img_src, u.username,(select COUNT(uc.id) from usercollection_tb as uc where uc.c_id = c.id) as count from collection_tb as c left join users_tb u on u.id = c.u_id',function(error,results,f){
		if(error)throw error;
		res.rend(results);
	})
})

//添加收藏，评论，点赞
router.post('/insert',function(req,res,next){
	var uId = req.body.uid;
	var cId = req.body.cid;
	var aId = req.body.aid;
	var type = req.body.type;
	connect.query('insert into usercollection_tb (u_id,c_id,a_id,type) value (?,?,?,?)',[uId,cId,aId,type],function(error,results,f){
		if(error)throw error;
		res.rend({message:'ok'});
	})
})

//取消评论,点赞
router.post('/deleteByAid',function(req,res,next){
	connect.query(`delete from usercollection_tb where a_id=${req.body.aid} and (type=B or type=C)`,function(error,results,f){
		if(error)throw error;
		res.rend({message:'ok'});
	})
})

//取消收藏
router.post('/deleteByCid',function(req,res,next){
	connect.query(`delete from usercollection_tb where c_id=${req.body.cid} and type=A`,function(error,results,f){
		if(error)throw error;
		res.rend({message:'ok'});
	})
})

module.exports = router;
