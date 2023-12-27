import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { mainPage, loadMainPage, addOrder, displayLogin } from "../controllers/main.controller.js";

router.get("/", mainPage);
router.get("/main/products", loadMainPage);
router.post("/main/order", addOrder);
router.post("/main/login", verifyToken, displayLogin);

export default router;
