const express = require('express');
const {UserModel} = require('./signupSchema')
const router = express.Router();
router.use(express.json());
require('dotenv').config();
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const {Post} = require('./postSchema');

const tok = process.env.ACCESS_TOKEN

const validateSchema = Joi.object({
    "email": Joi.string().required(),
    "username": Joi.string().required(),
    "password": Joi.string().required(),
    "confirm_password": Joi.string().required(),
});


router.post('/posts', async (req, res) => {
    try {
      const { content } = req.body;
      const newPost = new Post({ content });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  });


  router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
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

// Update a post by ID
router.put('/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id;  
      const { content } = req.body;
  
      const updatedPost = await Post.findByIdAndUpdate(postId, { content }, { new: true });
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  });
  
  // Delete a post by ID
  router.delete('/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id;
  
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  });
  

module.exports = router