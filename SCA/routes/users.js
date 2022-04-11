var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', async(req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  }catch(err){
    res.send('respond with a resource');
  }
});

router.get('/:id', async(req, res) => {
  try {
    const users = await User.findOne({username:req.params.id})
    res.send(users.password)
  }catch (err){
    res.send('Error')
  }
});

router.post('/', async(req,res) =>{
  const users = new User ({
    username: req.body.username,
    password: req.body.password,
    driver: req.body.driver
  })
  try{
    const a1 = await users.save()
    res.json(a1)
  }catch (err){
    res.send('Error')
  }
})

router.patch('/:id', async(req,res) =>{
  try{
    const users = await User.findById(req.params.id)
    users.driver = req.body.driver
    const a1 = await users.save()
    res.json(a1)
  }catch(err){
    res.send('Error')
  }
})
router.delete('/:id', async(req,res) =>{
  try{
    const users = await User.findById(req.params.id)
    const a1 = await users.delete()
    res.json(a1)
  }catch(err){
    res.send('Error')
  }
})



module.exports = router;