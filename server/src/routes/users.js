import { Router } from "express";
import {
  creatUserProfile,
  creatUserAllergene,
  userProfile,
  getAllUsersRecipes,
  userRecipeSammlung,
  recipeSammlung,
} from "../controllers/users.js";
import { editDiet } from "../controllers/editUsers.js";
import firebaseAuthMiddleware from "../firebaseAuthMiddleware.js";

const router = Router();
router.post("/", firebaseAuthMiddleware, creatUserProfile);
router.post("/userallergene", firebaseAuthMiddleware, creatUserAllergene);
router.post("/profile", userProfile);
router.post("/recipe", getAllUsersRecipes);
router.post("/sammlung", userRecipeSammlung);
router.post("/sammlungrecipe", recipeSammlung);
router.post("/edit-diet", editDiet);

export default router;
