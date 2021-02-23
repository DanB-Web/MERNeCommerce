import express from 'express';
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

import { registerUser, authUser, getUserProfile } from '../controllers/userController.js';

//Register user
router.post('/', registerUser);

//Log user in
router.post('/login', authUser);

//Get user profile (protected)
router.get('/profile', protect, getUserProfile);

export default router;