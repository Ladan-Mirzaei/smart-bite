import db from "../util/db-connect.js";
/**
 * @api POST /planner für Month /komplate kalender
 * {uid,recipe_id, recipe_title,date,link}
 *
 */
export async function creatEvents(req, res) {
  const { uid, recipe_id, recipe_title, date, link } = req.body;

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;

    const newEvent = await db("recipe_planner").insert({
      user_id,
      recipe_id,
      recipe_title,
      date: date,
      link,
    });
    res.status(200).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    console.error("Error fetching Event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api POST /planner/events
 * All Planner für Week
 *{uid}
 */
export async function getEvents(req, res) {
  const { uid } = req.body;

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;

    const events = await db("recipe_planner")
      .where("recipe_planner.user_id", user_id)
      .select(
        db.raw(
          "JSON_BUILD_OBJECT(" +
            "'ingredient_names', ARRAY_AGG(DISTINCT recipe_ingredient.name), " +
            "'ingredient_units', ARRAY_AGG(DISTINCT recipe_ingredient_details.unit), " +
            "'ingredient_quantities', ARRAY_AGG(DISTINCT recipe_ingredient_details.quantity) " +
            ") AS ingredients"
        ),
        "recipe_planner.planner_id as event_id",
        "recipe.title as event_name",
        "recipe_planner.date",
        "recipe_planner.recipe_id AS recipe_id"
      )
      .leftJoin(
        "recipe_ingredient_details",
        "recipe_planner.recipe_id",
        "recipe_ingredient_details.recipe_id"
      )
      .leftJoin(
        "recipe_ingredient",
        "recipe_ingredient.id",
        "recipe_ingredient_details.ingredient_id"
      )
      .leftJoin("recipe", "recipe.id", "recipe_planner.recipe_id")
      .groupBy("recipe_planner.planner_id", "recipe.title");

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No Events found" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching Events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
