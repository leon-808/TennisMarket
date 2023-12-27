import express from "express";
const router = express.Router();
import { loginPage, proceedLogin } from "../controllers/login.controller.js";

router.get("/", loginPage);
router.post("/progress", proceedLogin);

export default router;
