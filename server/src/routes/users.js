import { Router } from "express";
import { creatUserProfile, creatUserAllergene } from "../controllers/users.js";
import firebaseAuthMiddleware from "../firebaseAuthMiddleware.js";

const router = Router();
router.post("/", firebaseAuthMiddleware, creatUserProfile);
router.post("/userallergene", firebaseAuthMiddleware, creatUserAllergene);

export default router;
