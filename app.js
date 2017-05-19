const express = require('express');
const bodyParser = require('body-parser');
const mongooge = require('mongooge');
const cors = require('cors');
const path = require('path');
mongooge.Promise = require('bluebird');
const config = require('./app/config/database.js');

const app = express();
const PORT = 3000;

mongooge.connect(config.database);

mongooge.connection.on('connected',()=>{
	console.log('Connected to the '+ config.database);
});

mongooge.connection.on('error', (err)=>{

	console.log('Database Connection failed due to \n' + err );

});

app.use(path.join(__dirname + './public'));
app.use(cors());


app.get('/', (req,res)=>{
	res.json({ "api": "Welcome to sample api 1.0.0v"});
});

app.listen(PORT, (err)=>{
	if(err){
		console.log('Error occured : \n' + err)
		return;
	}

	console.log('Server Started Runnig at port' + PORT);
});

