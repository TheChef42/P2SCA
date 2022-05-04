var express = require('express');
const User = require("../models/user");
const Rating = require('../models/rating')
var router = express.Router();
let isMatch = false

router.post('/',async (req,res)=>{
    const users = await User.findOne({username:req.body.email})
    const rating = await Rating.find({username:req.body.email}).select('rating')
    average = rating.reduce((sum, { rating }) => sum + rating, 0) / rating.length
    User.findOne({username: req.body.email}, async function(err, User) {
        if (err) throw err;
        // test a matching password
        User.comparePassword(req.body.password, isMatch = function(err, isMatch) {
            if (err) throw err;
            if(isMatch){
                req.session.user = req.body.email;
                res.redirect('/dashboard')
                //res.render('dashboard',{user:users,driver:users.driver,average: average});
            }else{
                res.render('index',{user:users,logout:'invalid password'})
            }
        });
    });
});

module.exports = router;