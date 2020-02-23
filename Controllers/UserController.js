const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
        err.status = 500;
        return next(err);
        }
        User.create({
            
            fullname:req.body.fullname,
            address:req.body.address,
            phone:req.body.phone,
            email:req.body.email,
            password: hash,
            imageu: req.body.imageu
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {

                let err = new Error('Email not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me', auth.verifyUser, (req,res,next) =>{
    res.json({_id:req.user._id,imageu:req.user.imageu, fullname:req.user.fullname, address:req.user.address,phone:req.user.phone,email:req.user.email,password:req.user.password});
});

router.get('/',(req,res,next)=>{
    User.find({},(err,users)=>{
        if (err) {
            res.json(next)
        }
        res.json(users)
    });
});


router.put('/update', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: user._id, email: req.user.email, fullname: req.user.fullname, phone: user.phone, address:user.address,password:user.password});
        }).catch(next);
});


router.route("/:id")
 .delete(function(req,res,next){
    User.findByIdAndDelete({_id:req.params.id},function(err){
        if (!err){
            res.json("successfully deleted");
        }
        else{
            res.send(err);
        }
       
    })
});

// router.put("/me",auth.verifyUser,(req,res,next)=>{
//     User.findByIdAndUpdate({_id:req.user._id},req.body)
//     .then(()=>{
//         User.findOne({_id:req.user._id})
//         .then((result)=>{
//             res.json(result)
//         })
       
//     })
//      .catch(next)
// })


module.exports = router;
