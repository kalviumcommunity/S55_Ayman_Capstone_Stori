const express = require('express');
const app = express();
require('dotenv').config()

app.get('/get',(req,res)=>{
    res.send("Working")
})

app.listen(process.env.PORT, ()=>{
    console.log('all good')
})
