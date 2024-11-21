import { Router } from "express";
import {
  createRecipe,
  getRandomRecipes,
  getAllRecipes,
  productDetails,
} from "../controllers/recipes.js";
// import firebaseAuthMiddleware from "../firebaseAuthMiddleware.js";

const router = Router();
router.post("/", createRecipe);
router.get("/random", getRandomRecipes);
router.get("/", getAllRecipes);
router.get("/:recipeId", productDetails);

// router.post("/", firebaseAuthMiddleware, createRecipe);
export default router;
