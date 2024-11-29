import { Router } from "express";
import {
  creatUserProfile,
  creatUserAllergene,
  userProfile,
  getAllUsersRecipes,
} from "../controllers/users.js";
import firebaseAuthMiddleware from "../firebaseAuthMiddleware.js";

const router = Router();
router.post("/", firebaseAuthMiddleware, creatUserProfile);
router.post("/userallergene", firebaseAuthMiddleware, creatUserAllergene);
router.post("/profile", userProfile);
router.post("/recipe", getAllUsersRecipes);

export default router;
