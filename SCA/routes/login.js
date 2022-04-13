var express = require('express');
const User = require("../models/user");
var router = express.Router();


router.post('/',async (req,res)=>{
    try {
        const users = await User.findOne({username:req.body.email})
        if(req.body.email == users.username && req.body.password == users.password){
            req.session.user = req.body.email;
            //res.end('Login successful');
            res.redirect('/dashboard');
        }else{
            res.render('index',{user:users,logout:'invalid password'})
        }
    }catch (err){
        res.render('index',{logout:'invalid username'})
    }

});

module.exports = router;