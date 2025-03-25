import express from 'express';
import { resetPassword, changePassword, search } from '../controllers/userController.js'

const router = express.Router();


// reset password
router.post('/reset-password', resetPassword);
// change password
router.post('/change-password', changePassword)
// search
router.post('/search', search);

export default router;

