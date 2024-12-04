import db from "../util/db-connect.js";
export const getAllergen = async (req, res) => {
  try {
    // const allergense = await db("recipe_allergies").select();
    const allergense = await db("recipe_allergene").select();

    if (!allergense || allergense.length === 0) {
      return res.status(404).json({ message: "No allergense found" });
    }
    res.status(200).json(allergense);
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @api Update allergene/updateallergene
 * {uid,diet_type_id,updateFields}
 *
 */
export async function updateUserAllergene(req, res) {
  const { updateFields } = req.body;
  const uid = req.user.uid;

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = user.id;
    const deletedRows = await db("recipe_user_allergene")
      .where({ user_id })
      .del();

    const newAllergeneData = updateFields.map((allergene_id) => ({
      user_id,
      allergene_id,
    }));

    const updatedData = await db("recipe_user_allergene")
      .insert(newAllergeneData)
      .returning("*");

    res
      .status(200)
      .json({ message: "Allergene updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error updating Allergene:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
}
