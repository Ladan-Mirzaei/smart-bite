import { Router } from "express";
import {
  createRecipe,
  getRandomRecipes,
  recipeDetails,
} from "../controllers/recipes.js";
import { recipeFilter } from "../controllers/recipesFilter.js";
import firebaseRequireAuth from "../firebaseRequireAuth.js";
import firebaseGetAuth from "../firebaseGetAuth.js";

const router = Router();
router.post("/", firebaseRequireAuth, createRecipe);
router.get("/random", getRandomRecipes);
// router.get("/", getAllRecipes);
router.get("/:recipeId", recipeDetails);
router.post("/recipeFilter", firebaseRequireAuth, recipeFilter);

// router.post("/", firebaseAuthMiddleware, createRecipe);
export default router;

// {
//   "title": "Spaghetti Bolognese",
//   "description": "A classic Italian pasta dish with rich tomato sauce.",
//   "preparation_time": 15,
//   "cooking_time": 30,
//   "portions": 4,
//   "difficulty_level": "einfach",
//   "instructions": "1. Heat the oil. 2. Cook the meat. 3. Add the sauce.",
// "image":"test",
//   "category_id": 2,
//   "ingredients": [
//     { "ingredient_id": 1, "quantity": 200, "unit": "g" },
//     { "ingredient_id": 2, "quantity": 1, "unit": "kg" }
//   ],
//   "diet_types": ["1", "2"]
// }
