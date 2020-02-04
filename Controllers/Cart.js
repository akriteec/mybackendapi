const express = require('express');
const Cart = require('../Models/CartModel');
const router = express.Router();


router.post('/addCart', (req, res, next) => {

        Cart.create({
            
            productType:req.body.productType,
           // imagePT: req.body.imagePT
           
        }).then((productType) => {
            res.json({ status: "Your product added success!"});
        }).catch(next);
    });



router.get('/',(req, res, next) => {
       var data = JSON.parse(localStorage.getItem('product'));
    Cart.find({},(err,producttype)=>{
        if(err){
            res.json(next)
        }
        res.json(producttype)
    });
})

module.exports = router;