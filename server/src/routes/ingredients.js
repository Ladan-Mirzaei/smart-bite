import { Router } from "express";
import { getIngredient, creatIngredient } from "../controllers/ingredients.js";

const router = Router();
router.post("/", creatIngredient);
router.get("/", getIngredient);

export default router;
