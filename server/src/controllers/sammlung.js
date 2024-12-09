import db from "../util/db-connect.js";
import admin from "firebase-admin";
/**
 * @api POST /users/sammlung
 *{uid ,id}
 */

export async function userRecipeSammlung(req, res) {
  const { id, uid } = req.body;
  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;

    const recipe = await db("recipe").select("id").where({ id }).first();
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const existingEntry = await db("recipe_user_sammlung")
      .select("recipe_id")
      .where({ recipe_id: id, user_id: user_id })
      .first();

    if (existingEntry) {
      return res
        .status(200)
        .json({ message: "Recipe already exists in the collection" });
    }

    const sammlungRecipe = await db("recipe_user_sammlung").insert({
      recipe_id: id,
      user_id: user_id,
    });
    return res.status(200).json(sammlungRecipe);
  } catch (error) {
    console.error("Error fetching Recipes: 6", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api POST /users/sammlungrecipe
 *{uid ,id}
 */

export async function recipeSammlung(req, res) {
  const { id, uid } = req.body;
  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;
    const sammlungRecipe = await db("recipe_user_sammlung")
      .select("recipe_id", "user_id")
      .where({ recipe_id: id, user_id: user_id })
      .first();
    return res.status(200).json(sammlungRecipe);
  } catch (error) {
    console.error("Error fetching Recipes:7", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api POST /users/allsammlung
 *{uid }
 */

export async function allSammlung(req, res) {
  const { diet_type_id, ingredient_id } = req.body;
  const uid = req.user.uid;

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = user.id;
    const recipes = await db("recipe")
      .select(
        "recipe.id AS id",
        "recipe.title AS title",
        "recipe.cooking_time AS cooking_time",
        "recipe.difficulty_level AS difficulty_level",
        db.raw("ARRAY_AGG(DISTINCT recipe_ingredient.name) AS ingredients"),
        "recipe_categories.name AS category_name",
        db.raw("ARRAY_AGG(DISTINCT recipe_diet_type.name) AS diet_types"),
        "recipe.image AS image"
      )
      .leftJoin(
        "recipe_user_sammlung",
        "recipe.id",
        "recipe_user_sammlung.recipe_id"
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
      .leftJoin(
        "recipe_ingredient_details",
        "recipe.id",
        "recipe_ingredient_details.recipe_id"
      )
      .leftJoin(
        "recipe_ingredient",
        "recipe_ingredient.id",
        "recipe_ingredient_details.ingredient_id"
      )
      .groupBy(
        "recipe.id",
        "recipe.title",
        "recipe.cooking_time",
        "recipe.difficulty_level",
        "recipe.image",
        "recipe_categories.name"
      )
      .where((builder) => {
        if (diet_type_id && diet_type_id.length > 0) {
          builder.whereIn("recipe_diet.diet_type_id", diet_type_id);
        }
        if (ingredient_id && ingredient_id.length > 0) {
          builder.whereIn(
            "recipe_ingredient_details.ingredient_id",
            ingredient_id
          );
        }
        // if(user_id){
        builder.where("recipe_user_sammlung.user_id", user_id);
        // }‚
      });
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:8", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
