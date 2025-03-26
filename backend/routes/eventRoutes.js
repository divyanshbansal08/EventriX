import express from 'express';
import { makeEvent, registerEvent } from '../controllers/eventController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; // Import middleware

const router = express.Router();

// Create Event
router.post('/make-event', makeEvent);

// Register Event (Protected Route, No Event ID Needed)
router.post('/register-event', verifyToken, registerEvent);

export default router;
