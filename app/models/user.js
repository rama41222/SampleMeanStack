const mongoose = require('mongoose');
mongoose.Promise= require('bluebird');
const config = require('../config/database');


var UserSchema = mongoose.Schema({
	email :{
		type:String,
		required : true
	},
	name : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	}
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.addUser = (newUser,callback)=>{
	newUser.save(callback);
}

module.exports.getAllUsers = (callback)=>{
	User.find(callback);
}

module.exports.getAllByEmail = (email,callback)=>{
	const query = { email : email };
	User.find(query,callback);
}

module.exports.getUserById = (_id,callback)=>{
	const query = { _id : _id };
	User.find(query,callback);
}