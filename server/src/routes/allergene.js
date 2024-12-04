import { Router } from "express";
import { getAllergen, updateUserAllergene } from "../controllers/allergene.js";
import firebaseGetAuth from "../firebaseGetAuth.js";

const router = Router();
router.get("/", getAllergen);
router.post("/updateallergene", firebaseGetAuth, updateUserAllergene);

export default router;
