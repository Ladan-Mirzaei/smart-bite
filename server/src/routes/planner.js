import { Router } from "express";
import { creatEvents, getEvents } from "../controllers/planner.js";

const router = Router();
router.post("/", creatEvents);
router.get("/", getEvents);

export default router;
