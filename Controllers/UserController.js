var bcrypt = require('bcrypt');
var user= require('../Models/UserModel.js');

function validator(req,res,next){
	//console.log(req,body);
if(req.body.username === ''){
		res.json({status:404,message:'username is required'})
}
else if(req.body.phone === ''){
	res.json({status:404,message:'phone is required'})
}
else if(req.body.address === ''){
	res.json({status:404,message:'address is required'})
}
else if(req.body.email === ''){
	res.json({status:404,message:'email is required'})
}
else if(req.body.address === ''){
	res.json({status:404,message:'password is required'})
}

else{
	//res.json({status:200, mess:'hagya'})
	next();
}
}

function getHash(req,res,next){
	var saltRounds = 10;
	bcrypt.hash(req.body.password, saltRounds, function(err, hash){
		if(hash){
			console.log(hash);
			req.hashKey=hash;
			//res.send(hash);
			actualRegister(req,res,next);
			//next();
		}
		if(err){
			res.json({status:500, message:'couldnot hash the message'});
			next();
		}
	});

}

function actualRegister(req,res,next){
	//db table ma insert garna
	user.create({
		username:req.body.username,
		phone:req.body.phone,
		address:req.body.address,
		email:req.body.email,
		password:req.hashKey
	})
	.then(function(result){
		//console.log(result);
		res.json({status:201, message:'registered successfully'});
	})
	.catch(function(err){
		//console.log(err)
		res.json(err);

	})
	}

	function checkIfUserExists(req,res,next){
		//check if username already exists
		user.findOne({
			where:{username:req.body.username}
		})
		.then(function(result){
			//console.log(result);
			//res.json(result);
			if(result == null){
			next();
		}else{
			res.json({status:409, message:'user already exists'});
		}
		
		})
		.catch(function(err){
		//console.log(err)
		res.json(err);
	})

	}

	function deleteUser(req,res,next){
		//console.log('deletehere')
		if(req.params.id===null ||req.params.id===undefined){
			//res.status(404);
			//res.json({status:404, message: 'Id not provided'})
	}
	user.destroy({
		where:{
			id:req.params.id
		}
	})
	.then(function(result){
		console.log(result);
		if(result === 0){
			//res.status(500);
			res.json({status:500,message:"couldnot delete user"})
		}else
		{
		//res.status(200);
			res.json({status:200,message:"user deleted successfully"})
	}
	})
	.catch(function(err){

	}); 
}

 function editUser(req, res, next){
 	user.findOneAndUpdate({
 		_id :req.params.id}, req.body)
 	
 	.then(function()
 		{res.send("updated")})
 	.catch(function(e)
 		{ res.send(e)}) }
    
  

	
module.exports ={validator,checkIfUserExists, getHash, actualRegister, deleteUser, editUser}