import express from 'express';
import {signup} from '../controller/auth.controller.js'
const app=express();
app.post('/signup',signup)
export default app;