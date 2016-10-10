var express = require('express');

var app = express();


app.get('/user',function(req,res){
	// Retrieve
var MongoClient = require('mongodb').MongoClient;


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test_user", function(err, db) {
  if(!err) {
   
   db.collection('user', function(err, collection) {
   
		if (err) {
			throw err;
		} else {
		
		  collection.find({}, {
			  'name': true,
			  'password': true
			})
		   
			.each(function(err, doc) {
				if(doc){
					res.send(doc);
					response=doc;
					console.log(doc);
				}
			})
		}
		});
	}
});
})


var bodyParser     =        require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login', function(req, res) {
	
	console.log(req.body);
	var user = req.body.user;
    var password = req.body.password;
 
    res.send( user + ' ' + password );
});

var account;
var entity = require('./Entity/Entities.js');

app.post('/test',function(req,res){
//res.header("Access-Control-Allow-Origin", "*");
	var user = req.body.user;
    
	res.send("Hi " + user + " !!");
						

})

app.post('/Autenticate',function(req,res){
  
	var user = req.body.user;
    var password = req.body.password;

	//account=new entity(user,password);
    
    console.log("test...........");
	
	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect("mongodb://localhost:27017/test_user", function(err, db) {

	if(!err) {
   
	db.collection('user', function(err, collection) {
   
   	var response = false;

		if (err) {
			throw err;
		} else {
		
		  collection.find({}, {
			  'name': true,
			  'password': true
			})
		   
			.each(function(err, doc) {
				if(doc){

				console.log(doc.name +" - "+user);
				
					if(doc.name)
					{
						if(doc.name==user )
						{
							console.log(doc.password +" - "+password);
							if(doc.password==password)
							{
								response=true;	
								return;		
							}
							
						}

					}

					
				}

				console.log(response);
			})
			console.log("respondiendo.............."+response);
			console.log(response);
			res.send(response);
		}
		});
	}
});
})


app.post('/AutenticateII',function(req,res){

	var user = req.body.user;
    var password = req.body.password;

	account=new entity(user,password);

	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect("mongodb://localhost:27017/test_user", function(err, db) {

	if(!err) {
   
	db.collection('user', function(err, collection) {
   
		if (err) {
			throw err;
		} else {
		
		  collection.find({ name : account.UserName}, {
			  'name': true,
			  'password': true
			})
		   
			.each(function(err, doc) {
				
				if(doc){
				console.log(doc);
				console.log(doc.password +" - "+account.Password);
				
					 if(doc.name)
					 {
						 if(doc.password==account.Password )
						 {
							 res.send(true);
						 }
					 }
				}
				
				res.send(false);
			})
		}
		});
	}
});
})


app.listen(3000);
console.log('Listening on port 3000...');
