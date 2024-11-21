import { Router } from "express";
import { creatDiet } from "../controllers/diets.js";

const router = Router();
router.post("/", creatDiet);

export default router;
