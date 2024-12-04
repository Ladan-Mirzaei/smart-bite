import { Router } from "express";
import { creatDiet, getDiet, updateUserDiet } from "../controllers/diets.js";
import firebaseRequireAuth from "../firebaseRequireAuth.js";
import firebaseGetAuth from "../firebaseGetAuth.js";

const router = Router();
router.post("/", creatDiet);
router.get("/", getDiet);
router.post("/updatediets", firebaseGetAuth, updateUserDiet);

export default router;
