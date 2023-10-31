import express from "express";
import { getLocationsByCity, getLocation } from "../controllers/locations.js";
const router = express.Router();
/* READ */
router.get("/c/:CityId", getLocationsByCity);
router.get("/:id", getLocation);

export default router;
