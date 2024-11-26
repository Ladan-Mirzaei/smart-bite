import db from "../util/db-connect.js";
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

/**
 * @api GET /diets
 * All Diets
 *
 */
export async function getDiet(req, res) {
  try {
    const diet = await db("recipe_diet_type").select();
    if (!diet || diet.length === 0) {
      return res.status(404).json({ message: "No Diet found" });
    }
    res.status(200).json(diet);
  } catch (error) {
    console.error("Error fetching Diet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
