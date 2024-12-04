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

/**
 * @api Update diets/updatediets
 * {uid,updateFields}
 *
 */
export async function updateUserDiet(req, res) {
  const { updateFields } = req.body;
  const uid = req.user.uid;
  console.log("req.body", uid, req.body);

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = user.id;

    const deletedRows = await db("recipe_user_diet_type")
      .where({ user_id })
      .del();

    const newDietData = updateFields.map((item) => ({
      user_id,
      diet_type_id: item,
    }));

    const updatedData = await db("recipe_user_diet_type")
      .insert(newDietData)
      .returning("*");

    res
      .status(200)
      .json({ message: "Diet updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error updating Diet:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
}
