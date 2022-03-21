var express = require('express');
var router = express.Router();

const credential = {
    email: 'admin@gmail.com',
    password: 'admin123'
}

router.post('/',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.end('Login successful');
    }else{
        res.end('Invalid Username');
    }
});

module.exports = router;