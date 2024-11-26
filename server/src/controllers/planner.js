import db from "../util/db-connect.js";
/**
 * @api POST /planner
 * {uid,recipe_id, recipe_title,date,link}
 *
 */
export async function creatEvents(req, res) {
  const { uid, recipe_id, recipe_title, date, link } = req.body;
  console.log("body", req.body);

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    console.log("user", user);

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
 * @api GET /planner
 * All Planner
 *
 */
export async function getEvents(req, res) {
  try {
    const events = await db("recipe_planner").select();
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No Events found" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching Events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
