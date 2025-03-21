import express from 'express';
import resetPassword from '../controllers/userController.js'
const router = express.Router();


// reset password
router.post('/reset-password', resetPassword);

export default router;

