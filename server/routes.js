const express = require('express');
const {UserModel} = require('./signupSchema')
const router = express.Router();
router.use(express.json());
require('dotenv').config();

router.post('/login',async(req,res)=>{
    try{
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password });

        if(!user){
            return res.status(401).json({error:'Invalid username or password'});
        }
        res.status(200).json({user});
       

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/signup',async(req,res)=>{
    try {
        const user = await UserModel.create ({
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            confirm_password:req.body.confirm_password
        })
       
        res.status(200).send(user)
        
    }catch(err){
        console.error(err);
    }
})

module.exports = router