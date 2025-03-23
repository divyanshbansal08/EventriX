import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

import User from './models/User.js';

// Middleware
app.use(cors());
app.use(express.json());

// Services
import './services/eventnotifierService.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import { verifyToken } from './middlewares/authMiddleware.js';

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection failed:', error.message));

app.use('/api/auth', authRoutes);
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ success: true, message: `Hello, ${req.user.username}! You have accessed a protected route.` });
});
app.use('/api/user', userRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/event', eventRoutes);

// Checking users in db
app.get('/check-users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
