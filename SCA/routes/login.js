var express = require('express');
const User = require("../models/user");
var router = express.Router();

const credential = {
    email: 'admin@gmail.com',
    password: 'admin123'
}

router.post('/',async (req,res)=>{
    try {
        const users = await User.findOne({username:req.body.email})
        if(req.body.email == users.username && req.body.password == users.password){
            req.session.user = req.body.email;
            //res.end('Login successful');
            res.redirect('/dashboard');
        }else{
            res.end('Invalid Username');
        }
    }catch (err){
        res.send('Error')
    }

});

module.exports = router;