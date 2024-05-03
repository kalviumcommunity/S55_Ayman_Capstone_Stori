const express = require('express');
const {UserModel} = require('./signupSchema')
const router = express.Router();
router.use(express.json());
require('dotenv').config();
const Joi = require("joi");
const jwt = require('jsonwebtoken');

const tok = process.env.ACCESS_TOKEN

const validateSchema = Joi.object({
    "email": Joi.string().required(),
    "username": Joi.string().required(),
    "password": Joi.string().required(),
    "confirm_password": Joi.string().required(),
});

    

router.post('/login',async(req,res)=>{
    try{
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password });

        if(!user){
            return res.status(201).json({error:'Invalid username or password'});
        }
        res.status(200).json({user});
       

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/signup',async(req,res)=>{
    try {
        const{value,error} = validateSchema.validate(req.body)

        if(error){
            res.send(error.details)
        }
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


router.post('/auth',async(req,res)=>{
    try{
        const user = {
            username:req.body.username,
            password : req.body.password
        }
        const token = jwt.sign(user,tok)
        res.cookie('token',token,{maxAge:365*24*60*60*1000})
        res.status(200).json(token)

    }catch(err){
        console.log(err)
    }
})

router.get('/users',async(req,res)=>{
    try {
        const users = await UserModel.find({})
        res.send(users)

    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')        
    }
})

module.exports = router