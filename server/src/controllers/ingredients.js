import db from "../util/db-connect.js";
import admin from "firebase-admin";
/**
 * @api POST /ingredients
 * {recipe_id, ingredient_id, quantity, unit }
 *
 */
export async function creatIngredient(req, res) {
  const { recipe_id, ingredient_id, quantity, unit } = req.body;
  try {
    const newiIngredient = await db("recipe_ingredient_details").insert({
      recipe_id,
      ingredient_id,
      quantity,
      unit,
    });
    res
      .status(200)
      .json({ message: "Ingredient created successfully", newiIngredient });
  } catch (error) {
    console.error("Error fetching create new Ingredient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//GEt ALL
export async function getIngredient(req, res) {
  try {
    const ingredients = await db("recipe_ingredient").select();
    if (!ingredients || ingredients.length === 0) {
      return res.status(404).json({ message: "No allergens found" });
    }
    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching Ingredient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
