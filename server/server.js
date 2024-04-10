const express = require('express');
const app = express();

app.get('/get',(req,res)=>{
    res.send("Working")
})

app.listen(3000, ()=>{
    console.log('all good')
})
