

var dbConfig= require('./Config/databaseConfig.js')
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var swaggerJSDoc =require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");
var swaggerDefinition = {
	info:{
		title:'Grocery',
		description:'This is my final project documentation',
		version:'1.0.0'
	},
	securityDefinitions: {
		bearerAuth:{
			type:'apiKey',
			name:'authorization',
			in:'header',
			scheme:'bearer',
		}
	},
	host:'localhost:3023',
	basepath:'/'
}
var swaggerOptions = {
swaggerDefinition,
apis:['./index.js']
}

var swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
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


//registrationAPIDocumentation
/***
* @swagger
* /registration:
*  post:
*   tags:
*    - Users
*   description: User Registration Testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: Please provide unique username
*    - name: phone
*      in: formData
*      type: string
*      required: true
*      description: Please provide phoneno
*    - name: address
*      in: formData
*      type: string
*      required: true
*      description: Please provide address
*    - name: email
*      in: formData
*      type: string
*      required: true
*      description: Please provide email
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Please provide password
*   responses:
*    201:
*     description: registered successfully
*    409:
*     description: user already exists
*    500:
*     description: internal server error
*/

app.post('/registration', 
	usercontroller.validator, usercontroller.checkIfUserExists,
	  usercontroller.getHash,usercontroller.actualRegister)


/***
* @swagger
* /login:
*  post:
*   tags:
*    - Users
*   description: User Login Testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: Please provide unique username
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Please provide password
*   responses:
*    201:
*     description: login successfully
*    422:
*     description: invalid username
*    500:
*     description: internal server error
*/
app.post('/login', authcontroller.validator, authcontroller.passwordChecker, authcontroller.jwtTokenGen)


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *      - Users
 *     security:
 *      - bearerAuth: []
 *     description: Deletes a single user
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/x-www-form-urlencoded
 *     parameters:
 *      - name: id
 *        in: path
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
app.delete('/user/:id', authcontroller.verifyToken, usercontroller.deleteUser)


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags:
 *      - Users
 *     security:
 *      - bearerAuth: []
 *     description: Updates a single user
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/x-www-form-urlencoded
 *     parameters:
 *      - name: id
 *        in: path
 *      - name: username
 *        in: formData
 *        type: string
 *        required: false
 *        description: Update your username
 *      - name: phone
 *        in: formData
 *        type: string
 *        required: false
 *        description: Update your phoneno
 *      - name: address
 *        in: formData
 *        type: string
 *        required: false
 *        description: Update your address
 *      - name: email
 *        in: formData
 *        type: string
 *        required: false
 *        description: Update your email
 *     responses:
 *       200:
 *         description: Successfully updated
 */
app.put('/update/:id', authcontroller.verifyToken, usercontroller.editUser)


app.listen(3023);
  /*app.listen(3023, () => {
     console.log('listen on 3023')
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