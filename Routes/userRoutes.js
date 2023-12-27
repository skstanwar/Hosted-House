import { Router } from "express";
import {challange  , register , login} from '../controllers/userController.js';

const Userrouter = Router();
// Userrouter.post('/login', login);
Userrouter.post('/register', register);
Userrouter.get('/challange', challange);
Userrouter.post('/login', login);

export default Userrouter;