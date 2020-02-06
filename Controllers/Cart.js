const express = require('express');
const Cart = require('../Models/CartModel');
const router = express.Router();


router.post('/addCart', (req, res, next) => {

        Cart.create({
           
            pprice:req.body.pprice,
            pname:req.body.pname,
            pdescription:req.body.pdescription,
            pemail:req.body.pemail,
            pphone:req.body.pphone
           
        }).then((cart) => {
            res.json({ status: "Your product added success!"});
        }).catch(next);
    });



router.get('/',(req, res, next) => {
       var data = JSON.parse(localStorage.getItem('product'));
    Cart.find({},(err,cart)=>{
        if(err){
            res.json(next)
        }
        res.json(cart)
    });
})

module.exports = router;