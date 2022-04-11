var express = require('express');
const User = require("../models/user");
var router = express.Router();

/* GET create form. */
router.get('/', function(req, res, next) {
    res.render('user_form', { title: 'Create user' });
});


router.post('/', async(req,res) =>{
    const users = new User ({
        username: req.body.username,
        password: req.body.password,
        driver: req.body.driver,
        address: req.body.address,
        region: req.body.region
    })
    const user = await User.findOne({username:req.body.username})
    if(user==null){
    try{
        const a1 = await users.save()
        res.render('index',{title:'Login',logout:'User created successfully!'})
    }catch (err){
        res.send('Error')
    }} else{
        res.render('user_form', { title: 'Create user' , userexists: 'true' });
    }
})
module.exports = router;