import express from "express";
const router = express.Router();
import { signupValidation } from "../middleware/signupValidation.middleware.js";
import { signupPage, submitSignup } from "../controllers/signup.controller.js";

router.get("/", signupPage);
router.post("/", signupValidation, submitSignup);

export default router;
