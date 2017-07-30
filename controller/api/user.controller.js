var express = require('express');
var router = express.Router();
var config = require('config.json');
var userModel = require('models/users');

router.post('/register', function(req, res){
	userModel.createUser(req.body, function(err, user){
		console.log('back in reg')
		if(err){
			console.log("in reg",err);
			if(err.code  === 11000)
			res.status(401).send('A user with email: ' + req.body.email + ' already exists.');
		}
		else{
			console.log('sending status');
			return res.status(200).send('done');
		}

	})
});

router.post('/authenticate', function(req, res){
	userModel.authenticate(req.body.email, req.body.password, function(err, token){
		console.log('back in auth');
		if(err){
			console.log('err in auth',err);
			if(err.code === 403)
				return res.status(401).send('Email or password is incorrect');
			if(err.code === 404)
				return res.status(401).send('Email not found!');
		}
		return res.status(200).send({token:token});
		

	})
})

module.exports = router;