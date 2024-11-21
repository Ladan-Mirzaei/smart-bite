import db from "../util/db-connect.js";
import admin from "firebase-admin";
/**
 * @api POST /diets
 * {recipe_id, diet_type_id }
 *
 */
export async function creatDiet(req, res) {
  const { recipe_id, diet_type_id } = req.body;

  try {
    const newDiet = await db("recipe_diet").insert({
      recipe_id,
      diet_type_id,
    });
    res.status(200).json({ message: "Diet created successfully", newDiet });
  } catch (error) {
    console.error("Error fetching Diet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
