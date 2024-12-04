import { Router } from "express";
import { getCategory, updateUserCategory } from "../controllers/categories.js";
import firebaseRequireAuth from "../firebaseRequireAuth.js";
import firebaseGetAuth from "../firebaseGetAuth.js";
const router = Router();
// router.get("/", firebaseAuthMiddleware, getCategory);
router.get("/", getCategory);
router.post("/updatecategories", firebaseGetAuth, updateUserCategory);

export default router;
