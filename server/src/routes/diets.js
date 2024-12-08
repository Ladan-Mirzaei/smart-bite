import { Router } from "express";
import {
  creatDiet,
  getDiet,
  updateUserDiet,
  userDietsInfo,
} from "../controllers/diets.js";
import firebaseRequireAuth from "../firebaseRequireAuth.js";
import firebaseGetAuth from "../firebaseGetAuth.js";

const router = Router();
router.post("/", creatDiet);
router.get("/", getDiet);
router.post("/updatediets", firebaseGetAuth, updateUserDiet);
router.get("/getuserdiets", firebaseGetAuth, userDietsInfo);

export default router;
