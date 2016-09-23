
var userRepository = function (username,password){
	console.log("Creando Usuarios : "+username+" - "+password);
	
	this.UserName=username;
	this.Password=password;
	
	return this;
}


module.exports = userRepository;

var response = function (state,message,object){
	console.log("Creando Usuarios : "+username+" - "+password);
	
	this.State=state;
	this.Message=message;
	this.Object=object;
	
	return this;
}


module.exports = response;