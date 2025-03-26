import express from "express";
import { verifyAdmin } from "../middlewares/authMiddleware.js";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.get("/home-admin", verifyAdmin, (req, res) => {
    res.json({ success: true, message: `Welcome Admin: ${req.user.email}` });
});
// Admin login route
router.post('/login', loginAdmin);
export default router;
