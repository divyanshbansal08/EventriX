import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";
// import adminAuth from "../middlewares/adminAuth.middleware.js";
import { createEvent, deleteEvent, getEvent, getEventByName, updateEvent } from "../controllers/events.controllers.js";

const router = express.Router();

router.get("/", getEvent);
router.get("/eventByName/:eventName", getEventByName);
router.get("/:id", getEvent);
router.get("/clubs/:clubID", getEvent);
router.get("/councils/:councilName", getEvent); // Assuming this is for councils as well
router.get("/cells/:councilName", getEvent); // Assuming this is for cells as well
router.post("/admin/createEvent", upload.single("coverImage"), createEvent); //adminAuth
router.put("/admin/updateEvent/:id", upload.single("coverImage"), updateEvent); //adminAuth
router.delete("/admin/deleteEvent/:id", deleteEvent); //adminAuth

export default router;