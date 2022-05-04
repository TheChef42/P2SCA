var express = require('express');
var router = express.Router();
var path = require('path')

const multer = require('multer');
const User = require("../models/user");
const PickupOrder = require("../models/pickupOrder");
var imageUrl = ""

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        imageUrl = Date.now() + path.extname(file.originalname)
        cb(null, imageUrl)
    }
})

const pickupOrder = multer ({storage:storage})


router.post('/', pickupOrder.single('uploadImage'), async (req, res)=>{
    const users = await User.findOne({username:req.session.user})
    const pickupOrder = new PickupOrder ({
        username: users.username,
        date: req.body.date,
        address: users.address,
        region: users.region,
        url: imageUrl,
        driver: '',
        status: 'requested'
    })
    const a1 = await pickupOrder.save()
    res.render('dashboard',{user:users,driver:users.driver});
})

router.get('/',(req,res)=>{
    if(req.session.user){
        res.render('pickupOrder',{user:req.session.user})
    }else{
        res.send('Unauthorized User')
    }
})

module.exports = router;