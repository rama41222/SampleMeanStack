const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database.js');
const User = require('../models/user.js');
const sanitizer = require('sanitizer');

router.post('/',(req,res)=>{
console.log(req);
  console.log(req.body.email);
   const email = sanitizer.sanitize(req.body.email);
   console.log(email);
   const name  = sanitizer.sanitize(req.body.name);
   const password = sanitizer.sanitize(req.body.password);

 
   User.getAllByEmail(email,(err,user)=>{

   		if(err) throw err;

		var user = new User({
		   		email : email,
		   		name : name,
		   		password : password
		   });

   		if(user == null){
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


module.exports =  router;

