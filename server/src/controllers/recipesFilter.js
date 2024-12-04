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
    diet_type_id,
    ingredient_id,
    allergene_id,
    category_id,
    difficulty_level,
  } = req.body;
  const uid = req.user.uid;

  try {
    console.log("uid", uid);

    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = user.id;
    console.log("req.boynew", req.body);
    let recipes;
    const validDietTypeIds = diet_type_id.filter((id) => id !== "");
    const validIngredientIds = ingredient_id.filter((id) => id !== "");
    const validAllergenIds = allergene_id.filter((id) => id !== "");

    recipes = await db("recipe")
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
        if (validDietTypeIds.length > 0) {
          builder.whereIn("recipe_diet.diet_type_id", diet_type_id);
        }

        if (validIngredientIds.length > 0) {
          builder.whereIn(
            "recipe_ingredient_details.ingredient_id",
            ingredient_id
          );
        }
        if (validAllergenIds.length > 0) {
          builder.whereNotIn("recipe_ingredient.allergene_id", allergene_id);
        }
        if (category_id) {
          builder.where("recipe.category_id", category_id);
        }
        if (difficulty_level) {
          builder.where("recipe.difficulty_level", difficulty_level);
        }
      });

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
