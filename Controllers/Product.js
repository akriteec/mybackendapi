const express = require('express');
const Product = require('../Models/ProductModel');
const router = express.Router();


router.post('/addProduct', (req, res, next) => {

        Product.create({
            
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            imagep: req.body.imagep,
            popularproduct:req.body.popularproduct,
            dailyessentials:req.body.dailyessentials,
            vegetables:req.body.vegetables,
            fruits:req.body.fruits,
            cookingoils:req.body.cookingoils
           
        }).then((product) => {
            res.json({ status: "Product added success!"});
        }).catch(next);
    });



// router.get('/products',(req, res, next) => {
//     Product.find({},(err,product)=>{
//         if(err){
//             res.json(next)
//         }
//         res.json(product)
//     });
// })

router.route("/products")
    .get(function(req, res){
        Product.find(function(err, foundproducts){
            if(!err){
                res.json(foundproducts);
            }else{
                console.log(err)
            }

        

        });
    });
router.route("/products/popular")
    .get(function (req,res){
            Product.find({popularproduct:"yes"},function(err, foundproducts){

                    if(err){
                        console.log(err)
                    }else{
                        res.json(foundproducts);
                    }
            });
    });
router.route("/products/dailyessentials")
    .get(function (req,res){
            Product.find({dailyessentials:"yes"},function(err, foundproducts){

                    if(err){
                        console.log(err)
                    }else{
                        res.json(foundproducts);
                    }
            });
    });

    router.route("/products/vegetables")
    .get(function (req,res){
            Product.find({vegetables:"yes"},function(err, foundproducts){

                    if(err){
                        console.log(err)
                    }else{
                        res.json(foundproducts);
                    }
            });
    });

    router.route("/products/fruits")
    .get(function (req,res){
            Product.find({fruits:"yes"},function(err, foundproducts){

                    if(err){
                        console.log(err)
                    }else{
                        res.json(foundproducts);
                    }
            });
    });

    router.route("/products/cookingoils")
    .get(function (req,res){
            Product.find({cookingoils:"yes"},function(err, foundproducts){

                    if(err){
                        console.log(err)
                    }else{
                        res.json(foundproducts);
                    }
            });
    });



 router.route("/products/:id")
 .delete(function(req,res,next){
    Product.findByIdAndDelete({_id:req.params.id},function(err){
        if (!err){
            res.json("successfully deleted");
        }
        else{
            res.send(err);
        }
       
    })
 });

router.route('/products/:id')
    .get((req, res, next) => {
        Product.findOne({ _id: req.params.id })
            .then((product) => {
                res.json(product);
            }).catch(next);
    })

    router.get('/my/:id',(req, res, next) => {
        Product.findById({ _id: req.params.id })
            .then((us) => {
                res.json(us)
            }).catch(next);
    })
    
// router.route('/:id')
//     .get((req, res, next) => {
//         Product.findById(req.params.id)
//             .populate('product', 'name')
//             .then((product) => {
//                 res.json(product);
//             }).catch(next);
//     })


router.route("/update/:id")
.put((req, res, next) => {
        Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((product) => {
                res.json(product);
            }).catch(next);
    })

module.exports = router;