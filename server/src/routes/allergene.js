import { Router } from "express";
import { getAllergen } from "../controllers/allergene.js";

const router = Router();
router.get("/", getAllergen);

export default router;
