var express = require('express');
const User = require("../models/user");
const PickupOrder = require("../models/pickupOrder");
var router = express.Router();



router.get('/', async(req,res)=>{
    res.render('index', { title: 'Login system' });
    /*try {
      res.render('test')
    }catch (err) {
      res.send('Error')
    }*/
})


module.exports = router;