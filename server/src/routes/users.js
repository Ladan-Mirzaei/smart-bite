import { Router } from "express";
import {
  creatUserProfile,
  creatUserAllergene,
  userProfile,
  getAllUsersRecipes,
} from "../controllers/users.js";
import {
  userRecipeSammlung,
  recipeSammlung,
  allSammlung,
} from "../controllers/sammlung.js";
import { editDiet } from "../controllers/editUsers.js";
import firebaseRequireAuth from "../firebaseRequireAuth.js";
import firebaseGetAuth from "../firebaseGetAuth.js";

const router = Router();
router.post("/", firebaseRequireAuth, creatUserProfile);
router.post("/userallergene", firebaseRequireAuth, creatUserAllergene);
router.post("/profile", firebaseRequireAuth, userProfile);
router.post("/recipe", getAllUsersRecipes);
router.post("/sammlung", userRecipeSammlung);
router.post("/sammlungrecipe", recipeSammlung);
router.post("/allSammlung", firebaseGetAuth, allSammlung);
// router.post("/allSammlung", firebaseRequireAuth, allSammlung);

router.post("/edit-diet", editDiet);

export default router;
