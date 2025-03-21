import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

export default router;
