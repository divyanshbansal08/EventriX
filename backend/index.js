import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
const app = express();
import { users } from './services/userService.js';
import { initializeUsers } from './services/userService.js';

// Middleware
app.use(cors());
app.use(express.json());

await initializeUsers();
console.log(users);

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import otpRoutes from './routes/otpRoutes.js'
import { verifyToken } from './middlewares/authMiddleware.js';

app.use('/api/auth', authRoutes);
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ success: true, message: `Hello, ${req.user.username}! You have accessed a protected route.` });
});
app.use('/api/user', userRoutes);
app.use('/api/otp', otpRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
