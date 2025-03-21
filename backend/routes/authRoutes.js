import express from 'express';
import { logIN, signIN } from '../controllers/authController.js'
const router = express.Router();

// Send OTP
router.post('/login', logIN);

// Verify OTP
router.post('/signin', signIN);

export default router;
