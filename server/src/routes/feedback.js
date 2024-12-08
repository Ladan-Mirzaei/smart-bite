import { Router } from "express";
import { creatFeedback, getRecipeFeedback } from "../controllers/feedback.js";
import firebaseRequireAuth from "../firebaseRequireAuth.js";
import firebaseGetAuth from "../firebaseGetAuth.js";

const router = Router();
router.post("/", firebaseRequireAuth, creatFeedback);
router.post("/recipe_feedback", getRecipeFeedback);

export default router;
