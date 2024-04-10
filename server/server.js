const express = require('express');
const app = express();
require('dotenv').config()
const {startDatabase} = require('./db'); 
const router = require('./routes')
const cors = require('cors');

app.use(cors())

app.use(router)

app.get('/get',(req,res)=>{
    res.send("Working")
})

app.listen(process.env.PORT, ()=>{
    startDatabase();
    console.log('all good')
})
