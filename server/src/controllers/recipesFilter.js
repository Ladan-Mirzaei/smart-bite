import db from "../util/db-connect.js";

// SELECT
// JSON_AGG(
//   JSON_BUILD_OBJECT('name', name, 'quantity', quantity, 'unit', unit)
// ) AS ingredients
// FROM ingredients;
// Ergebnis:

// json
// Code kopieren
// [
// { "name": "Tomato", "quantity": 2, "unit": "kg" },
// { "name": "Cucumber", "quantity": 1, "unit": "piece" }
// ]
// ARRAY_AGG	PostgreSQL-Array ["value1",...]	Einfacher, effizienter, aber keine Schlüssel-Wert-Struktur.
// JSON_AGG	JSON-Array [{}, ...]	Strukturierter (Schlüssel-Wert-Paare möglich).
/**
 * @api POST /users/sammlungrecipe
 *{uid ,id}
 @api POSTallrecipe und filter
 */
export async function recipeFilter(req, res) {
  const {
    diet_type_id: diet_type_ids = [],
    ingredient_id: ingredient_ids = [],
    allergene_id: allergene_ids = [],
    category_id,
    difficulty_level,
  } = req.body;
  try {
    let user_id;
    if (req.user) {
      const uid = req.user.uid;

      const user = await db("recipe_user").select("id").where({ uid }).first();

      user_id = user.id;
    }

    let recipesPromise;
    const validDietTypeIds = diet_type_ids.filter((id) => id !== "");
    const validIngredientIds = ingredient_ids.filter((id) => id !== "");
    const validAllergenIds = allergene_ids.filter((id) => id !== "");

    recipesPromise = db("recipe")
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
      );

    if (user_id) {
      recipesPromise.leftJoin(
        "recipe_user_sammlung",
        "recipe.id",
        "recipe_user_sammlung.recipe_id"
      );
    }

    recipesPromise
      .groupBy(
        "recipe.id",
        "recipe.title",
        "recipe.cooking_time",
        "recipe.difficulty_level",
        "recipe_categories.name",
        "recipe.image"
      )
      .where((builder) => {
        if (validDietTypeIds.length > 0) {
          builder.whereIn("recipe_diet.diet_type_id", diet_type_ids);
        }

        if (validIngredientIds.length > 0) {
          builder.whereIn(
            "recipe_ingredient_details.ingredient_id",
            ingredient_ids
          );
        }
        if (validAllergenIds.length > 0) {
          builder
            .whereNotIn("recipe_ingredient.allergene_id", allergene_ids)
            .orWhereNull("recipe_ingredient.allergene_id");
        }
        if (category_id) {
          builder.where("recipe.category_id", category_id);
        }
        if (difficulty_level) {
          builder.where("recipe.difficulty_level", difficulty_level);
        }
        if (user_id) {
          builder.where("recipe_user_sammlung.user_id", user_id);
        }
      });

    let result = await recipesPromise;

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
