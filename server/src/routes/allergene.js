import { Router } from "express";
import { getAllergen, updateUserAllergene } from "../controllers/allergene.js";

const router = Router();
router.get("/", getAllergen);
router.post("/updateallergene", updateUserAllergene);

export default router;
