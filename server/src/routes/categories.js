import { Router } from "express";
import { getCategory } from "../controllers/categories.js";
// import firebaseAuthMiddleware from "../firebaseAuthMiddleware.js";

const router = Router();
// router.get("/", firebaseAuthMiddleware, getCategory);
router.get("/", getCategory);

// router.get("/", filterProducts);
// router.get("/materials", getAvailableMaterials);
// router.get("/:productId", productDetails);

export default router;
