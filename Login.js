var express = require('express');

var app = express();

var bodyParser     =        require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.post('/Autenticate',function(req,res){
  
	var user = req.body.user;
    var password = req.body.password;

	//account=new entity(user,password);
    
    console.log("test...........2");
	
	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect("mongodb://localhost:27017/test_user", function(err, db) {

	
	  console.log("conecting db....");
	  findUser(user,password,db, function(status) {
	      db.close();
	      res.send(status);	      
	  });

	  
	});
});



var findUser = function(username,password,db, callback) {
   
   var cursor =db.collection('user').find( { "name": username ,"password":password} );

   cursor.toArray(function(err, items) {
                 console.log(items);
                 callback(items);
             });

};

app.listen(3000);
console.log('Listening Autenticate on port 3000...');