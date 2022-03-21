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

module.exports = router;
