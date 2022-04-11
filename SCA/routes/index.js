var express = require('express');
const User = require("../models/user");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login system' });
});

//route for dashboard
router.get('/dashboard',(req,res)=>{
  if(req.session.user){
    res.render('dashboard',{user:req.session.user})
  }else{
    res.send('Unauthorized User')
  }
})

//route for logout
router.get('/logout',(req,res)=>{
  req.session.destroy(function(err){
    if(err){
      consol.log(err);
      res.send('Error')
    }else{
      res.render('index',{title:'Express',logout:'Logout Successfully!'})
    }
  })
})
router.get('/delete',(req,res)=>{
  res.render('delete',{title:'Delete user',user:req.session.user})
})

router.post('/delete',async(req,res)=>{
  try{
    console.log(req.session.user)
    const users = await User.findOne({username:req.session.user})
    const a1 = await users.delete()
    req.session.destroy(function(err) {
      if (err) {
        consol.log(err);
        res.send('Error')
      } else {
        res.render('index', {title: 'Login', logout: 'The user has been deleted!'})
      }
    })
  }catch(err){
    res.send('Error')
  }
})

module.exports = router;
