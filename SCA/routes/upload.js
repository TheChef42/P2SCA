var express = require('express');
var router = express.Router();
var path = require('path')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploadImage');
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer ({storage:storage})


router.post('/', upload.single('uploadImage'), async (req, res)=>{
    res.render('upload');
})

router.get('/',(req,res)=>{
    if(req.session.user){
        res.render('upload',{user:req.session.user})
    }else{
        res.send('Unauthorized User')
    }
})

router.get('/', async (req, res)=>{
    res.render('upload');
})

module.exports = router;