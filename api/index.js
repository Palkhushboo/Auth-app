import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
//import dotenv from 'dotenv';
const app=express();
const db='mongodb://127.0.0.1:27017/userdata'
console.log(db)
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/userdata', { useNewUrlParser: true, useUnifiedTopology: true } );
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
}

// Call the function to connect to the database
connectToDatabase();
app.use(express.json());
app.listen(400,()=>{
 console.log('listening on port 4000')
})
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message||'Internal server error'
  return res.status(statusCode).json({success:false,
    error:message,
    statusCode:statusCode,
  })
})


