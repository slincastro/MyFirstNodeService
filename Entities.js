
var userRepository = function (username,password){
	console.log("Creando Usuarios : "+username+" - "+password);
	
	this.UserName=username;
	this.Password=password;
	
	return this;
}


module.exports = userRepository;