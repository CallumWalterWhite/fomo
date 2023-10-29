import express from "express";
import { getAllLocations, getLocation, getCities } from "../controllers/locations.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getAllLocations);
router.get("/:id", getLocation);
router.get("/cities", getCities);

export default router;
