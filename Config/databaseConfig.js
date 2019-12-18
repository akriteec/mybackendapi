//database connection ko lai mysql ma
var Sequelize = require('sequelize');

//Passing parameters separately
var sequelize = new Sequelize('finalproject', 'root','hello123',{
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});


sequelize.authenticate()
  .then(function(result){
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.error('Unable to connect to the database:', err);
  });


module.exports= {
	Sequelize,
	sequelize
}