import db from "../util/db-connect.js";
export const getAllergen = async (req, res) => {
  try {
    // const allergense = await db("recipe_allergies").select();
    const allergense = await db("recipe_allergene").select();

    if (!allergense || allergense.length === 0) {
      return res.status(404).json({ message: "No allergense found" });
    }
    res.status(200).json(allergense);
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
