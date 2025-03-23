import express from 'express';
import { makeEvent, registerEvent } from '../controllers/eventController.js';

const router = express.Router();


// Make event
router.post('/make-event', makeEvent);

// Register event
router.post('/register-event', registerEvent);


export default router;

