import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected Dashboard Route
router.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

export default router;

