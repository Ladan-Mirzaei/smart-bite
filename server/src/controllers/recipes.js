import db from "../util/db-connect.js";
import admin from "firebase-admin";
/**
 * @api POST /recipes
 * {uid,
    title,
    description,
    preparation_time,
    cooking_time,
    portions,
    difficulty_level,
    instructions,
    category_id,
    createdAt: new Date()
 }
 *
 */

export async function createRecipe(req, res) {
  const {
    ingredients,
    diet_types,
    category_id,
    title,
    description,
    preparation_time,
    cooking_time,
    portions,
    difficulty_level,
    image_url,
  } = req.body;
  const uid = req.user.uid;
  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;
    const recipeId = await db("recipe")
      .insert({
        user_id: user_id,
        title: title,
        description: description,
        preparation_time: preparation_time,
        cooking_time: cooking_time,
        portions: portions,
        difficulty_level: difficulty_level,
        category_id: category_id || null,
        created_at: new Date(),
        image: image_url,
      })
      .returning("id");
    const finalRecipeId = recipeId[0].id;
    const ingredientsData = ingredients.map((item) => ({
      recipe_id: finalRecipeId, //z.B. `3` hier
      ingredient_id: item.ingredient_id,
      quantity: item.quantity || 0,
      unit: item.unit || "",
    }));
    console.log({ ingredients });
    await db("recipe_ingredient_details").insert(ingredientsData);

    const dietData = diet_types.map((diet) => ({
      recipe_id: finalRecipeId,
      diet_type_id: diet,
    }));
    console.log("ddddd", finalRecipeId);

    await db("recipe_diet").insert(dietData);
    console.log(finalRecipeId);

    // [
    //   { recipe_id: 3, diet_type: "Vegan" },
    //   { recipe_id: 3, diet_type: "Low Carb" }
    // ]
    res.status(200).json(finalRecipeId);
  } catch (error) {
    console.error("Error fetching userprofile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api GET /recipes/random
 *{
  "vegan": {
    "recipe_title": "Vegan Salad",
    "category_name": "Ita..",
    "diet_type": "1. .."
  },
  "keto": {
    "recipe_title": "Keto Avocado Egg Salad",
    "category_name": "..",
    "diet_type": "Keto"
  }
}
 */
/** a = { foo: { bar: 'baz' } };  // initial value of a
b = clone(a);                 // clone a -> b
a.foo.bar = 'foo';            // change a          
a:{ foo: { bar: 'foo' } }
b:{ foo: { bar: 'baz' } }
*/

export async function getRandomRecipes(req, res) {
  try {
    const getRandomRecipe = db("recipe")
      .select(
        "recipe.title AS recipe_title",
        "recipe_categories.name AS category_name",
        "recipe_diet_type.name AS diet_type"
      )
      .leftJoin(
        "recipe_categories",
        "recipe.category_id",
        "recipe_categories.id"
      )
      .leftJoin("recipe_diet", "recipe.id", "recipe_diet.recipe_id")
      .leftJoin(
        "recipe_diet_type",
        "recipe_diet.diet_type_id",
        "recipe_diet_type.id"
      )
      .orderByRaw("RANDOM()")
      .limit(1);
    console.log("getRandomRecipe", getRandomRecipe);
    const veganRecipe = await getRandomRecipe
      .clone()
      .where("recipe_diet_type.name", "Vegan")
      .first();
    const ketoRecipe = await getRandomRecipe
      .clone()
      .where("recipe_diet_type.name", "keto")
      .first();
    const vegetarischRecipe = await getRandomRecipe
      .clone()
      .where("recipe_diet_type.name", "Vegetarisch")
      .first();
    const glutenfreiRecipe = await getRandomRecipe
      .clone()
      .where("recipe_diet_type.name", "Glutenfrei")
      .first();
    console.log("Vegan Recipe:", veganRecipe);
    console.log("Keto Recipe:", ketoRecipe);
    console.log("Vegetarisch Recipe:", vegetarischRecipe);
    console.log("Glutenfrei Recipe:", glutenfreiRecipe);
    const randomRecipes = {
      vegan: veganRecipe || null,
      keto: ketoRecipe || null,
      vegetarisch: vegetarischRecipe || null,
      glutenfrei: glutenfreiRecipe || null,
    };

    if (
      !randomRecipes.vegan &&
      !randomRecipes.keto &&
      !randomRecipes.vegetarisch &&
      !randomRecipes.glutenfrei
    ) {
      return res.status(404).json({ message: "No recipes found" });
    }

    return res.status(200).json(randomRecipes);
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// /**
//  * @api GET /recipes
//  */
// export async function getAllRecipes(req, res) {
//   try {
//     const recipes = await db("recipe")
//       .select(
//         "recipe.id AS id",
//         "recipe.user_id AS user_id",
//         "recipe.title AS title",
//         "recipe.cooking_time AS cooking_time",
//         "recipe.difficulty_level AS difficulty_level",
//         "recipe_categories.name AS category_name",
//         db.raw("ARRAY_AGG(DISTINCT recipe_diet_type.name) AS diet_types"),
//         "recipe.image AS image"
//       )
//       .leftJoin("recipe_diet", "recipe.id", "recipe_diet.recipe_id")
//       .leftJoin(
//         "recipe_diet_type",
//         "recipe_diet.diet_type_id",
//         "recipe_diet_type.id"
//       )
//       .leftJoin(
//         "recipe_categories",
//         "recipe.category_id",
//         "recipe_categories.id"
//       )
//       .groupBy(
//         "recipe.id",
//         "recipe.user_id",
//         "recipe.title",
//         "recipe.cooking_time",
//         "recipe.difficulty_level",
//         "recipe.image",
//         "recipe_categories.name"
//       );
//     if (!recipes) {
//       return res.status(404).json({ message: "No recipes found" });
//     }

//     return res.status(200).json(recipes);
//   } catch (error) {
//     console.error("Error fetching Recipes:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

/**
 * @api GET /recipes/:recipeId
 * SELECT JSON_BUILD_OBJECT('name', 'Tomato', 'quantity', 2, 'unit', 'kg') AS ingredient;
Ergebnis:
{
  "name": "Tomato",
  "quantity": 2,
  "unit": "kg"
}
  --------------------
  SELECT 
  JSON_AGG(
    JSON_BUILD_OBJECT('name', name, 'quantity', quantity, 'unit', unit)
  ) AS ingredients
FROM ingredients;
Ergebnis:

json
Code kopieren
[
  { "name": "Tomato", "quantity": 2, "unit": "kg" },
  { "name": "Cucumber", "quantity": 1, "unit": "piece" }
]
  ARRAY_AGG	PostgreSQL-Array ["value1",...]	Einfacher, effizienter, aber keine Schlüssel-Wert-Struktur.
JSON_AGG	JSON-Array [{}, ...]	Strukturierter (Schlüssel-Wert-Paare möglich).
 */
export async function recipeDetails(req, res) {
  const { recipeId } = req.params;
  console.log("test", recipeId);
  try {
    const ingredients = await db("recipe_ingredient_details")
      .select(
        db.raw(`
      JSON_AGG(
         JSON_BUILD_OBJECT(
          'name', recipe_ingredient.name,
          'quantity', recipe_ingredient_details.quantity,
          'unit', recipe_ingredient_details.unit,
          'calories', recipe_ingredient.calories,
          'protein', recipe_ingredient.protein,
          'carbohydrates', recipe_ingredient.carbohydrates,
          'fats', recipe_ingredient.fats,
          'allergen_name', recipe_allergene.name

        )
      ) AS ingredient_details
    `)
      )
      .leftJoin(
        "recipe_ingredient",
        "recipe_ingredient.id",
        "recipe_ingredient_details.ingredient_id"
      )
      .leftJoin(
        "recipe_allergene",
        "recipe_ingredient.allergene_id",
        "recipe_allergene.id"
      )
      .where("recipe_ingredient_details.recipe_id", recipeId)
      .first();
    console.log("test", ingredients);

    const recipeDetails = await db("recipe")
      .select(
        "recipe.id AS id",
        "recipe.user_id AS user_id",
        "recipe.title AS title",
        "recipe.cooking_time AS cooking_time",
        "recipe.difficulty_level AS difficulty_level",
        "recipe.description AS description",
        "recipe.preparation_time AS preparation_time",
        "recipe.image AS image",
        "recipe.portions AS portions",
        "recipe.created_at AS created_at",
        "recipe_categories.name AS category_name",
        db.raw("ARRAY_AGG(DISTINCT recipe_diet_type.name) AS diet_types")
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
      .where("recipe.id", recipeId)
      .groupBy(
        "recipe.id",
        "recipe.user_id",
        "recipe.title",
        "recipe.cooking_time",
        "recipe.difficulty_level",
        "recipe.description",
        "recipe.preparation_time",
        "recipe.image",
        "recipe.portions",
        "recipe.created_at",
        "recipe_categories.name"
      )
      .first();

    if (!recipeDetails) {
      return res.status(404).json({ message: "No recipes found" });
    }

    const combinedResult = {
      ...recipeDetails,
      ingredient_details: ingredients.ingredient_details, //// Zutaten aus ingredients ....AS  ingredient_details
    };
    console.log("test", combinedResult);

    return res.status(200).json(combinedResult);
  } catch (error) {
    console.error("Error fetching Recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
