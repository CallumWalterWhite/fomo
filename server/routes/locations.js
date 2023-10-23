import express from "express";
import { getLocations } from "../controllers/locations.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/all", getLocations);

export default router;
