import express from "express";
import { getAllLocations, getLocation, getCities } from "../controllers/locations.js";
const router = express.Router();
/* READ */
router.get("/", getAllLocations);
router.get("/:id", getLocation);

export default router;
