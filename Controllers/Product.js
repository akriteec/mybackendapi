const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();


router.post('/addProduct', (req, res, next) => {

        Product.create({
            
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            imagep: req.body.imagep,
            productType:req.body.productType
           
        }).then((product) => {
            res.json({ status: "Product added success!"});
        }).catch(next);
    });



router.get('/',(req, res, next) => {
    Product.find({},(err,product)=>{
        if(err){
            res.json(next)
        }
        res.json(product)
    });
})

module.exports = router;