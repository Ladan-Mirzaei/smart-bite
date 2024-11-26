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
    uid,
    ingredients,
    diet_types,
    category_id,
    title,
    description,
    preparation_time,
    cooking_time,
    portions,
    difficulty_level,
    instructions,
  } = req.body;
  console.log("uid:", uid);
  console.log("req req.body:", req.body);

  try {
    const recipeId = await db("recipe")
      .insert({
        uid: uid,
        title: title,
        description: description,
        preparation_time: preparation_time,
        cooking_time: cooking_time,
        portions: portions,
        difficulty_level: difficulty_level,
        instructions: instructions,
        category_id: category_id || null,
        created_at: new Date(),
      })
      .returning("id");
    const finalRecipeId = recipeId[0].id;

    console.log(" ID2:", finalRecipeId);
    const ingredientsData = ingredients.map((item) => ({
      recipe_id: finalRecipeId, //z.B. `3` hier
      ingredient_id: item.ingredient_id,
      quantity: item.quantity || 0,
      unit: item.unit || "",
    }));
    console.log({ ingredients });
    console.log(recipeId);
    await db("recipe_ingredient_details").insert(ingredientsData);

    const dietData = diet_types.map((diet) => ({
      recipe_id: finalRecipeId,
      diet_type_id: diet,
    }));

    await db("recipe_diet").insert(dietData);
    // [
    //   { recipe_id: 3, diet_type: "Vegan" },
    //   { recipe_id: 3, diet_type: "Low Carb" }
    // ]
    res.status(200).json({
      message: "Recipe created successfully",
      recipeId,
    });
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
        "recepie_diet_type.name AS diet_type"
      )

      .leftJoin(
        "recipe_categories",
        "recipe.category_id",
        "recipe_categories.id"
      )
      .leftJoin("recipe_diet", "recipe.id", "recipe_diet.recipe_id")
      .leftJoin(
        "recepie_diet_type",
        "recipe_diet.diet_type_id",
        "recepie_diet_type.id"
      )
      .orderByRaw("RANDOM()")
      .limit(1);

    console.log("getRandomRecipe", getRandomRecipe);
    const veganRecipe = await getRandomRecipe
      .clone()
      .where("recepie_diet_type.name", "vegan")
      .first();
    const ketoRecipe = await getRandomRecipe
      .clone()
      .where("recepie_diet_type.name", "keto")
      .first();
    const vegetarischRecipe = await getRandomRecipe
      .clone()
      .where("recepie_diet_type.name", "vegetarisch")
      .first();
    const glutenfreiRecipe = await getRandomRecipe
      .clone()
      .where("recepie_diet_type.name", "glutenfrei")
      .first();
    console.log(veganRecipe);
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
    console.error("Error fetching userprofile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api GET /recipes
 */
export async function getAllRecipes(req, res) {
  try {
    const recipes = await db("recipe")
      .select(
        "recipe.title AS title",
        "recipe.cooking_time AS cooking_time",
        "recipe.difficulty_level AS difficulty_level",
        "recipe_categories.name AS category_name",
        "recepie_diet_type.name AS diet_type",
        "recipe.img AS image"
      )
      .leftJoin("recipe_diet", "recipe.id", "recipe_diet.recipe_id")
      .leftJoin(
        "recepie_diet_type",
        "recipe_diet.diet_type_id",
        "recepie_diet_type.id"
      )
      .leftJoin(
        "recipe_categories",
        "recipe.category_id",
        "recipe_categories.id"
      );
    if (!recipes) {
      return res.status(404).json({ message: "No recipes found" });
    }

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching Recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api GET /recipes/:recipeId
 */
export async function productDetails(req, res) {
  const { recipeId } = req.params;
  try {
    const recipe = await db("recipe")
      .select(
        "recipe.id As id",
        "recipe.title AS title",
        "recipe.cooking_time AS cooking_time",
        "recipe.difficulty_level AS difficulty_level",
        "recipe.description AS description",
        "recipe.preparation_time AS preparation_time",
        "recipe.portions AS portions",
        "recipe.instructions AS instructions",
        "recipe.created_at AS created_at",
        "recipe_ingredient_details.quantity AS quantity",
        "recipe_ingredient_details.unit AS unit",
        "recipe_categories.name AS category_name",
        "recepie_diet_type.name AS diet_type",
        "recipe_ingredient.calories AS calories",
        "recipe_ingredient.protein AS protein",
        "recipe_ingredient.carbohydrates AS carbohydrates",
        "recipe_ingredient.fats AS fats",
        "recipe_ingredient.allergen_category AS allergen_category"
      )
      .leftJoin("recipe_diet", "recipe.id", "recipe_diet.recipe_id")
      .leftJoin(
        "recepie_diet_type",
        "recipe_diet.diet_type_id",
        "recepie_diet_type.id"
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
      .where("recipe.id", recipeId)
      .first();
    if (!recipe) {
      return res.status(404).json({ message: "No recipes found" });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching Recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
