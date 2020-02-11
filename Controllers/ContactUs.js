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

 router.route("/:id")
 .delete(function(req,res,next){
    Feedback.findByIdAndDelete({_id:req.params.id},function(err){
        if (!err){
            res.json("successfully deleted");
        }
        else{
            res.send(err);
        }
       
    })
 });

module.exports = router;