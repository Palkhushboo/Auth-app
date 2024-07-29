import express from 'express';
import mongoose from 'mongoose';
//import dotenv from 'dotenv';
//dotenv.config();
mongoose.connect('mongodb://localhost:27017/Auth').then(()=>{
 console.log("connected to database")
}).catch((err)=>{
  console.log(err)
})
const app=express();
app.listen(400,()=>{
 console.log('listening on port 400')
})