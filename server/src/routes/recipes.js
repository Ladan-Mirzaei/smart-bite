import { Router } from "express";
import {
  createRecipe,
  getRandomRecipes,
  recipeDetails,
  updateRecipe,
} from "../controllers/recipes.js";
import { recipeFilter } from "../controllers/recipesFilter.js";
import firebaseRequireAuth from "../firebaseRequireAuth.js";
import firebaseGetAuth from "../firebaseGetAuth.js";

const router = Router();
router.post("/", firebaseRequireAuth, createRecipe);
router.put("/:id", updateRecipe);
router.get("/random", getRandomRecipes);
// router.get("/", getAllRecipes);
router.get("/:recipeId", recipeDetails);
router.post("/recipeFilter", firebaseGetAuth, recipeFilter);
export default router;
