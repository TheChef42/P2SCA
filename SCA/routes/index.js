var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login system' });
});

/*router.post('/login',(req,res)=>{
  if(req.body.email == credential.email && req.body.password == credential.password){
    req.session.user = req.body.email;
    res.redirect('Login successful');
  }else{
    res.end('Invalid Username');
  }
});*/
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
      res.render('index',{title:'Express',logout:'logout Successfully...!'})
    }
  })
})


module.exports = router;
