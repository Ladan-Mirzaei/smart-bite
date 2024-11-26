import { Router } from "express";
import { creatDiet, getDiet } from "../controllers/diets.js";

const router = Router();
router.post("/", creatDiet);
router.get("/", getDiet);

export default router;
