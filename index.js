
var express = require('express');
var mongoose = require("mongoose");
var morgan = require('morgan');
var dotenv = require('dotenv').config();
var auth = require('./auth');
var cors = require('cors');

var app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({extended: true }));

// var bodyParser = require('body-parser')

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
	host:'localhost:3000',
	basepath:'/'
}
var swaggerOptions = {
swaggerDefinition,
apis:['./index.js']
}

var swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

var userModel= require('./Models/UserModel.js');
var feedbackModel= require('./Models/ContactUs.js');
var usercontroller =require('./Controllers/UserController.js');
var productModel = require('./Models/ProductModel.js')
var productTypeModel = require('./Models/ProductType.js')
var productTypecontroller =require('./Controllers/ProductType.js');
var productcontroller =require('./Controllers/Product.js');
var Feedbackcontroller =require('./Controllers/ContactUs.js');
var uploadcontroller = require('./Controllers/upload.js');


//IMAGE
app.use(express.static(__dirname + "/upload"));

//app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, 
	useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

app.use('/users', usercontroller);
app.use('/upload', uploadcontroller);
app.use('/product', productcontroller);
app.use('/ProductType', productTypecontroller);
app.use('/feedback', Feedbackcontroller);
app.use('/me', usercontroller);
app.use(auth.verifyUser);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});


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
*    - name: fullname
*      in: formData
*      type: string
*      required: true
*      description: Please provide fullname
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
*      description: Please provide unique email
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

// app.post('/registration', 
// 	usercontroller.validator, usercontroller.checkIfUserExists,
// 	  usercontroller.getHash,usercontroller.actualRegister)


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
// app.put('/update/:id', authcontroller.verifyToken, usercontroller.editUser)


// app.post('/addproduct', productcontroller.addProduct)

// app.listen(3023);
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