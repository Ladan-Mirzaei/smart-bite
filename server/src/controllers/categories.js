import db from "../util/db-connect.js";
import admin from "firebase-admin";

export async function getCategory(req, res) {
  try {
    const category = await db("recipe_categories").select();
    if (!category || category.length === 0) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
