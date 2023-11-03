import express from "express";
import { getFeedPosts, getLocationPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/c/:locationCityId", getFeedPosts);
router.get("/:locationdata_id/posts", getLocationPosts);
export default router;
