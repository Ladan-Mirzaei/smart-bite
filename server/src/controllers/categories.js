import db from "../util/db-connect.js";
import admin from "firebase-admin";

export async function getCategory(req, res) {
  try {
    const category = await db("recipe_categories").select();
    if (!category || category.length === 0) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api Update categories/updatecategory
 * {uid,updateFields}
 *
 */
export async function updateUserCategory(req, res) {
  const { updateFields } = req.body;
  const uid = req.user.uid;

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = user.id;
    const deletedRows = await db("recipe_user_categories")
      .where({ user_id })
      .del();

    const newCategoryData = updateFields.map((item) => ({
      user_id,
      category_id: item,
    }));

    const updatedData = await db("recipe_user_categories")
      .insert(newCategoryData)
      .returning("*");

    res
      .status(200)
      .json({ message: "category updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
