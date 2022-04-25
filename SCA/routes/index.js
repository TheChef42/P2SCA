var express = require('express');
const User = require("../models/user");
const Rating = require('../models/rating')
const PickupOrder = require("../models/pickupOrder");
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
        console.log(err);
        res.send('Error')
      } else {
        res.render('index', {title: 'Login', logout: 'The user has been deleted!'})
      }
    })
  }catch(err){
    res.send('Error')
  }
})

router.post ('/pickUpOrder', async (req, res) => {
  try{
    const users = await User.findOne({username:req.session.user})
    const pickupOrder = new PickupOrder ({
      date: req.body.date,
      address: users.address,
      region: users.region
    })
    const a1 = await pickupOrder.save()
    res.redirect('dashboard')

  } catch(err) {
    res.send('Error')
  }

})
router.get('/pickup',(req,res)=>{
  res.render('pickup')
})

router.get('/pickUpOrder',(req,res)=>{
  res.render('dashboard')
})

router.get('/update',async(req,res)=>{
  const users = await User.findOne({username:req.session.user})
  res.render('update_form',{user: users})
})

router.post('/update', async(req,res) =>{
  try{
    const users = await User.findOne({username:req.session.user})
    users.username = req.body.username
    users.password = req.body.password
    users.address = req.body.address
    users.region = req.body.region
    users.driver = req.body.driver
    const a1 = await users.save()
    res.redirect('dashboard')
  }catch{
    res.send('Error')
  }
})

router.get('/ratingSystem',(req,res)=>{
  res.render('ratingSystem', {user:req.session.user})
    }
)

router.post('/rating', async (req,res)=>{
  console.log(req.session.user)
  try{
    const rating = new Rating ({
      username: req.session.user,
      rating: req.body.rating,
      comment: req.body.comment
    })
    await rating.save()
    res.redirect('dashboard')
  } catch{
    res.send('Æv var')
  }
})

module.exports = router;
