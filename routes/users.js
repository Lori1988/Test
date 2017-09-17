var express = require('express');
var router = express.Router();
var connect = require('../models/db.js');

var session = require('express-session');

// 接收 req.session 会话
router.get('/checksession', function(req, res, next) {
    var result = {};
    // 校验 session：当用户打开网页时，向服务器发送请求，校验session是否存在，如果存在则发送到前端。
    if(req.session && req.session.tel){
        result.state = 'OK';
        result.id = req.session.userid;
        result.tel = req.session.tel;
        result.password = req.session.password;
        result.username = req.session.username;
        result.img = req.session.img;
        result.collections = req.session.collections;
    }else{
        result.state = 'ERR';
    }
    // console.log(result);
    res.send(result);
});

// 退出登录
router.get('/logout', function(req, res, next){
    req.session.destroy();        // 用户退出登录时销毁 session
    // res.redirect('../../../');    // 重定向
    res.send({state:'0',message:'退出成功',data:[]});
});


//登录
router.post('/login', function(req, res) {
	console.log('正在登录...');

	connect.query(`SELECT * FROM user WHERE email='${req.body.account}' or phone='${req.body.account}'`, function (error, results, fields) {
		if (error) throw error;
		console.log('查询用户结果',results);
		if(results==''){
			res.send({state:'1',message:'查无此人',data:results});

		}else{
			if(results[0].password === req.body.password){
				res.send({state:'0',message:'登陆成功',data:results});
			}else {
				res.send({state:'2',message:'密码错误',data:results});
			}
		}
	});
});

// 注册
router.post('/register', function(req, res) {
	console.log('正在注册...');
	let arr=[];
	connect.query(`SELECT * FROM user WHERE email='${req.body.account}' or phone='${req.body.account}'`, function (error, results) {
		if (error) throw error;
		arr=results;
		console.log(arr.length);
	});
	if(arr.length===0){
		if(req.body.account.indexOf('@')>0){
			connect.query(`INSERT INTO user(name, password,email) VALUES ('${req.body.nick}', '${req.body.password}','${req.body.account}')`, function (error, results) {
				if (error) throw error;
				res.send({state:'0',message:results});
			});
		}else{
			connect.query(`INSERT INTO user(name, password, phone) VALUES ('${req.body.nick}', '${req.body.password}','${req.body.account}')`, function (error, results) {
				if (error) throw error;
				res.send({state:'0',message:results});
			});
		}
	}else{
		res.send({state:'0',message:'该用户已注册'});
	}
	
});

// 查询用户名
router.post('/unamesearch', function(req, res) {
	console.log('正在查询用户名...');
	let arr=[];
	connect.query(`SELECT * FROM user WHERE name='${req.body.username}' `, function (error, results) {
		if (error) throw error;
		arr=results;
		console.log(arr.length);
	});
	if(arr.length===0){
		res.send({state:'0',message:'该用户名可用'});
	}else{
		res.send({state:'1',message:'该用户名已注册'});
	}
	
});
// 查询账户名
router.post('/accountsearch', function(req, res) {
	console.log('正在查询账户名...');
	let arr=[];
	connect.query(`SELECT * FROM user WHERE email='${req.body.account}' or phone='${req.body.account}'`, function (error, results) {
		if (error) throw error;
		arr=results;
		console.log(arr.length);
	});
	if(arr.length===0){
		res.send({state:'0',message:'该账户可注册'});
	}else{
		res.send({state:'1',message:'该用户已注册'});
	}
	
});
// 添加注册用户
router.post('/addaccount', function(req, res) {
	console.log('正在注册用户...');
	if(req.body.account.indexOf('@')>0){
		connect.query(`INSERT INTO user(name, password,email) VALUES ('${req.body.nick}', '${req.body.password}','${req.body.account}')`, function (error, results) {
			if (error) throw error;
			res.send({state:'0',message:results});
		});
	}else{
		connect.query(`INSERT INTO user(name, password, phone) VALUES ('${req.body.nick}', '${req.body.password}','${req.body.account}')`, function (error, results) {
			if (error) throw error;
			res.send({state:'0',message:results});
		});
	}
	
});


// 文章
router.post('/getArticles', function(req, res) {
	console.log('请求数据');
	connect.query(`SELECT hj.avatar,hj.name,hg.* FROM allarticle hg left join user hj on hg.uid=hj.id WHERE 1`, function (error, results) {
		if (error) throw error;
		res.send(results);
	});
});

// 收藏集
router.post('/getColle', function(req, res) {
	console.log('请求收藏集');
	console.log(req.body);
	
	connect.query(`SELECT follow_id FROM follow WHERE user_id='${req.body.id}'`, function (error, results) {
		if (error) throw error;
		console.log(results);
		let cArr=[];
		for(let i=0; i<results.length; i++){
			connect.query(`SELECT * FROM collections WHERE id='${results[i].follow_id}'`, function (err, result) {
				if(err) throw err;
				cArr.push(result[0]);
				if(i==results.length-1){
					console.log(cArr);
					res.send(cArr);
				}
			});
		}
	});
});

// 
router.post('/', function(req, res) {
	console.log('收藏集');
	connect.query(`SELECT * FROM collections WHERE 1`, function(error, results, fields) {
		if(error) throw error;
		res.send(results);
	})
});

// 
router.post('/add', function(req, res) {
	console.log('添加收藏集');
	connect.query(`INSERT INTO follow(follow_id, user_id) VALUES ('${req.body.fi}','${req.body.ui}')`, function(error, results, fields) {
		if(error) throw error;
		res.send(results);
	})
});

module.exports = router;
