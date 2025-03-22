import express from 'express';
import { resetPassword, search } from '../controllers/userController.js'

const router = express.Router();


// reset password
router.post('/reset-password', resetPassword);

router.post('/search', search);

export default router;

