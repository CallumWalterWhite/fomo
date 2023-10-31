import express from "express";
import { getLocationsByCity, getLocation, getLocationSearch } from "../controllers/locations.js";
const router = express.Router();
/* READ */
router.get("/c/:CityId", getLocationsByCity);
router.get("/:id", getLocation);
router.get("/search/:term", getLocationSearch);

export default router;
