

var dbConfig= require('./Config/databaseConfig.js')
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

//IMAGE
//var multer= require('multer');
/*var upload= multer({dest:'images/'})
app.post('/test', upload.single('imagex'), function(req,res,next){
	console.log(req.files);
	console.log(req.body);
	 }
	 )*/


var userModel= require('./Models/UserModel.js');
var usercontroller =require('./Controllers/UserController.js');
var authcontroller =require('./Controllers/AuthController.js');


app.use(bodyParser.urlencoded({extended:true}));

app.post('/registration', 
	usercontroller.validator, usercontroller.checkIfUserExists,
	  usercontroller.getHash,usercontroller.actualRegister)
app.post('/login', authcontroller.validator, authcontroller.passwordChecker, authcontroller.jwtTokenGen)
app.delete('/user/:id', authcontroller.verifyToken, usercontroller.deleteUser)


app.listen(3023);
  /*app.listen(3000, () => {
     console.log('listen on 3000')
   })
*/


//POSTMAN: to create localhost
/*app.get('/hospitallist', function(req,res,next){
	console.log(req.query);
	res.send('req received');
})

app.post('/registration',function(req,res,next){
	console.log(req.body);
	res.send('req registration received');
})
app.listen(3023);

app.get('/hospitalliust/:id',
	function(req,res,next){
		console.log(req);
		res.send('req received')
	}
	)*/