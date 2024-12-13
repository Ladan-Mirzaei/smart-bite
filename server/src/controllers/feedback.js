import db from "../util/db-connect.js";
/**
 * @api POST /feedback
 * {recipe_id, rating,comments }
 *
 */

export async function creatFeedback(req, res) {
  const { feedback } = req.body;
  const { recipe_id, rating, comments } = feedback;
  const uid = req.user.uid;

  console.log("uid", recipe_id, rating, req.body);

  try {
    const user = await db("recipe_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;
    const recipeId = Number(feedback.recipe_id);
    const feedbackId = await db("recipe_feedback")
      .insert({
        user_id: user_id,
        recipe_id: recipeId,
        rating: rating,
        comments: comments,
      })
      .returning("id");
    console.log("feedbackId", feedbackId);
    res
      .status(201)
      .json({ message: "Feedback submitted successfully.", feedbackId });
  } catch (error) {
    console.error("Error fetching create new Feedbacks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api POST /feedback/recipe_feedback
 * {recipe_id }
 *
 */

export async function getRecipeFeedback(req, res) {
  const { recipe_id } = req.body;

  try {
    console.debug("getRecipeFeedback -> recipe_id", recipe_id);
    const recipeId = Number(recipe_id);
    const SumRating = await db("recipe_feedback")
      //  .select("recipe_id", db.raw("ROUND(SUM(rating)) AS recipe_rating"))
      .select("recipe_id")
      .sum("rating as total_rating")
      .where("recipe_id", recipeId)
      .groupBy("recipe_id")
      .first();
    const CountRecipeID = await db("recipe_feedback")
      .count("* AS total_count")
      .where("recipe_id", recipeId)
      .first();

    if (!SumRating || !CountRecipeID || CountRecipeID.total_count === "0") {
      return res
        .status(404)
        .json({ message: "No feedback found for this recipe." });
    }
    console.log("SumRating", SumRating);
    console.log("count rating", CountRecipeID);
    const recipeRating = SumRating.total_rating / CountRecipeID.total_count;
    console.log("count rating", recipeRating.toFixed(2));

    res.status(200).json(recipeRating.toFixed(2));
  } catch (error) {
    console.error("Error fetching Feedback-Rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
