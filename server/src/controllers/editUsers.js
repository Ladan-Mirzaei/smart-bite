import db from "../util/db-connect.js";
import admin from "firebase-admin";

export async function editDiet(req, res) {
  const { uid, current_diet_type_id, diet_type_id } = req.body;

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;

    // const currentDiet = await db("recipe_user_diet_type")
    //   .select("diet_type_id")
    //   .where({ user_id, diet_type_id: current_diet_type_id })
    //   .first();

    // if (!currentDiet) {
    //   return res
    //     .status(404)
    //     .json({ message: "Current diet type not found for user." });
    // }

    if (current_diet_type_id === diet_type_id) {
      return res.status(400).json({
        message: "Diet type is already set to the desired value",
      });
    }

    const existingDietType = await db("recipe_user_diet_type")
      .where({ user_id, diet_type_id })
      .first();

    if (existingDietType) {
      return res.status(400).json({
        message: `User already has this diet type (${diet_type_id})`,
      });
    }

    // Update
    const updateDiet = await db("recipe_user_diet_type")
      .where({ user_id, diet_type_id: current_diet_type_id })
      .update({ diet_type_id });

    if (updateDiet === 0) {
      return res.status(400).json({
        message: "No rows updated. Please check the current diet type or user.",
      });
    }

    return res.status(200).json({
      message: "Diet type updated successfully",
    });
  } catch (error) {
    console.error("Error fetching Type of Diet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
