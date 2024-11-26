import db from "../util/db-connect.js";
import admin from "firebase-admin";
/**
 * @api POST /users
 * {uid, gender, date_of_birth, weight, height, activity_level }
 *
 */
export async function creatUserProfile(req, res) {
  console.log(req.body);

  const { uid, gender, date_of_birth, weight, height, activity_level } =
    req.body;

  try {
    const users = await db("recipe_user").where({ uid: uid });
    if (users.length !== 0) {
      return res.status(400).json({ msg: "User exists", users });
    } else {
      const newUser = await db("recipe_user").insert({
        uid,
        gender,
        date_of_birth,
        weight,
        height,
        activity_level,
      });

      res
        .status(200)
        .json({ message: "User profile created successfully", newUser });
    }
  } catch (error) {
    console.error("Error fetching userprofile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
/**
 * @api POST /userallergene
 * {uid, category_id, diet_type_id, ingredient_id, allergene_id }
 *
 */
export async function creatUserAllergene(req, res) {
  const { uid, category_id, diet_type_id, ingredient_id, allergene_id } =
    req.body;
  console.log("Request data:", req.body);

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;

    if (Array.isArray(allergene_id) && allergene_id.length > 0) {
      const allergene = allergene_id.map((item) => ({
        allergene_id: item || 0,
        user_id,
      }));
      await db("recipe_user_allergene")
        .insert(allergene)
        .onConflict(["user_id", "allergene_id"])
        .ignore();
    }

    if (Array.isArray(ingredient_id) && ingredient_id.length > 0) {
      const ingredients = ingredient_id.map((item) => ({
        ingredient_id: item || 0,
        user_id,
      }));
      await db("recipe_user_ingredient_allergene")
        .insert(ingredients)
        .onConflict(["user_id", "ingredient_id"])
        .ignore();
    }

    if (Array.isArray(diet_type_id) && diet_type_id.length > 0) {
      const diet_type_rows = diet_type_id.map((item) => ({
        user_id,
        diet_type_id: item || 0,
      }));
      await db("recipe_user_diet_type")
        .insert(diet_type_rows)
        .onConflict(["user_id", "diet_type_id"]) // doppelte Einträge mit gleigem Wert ist erkannt
        .ignore(); // Ignoriert doppelte Einträge
    }

    if (category_id) {
      await db("recipe_user_categories")
        .insert({
          user_id,
          category_id,
        })
        .onConflict(["user_id", "category_id"])
        .ignore();
    }

    res.status(200).json({
      message: "User allergene data created successfully",
    });
  } catch (error) {
    console.error("Error fetching UserAllergen:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
