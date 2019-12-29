var bcrypt = require('bcrypt');
var product= require('../Models/ProductModel.js');

function addProduct(req,res,next){
	//db table ma insert garna
	product.create({
		name:req.body.name,
		price:req.body.price,
		description:req.body.description,
		image:req.body.image
		
	})
	.then(function(result){
		//console.log(result);
		res.json({status:201, message:'product added successfully'});
	})
	.catch(function(err){
		//console.log(err)
		res.json(err);

	})
	}



module.exports ={addProduct}