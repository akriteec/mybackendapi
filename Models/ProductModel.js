

var dbConfig= require('../Config/databaseConfig.js')


var product= dbConfig.sequelize.define('product',
//attributes
{
	id:{
		type:dbConfig.Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	name:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	price:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	description:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	image:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
},


{
	paranoid:true
}
	)

product.sync({force:false})
.then(function(result){
	console.log(result);


})
.catch(function(err){
	console.log(err);
})

module.exports=product;