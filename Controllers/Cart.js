const express = require('express');
const Cart = require('../Models/CartModel');
const router = express.Router();
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const auth = require('../auth');


router.post('/addCart', (req, res, next) => {
        Cart.create({
           
            pprice:req.body.pprice,
            pname:req.body.pname,
            pdescription:req.body.pdescription,
            pemail:req.body.pemail,
            pphone:req.body.pphone
           
        }).then((cart) => {
            let token = jwt.sign({ _id: cart._id }, process.env.SECRET);
                        res.json({ status: 'Your product added success!', token: token });
           // res.json({ status: "Your product added success!"});
        }).catch(next);
    });



router.get('/buy', auth.verifyOrder,(req, res, next) => {

    res.json({_id:req.cart._id,pprice:req.cart.pprice, pname:req.cart.pname,pdescription:req.cart.pdescription});
       //var data = JSON.parse(localStorage.getItem('product'));
    // Cart.find({},(err,cart)=>{
    //     if(err){
    //         res.json(next)
    //     }
    //     res.json(cart)
    // });
});

module.exports = router;