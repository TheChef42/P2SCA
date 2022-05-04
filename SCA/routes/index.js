var express = require('express');
const User = require("../models/user");
const PickupOrder = require("../models/pickupOrder");
const Rating = require('../models/rating')
const bodyparser = require("express");
var router = express.Router();
express().set("view engine", "pug");


router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login system' });
});

router.get('/dashboard',async(req,res)=>{
  console.log(req.session.user)
  const users = await User.findOne({username:req.session.user})
  const rating = await Rating.find({username:req.session.user}).select('rating')
  average = rating.reduce((sum, { rating }) => sum + rating, 0) / rating.length
  if(req.session.user){
    res.render('dashboard',{user:users,driver:users.driver,average: average})
  }else{
    res.send('Unauthorized User')
  }
})

router.get('/logout',(req,res)=>{
  req.session.destroy(function(err){
    if(err){
      consol.log(err);
      res.send('Error')
    }else{
      res.render('login',{title:'Express',logout:'Logout Successfully!'})
    }
  })
})

router.get('/delete',(req,res)=>{
  res.render('deleteUser',{title:'Delete user',user:req.session.user})
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
        res.render('login', {title: 'Login', logout: 'The user has been deleted!'})
      }
    })
  }catch(err){
    res.send('Error')
  }
})

router.get('/pickup',(req,res)=>{
  if(req.session.user){
    res.render('pickupOrder',{user:req.session.user})
  }else{
    res.send('Unauthorized User')
  }
})

router.get('/update',async(req,res)=>{
  const users = await User.findOne({username:req.session.user})
  res.render('updateUser',{user: users})
})

 //TODO fix update
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

router.get('/rating',(req,res)=>{
  res.render('ratingSystem', {user:req.session.user})
})

router.post('/rating', async (req,res)=>{
  console.log(req.session.user)
  try{
    const rating = new Rating ({
      username: req.session.user,
      rating: req.body.rating,
      comment: req.body.comment
    })
    await rating.save()
    res.redirect('/dashboard')
  } catch{
    res.send('Æv var')
  }
})


router.get('/pictures',async(req,res)=>{
  const pickup = await PickupOrder.find()
  res.render('viewImageForRating',{pickups: pickup, user:req.session.user})
})

router.get('/rating/:id', async(req,res)=>{
  const pickup = await PickupOrder.find()
  try {
    res.render('ratingUser', {pickups: pickup, url: req.params.id});
  }catch (err) {
    res.send('Error')
  }
})

router.post('/rating/:id', async (req,res)=>{
  const pickup = await PickupOrder.findOne({url:req.params.id})
  try{
    const rating = new Rating ({
      username: pickup.username,
      rating: req.body.rating,
      comment: req.body.comment
    })
    await rating.save()
    res.redirect('/dashboard')
  } catch{
    res.send('Æv var')
  }
})

  router.get('/selectedOrder', async(req,res)=>{
    res.render('login', { title: 'Login system' });
  })


module.exports = router;
