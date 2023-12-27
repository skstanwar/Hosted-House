import express from 'express';
import {IsAuth, AntiAuth} from './middelware/Middleware.js';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname  , join} from 'path';
import userRoutes from './Routes/userRoutes.js';
import {connectDB} from './userDB/db.js'

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys: [crypto.randomBytes(32).toString('hex')],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(cookieParser());
///--------------path setup-----------------
const currenFileUrl= new URL(import.meta.url);
const currenFilePath= fileURLToPath(currenFileUrl);
const publicDirPath= join(dirname(currenFilePath), 'public');
const staticDirPath= join(dirname(currenFilePath), 'static');
app.use(express.static(staticDirPath));

 app.get('/login',AntiAuth, (req , res)=>{
   res.sendFile(join(publicDirPath, 'login.html'));
 })
 app.get('/register',AntiAuth, (req , res)=>{
  res.sendFile(join(publicDirPath, 'register.html'));   
 })
 app.get('/', IsAuth, (req , res)=>{
    res.send('home');
 });
 app.use('/api', userRoutes)

app.listen(3000, () => console.log('Server running on port 3000'));
