import express from 'express';
import {test} from '../controller/user.controller.js';
const app=express();
app.get('/',test);
export default app;