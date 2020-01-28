const express = require('express');
const ProductType = require('../Models/ProductType');
const router = express.Router();


router.post('/addProductType', (req, res, next) => {

        ProductType.create({
            
            productType:req.body.productType,
           // imagePT: req.body.imagePT
           
        }).then((productType) => {
            res.json({ status: "ProductType added success!"});
        }).catch(next);
    });



router.get('/',(req, res, next) => {
    ProductType.find({},(err,producttype)=>{
        if(err){
            res.json(next)
        }
        res.json(producttype)
    });
})

module.exports = router;