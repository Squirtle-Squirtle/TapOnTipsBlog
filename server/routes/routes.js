import express from 'express';

import { signupUser } from '../controller/userController.js';
import { loginUser } from '../controller/userController.js';
const router=express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);

export default router;