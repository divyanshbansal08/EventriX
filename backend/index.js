import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

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
import protectedRoutes from './routes/protectedRoutes.js';
import { verifyToken } from './middlewares/authMiddleware.js';
import adminRoutes from "./routes/adminRoutes.js";

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection failed:', error.message));

app.use("/api/admin", adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/protected', protectedRoutes);

app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ success: true, message: `Hello, ${req.user.email}! You have accessed a protected route.` });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
