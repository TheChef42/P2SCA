var express = require('express');
const User = require("../models/user");
const PickupOrder = require("../models/pickupOrder");
var router = express.Router();

router.get('/list', async(req, res) => {
    try {
        const pickups = await PickupOrder.find()
        //res.json(pickups);
        res.render('test', {
            pickups: pickups
        });

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

router.post('/selectedOrder', async(req,res) =>{
    console.log(await PickupOrder.findById(req.body.id))
    try{
        await PickupOrder.findByIdAndUpdate(req.body.id,{driver: req.session.user, status: 'accepted'})
        const pickups = await PickupOrder.find()
        res.render('test', {pickups: pickups, confirmation: 'Pickup selected' });
    }catch{
        res.send('Error her')
    }
})

module.exports = router;