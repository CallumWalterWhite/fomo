import express from "express";
import { getLocations, getCities } from "../controllers/locations.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getLocations);
router.get("/cities", getCities);

export default router;
