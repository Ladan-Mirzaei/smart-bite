import { Router } from "express";
import { getCategory, updateUserCategory } from "../controllers/categories.js";
// import firebaseAuthMiddleware from "../firebaseAuthMiddleware.js";

const router = Router();
// router.get("/", firebaseAuthMiddleware, getCategory);
router.get("/", getCategory);
router.post("/updatecategory", updateUserCategory);

export default router;
