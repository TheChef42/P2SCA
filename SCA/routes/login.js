var express = require('express');
const User = require("../models/user");
const Rating = require('../models/rating')
var router = express.Router();


router.post('/',async (req,res)=>{
    try {
        const users = await User.findOne({username:req.body.email})
        const rating = await Rating.find({username:req.body.email}).select('rating')
        average = rating.reduce((sum, { rating }) => sum + rating, 0) / rating.length
        if(req.body.email == users.username && req.body.password == users.password){
            req.session.user = req.body.email;
            //res.end('Login successful');
            //res.redirect('/dashboard');
            res.render('dashboard',{user:users,driver:users.driver,average: average});
        }else{
            res.render('index',{user:users,logout:'invalid password'})
        }
    }catch (err){
        res.render('index',{logout:'invalid username'})
    }

});

module.exports = router;