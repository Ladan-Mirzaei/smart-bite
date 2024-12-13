import db from "../util/db-connect.js";
import admin from "firebase-admin";
/**
 * @api POST /users/profile
 * {uid, gender, date_of_birth, weight, height, activity_level }
 *
 */
export async function userProfile(req, res) {
  // return res.json({});
  const { uid } = req.body;

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;
    const userData = await db("recipe_user")
      .select(
        "recipe_user.id",
        "recipe_user.uid",
        "recipe_user.date_of_birth",
        "recipe_user.gender",
        "recipe_user.weight",
        "recipe_user.height",
        "recipe_user.activity_level",
        "recipe_categories.name as category_name",
        db.raw("JSON_AGG(DISTINCT recipe_allergene.name) AS allergene_name"),
        //Duplikate löchen
        //   {"activity_level": "mittel",
        //     "allergene_name" "Meeresfrüchte",}
        //     {"activity_level": "mittel",
        //     "allergene_name" "Nachtschattengewächse"}
        // -----------------mit db.raw("JSON_AGG(DISTINCT ----------------------
        //    {"activity_level": "mittel",
        //   "allergene_name": [
        //       "Meeresfrüchte",
        //       "Nachtschattengewächse"
        //   ]}
        db.raw("JSON_AGG(DISTINCT recipe_diet_type.name) AS diet_type_name")
      )
      .leftJoin(
        "recipe_user_categories",
        "recipe_user_categories.user_id",
        "recipe_user.id"
      )
      .leftJoin(
        "recipe_categories",
        "recipe_categories.id",
        "recipe_user_categories.category_id"
      )
      .leftJoin(
        "recipe_user_allergene",
        "recipe_user_allergene.user_id",
        "recipe_user.id"
      )
      .leftJoin(
        "recipe_allergene",
        "recipe_user_allergene.allergene_id",
        "recipe_allergene.id"
      )

      .leftJoin(
        "recipe_user_diet_type",
        "recipe_user_diet_type.user_id",
        "recipe_user.id"
      )
      .leftJoin(
        "recipe_diet_type",
        "recipe_user_diet_type.diet_type_id",
        "recipe_diet_type.id"
      )
      .where("recipe_user.id", user_id)
      .groupBy(
        "recipe_user.id",
        "recipe_user.uid",
        "recipe_user.date_of_birth",
        "recipe_user.gender",
        "recipe_user.weight",
        "recipe_user.height",
        "recipe_user.activity_level",
        "recipe_categories.name"
      );

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching userprofile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
/**
 * @api POST /users
 * {uid, gender, date_of_birth, weight, height, activity_level }
 *
 */
export async function creatUserProfile(req, res) {
  const { gender, date_of_birth, weight, height, activity_level } = req.body;
  const uid = req.user.uid;

  try {
    const users = await db("recipe_user").where({ uid: uid });
    if (users.length !== 0) {
      return res.status(400).json({ msg: "User exists", users });
    } else {
      const newUser = await db("recipe_user").insert({
        uid,
        gender: gender || null,
        date_of_birth: date_of_birth || null,
        weight: weight || null,
        height: height || null,
        activity_level: activity_level || null,
      });

      //  custom user claims
      await admin.auth().setCustomUserClaims(uid, { signUpCompleted: true });

      res.status(200).json({
        message: "User profile created successfully",
        newUser,
      });
    }
  } catch (error) {
    console.error("Error fetching userprofile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
/**
 * @api POST /users/userallergene
 * {uid, category_id, diet_type_id, ingredient_id, allergene_id }
 *
 */
export async function creatUserAllergene(req, res) {
  const { category_id, diet_type_id, ingredient_id, allergene_id } = req.body;
  const uid = req.user.uid;
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

/**
 * @api POST /users/userrecipes
 *{uid}
 */
export async function getAllUsersRecipes(req, res) {
  const { uid } = req.body;
  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;
    const recipes = await db("recipe")
      .select(
        "recipe.id AS id",
        "recipe.user_id AS user_id",
        "recipe.title AS title",
        "recipe.cooking_time AS cooking_time",
        "recipe.difficulty_level AS difficulty_level",
        "recipe_categories.name AS category_name",
        db.raw("ARRAY_AGG(DISTINCT recipe_diet_type.name) AS diet_types"),
        "recipe.image AS image"
      )
      .leftJoin("recipe_diet", "recipe.id", "recipe_diet.recipe_id")
      .leftJoin(
        "recipe_diet_type",
        "recipe_diet.diet_type_id",
        "recipe_diet_type.id"
      )
      .leftJoin(
        "recipe_categories",
        "recipe.category_id",
        "recipe_categories.id"
      )
      .leftJoin("recipe_user", "recipe.user_id", "recipe_user.id")
      .where("recipe.user_id", user_id)
      .groupBy(
        "recipe.id",
        "recipe.user_id",
        "recipe.title",
        "recipe.cooking_time",
        "recipe.difficulty_level",
        "recipe.image",
        "recipe_categories.name"
      )
      .limit(6);

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching All Recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
