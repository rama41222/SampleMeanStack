const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database.js');
const User = require('../models/user.js');
const sanitizer = require('sanitizer');

router.post('/',(req,res)=>{
 
   
   const email = sanitizer.sanitize(req.body.email);
   const name  = sanitizer.sanitize(req.body.name);
   const password = sanitizer.sanitize(req.body.password);

 
   User.getAllByEmail(email,(err,user)=>{

   		if(err) throw err;

		
   		console.log(user);
   		if(user.length == 0){

   			var user = new User({
		   		email : email,
		   		name : name,
		   		password : password
		   });

   			User.addUser(user,(err,user)=>{
   				if(err){
   					res.json({success:false,msg : "User Creation Failed"});
   				}else{
   					res.json({success:true,msg : "User Creation Successful"});
   				}	
   			});
   		}else{
   			res.json({success:false,msg : "User Already Exists"});
   		}

   });

     
});

router.get('/',(req,res)=>{
	User.getAllUsers((err, users)=>{
		if(err){
			throw err;
		}else{
			res.json({success:true, usersList : users });
		}
	});
});


module.exports =  router;

