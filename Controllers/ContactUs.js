var express = require('express');
var Feedback = require('../Models/ContactUs');
var router = express.Router();


router.post('/addFeedback', (req, res, next) => {

        Feedback.create({
            
            yourname:req.body.yourname,
            youremail:req.body.youremail,
            yourfeedback:req.body.yourfeedback
           
        }).then((feedback) => {
            res.json({ status: "Feedback added success!"});
        }).catch(next);
    });



router.get('/',(req, res, next) => {
    Feedback.find({},(err,feedback)=>{
        if(err){
            res.json(next)
        }
        res.json(feedback)
    });
})

module.exports = router;