const express = require('express');
const Product = require('../Models/ProductModel');
const router = express.Router();


router.post('/addProduct', (req, res, next) => {
    
        Product.create({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            imagep: req.body.imagep
        }).then((product) => {
            res.json({ status: "Product added success!" });
        }).catch(next);
    });



module.exports = router;