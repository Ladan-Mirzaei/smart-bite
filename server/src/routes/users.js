import { Router } from "express";
import { creatUserProfile } from "../controllers/users.js";

const router = Router();
router.post("/", creatUserProfile);
// router.post("/", creatUserrecepieAllergene);

export default router;
