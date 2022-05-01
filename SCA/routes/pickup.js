var express = require('express');
const User = require("../models/user");
const PickupOrder = require("../models/pickupOrder");
const Rating = require("../models/rating");
var router = express.Router();

router.get('/list', async(req, res) => {
    try {
        const pickups = await PickupOrder.find({status:'requested'}).sort({date:'asc',region:'asc'})
        console.log('test' + pickups)
        res.render('test', {pickups: pickups});
    }catch(err){
        res.render('error');
        //res.render('pickups');
    }
});


router.get('/selectedOrder', async(req,res)=>{
    res.render('index', { title: 'Login system' });
    /*try {
      res.render('test')
    }catch (err) {
      res.send('Error')
    }*/
})
router.post('/list', async(req,res) =>{
    try{
        await PickupOrder.findByIdAndUpdate(req.body.id,{driver: req.session.user, status: 'accepted'})
        const pickups = await PickupOrder.find({status:'requested'}).sort({date:'asc',region:'asc'})
        res.render('test', {pickups: pickups, confirmation: 'Pickup selected' });
    }catch{
        res.send('Error')
    }
})
router.get('/myOrder', async(req, res) => {
    try {
        const pickups = await PickupOrder.find({driver:req.session.user}).sort({date:'asc',region:'asc'})
        console.log('test' + pickups)
        res.render('test', {pickups: pickups});
    }catch(err){
        res.render('error');
        //res.render('pickups');
    }
});
router.post('/myOrder', async(req, res) => {
    try{
        await PickupOrder.findByIdAndUpdate(req.body.id,{ status: 'confirmed'})
        const pickups = await PickupOrder.find({driver:req.session.user}).sort({date:'asc',region:'asc'})
        res.render('test', {pickups: pickups, confirmation: 'Pickup confirmed' });
    }catch{
        res.send('Error')
    }
});
router.get('/userOrder', async(req, res) => {
    try {
        const pickups = await PickupOrder.find({username:req.session.user}).sort({date:'asc',region:'asc'})
        res.render('userPickups', {pickups: pickups});
    }catch(err){
        res.render('error');
        //res.render('pickups');
    }
});
router.post('/userOrder', async(req, res) => {
    try{
        await PickupOrder.findByIdAndDelete(req.body.id)
        const pickups = await PickupOrder.find({username:req.session.user}).sort({date:'asc',region:'asc'})
        res.render('userPickups', {pickups: pickups, confirmation: 'Pickup deleted' });
    }catch{
        res.send('Error')
    }
});

router.post('/pickupRating',async(req,res)=>{
    try {
        const pickups = await PickupOrder.findById(req.body.id)
        res.render('ratingSystem', {pickups: pickups,url: pickups.url});
    }catch(err){
        res.render('error');
        //res.render('pickups');
    }
});
router.post('/pickupRatingg',async(req,res)=>{
    try{
        const rating = new Rating ({
            username: req.body.driver,
            rating: req.body.rating,
            comment: req.body.comment
        })
        await rating.save()
        res.redirect('/dashboard')
    } catch{
        res.send('Æv var')
    }
});

module.exports = router;