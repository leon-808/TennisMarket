import express from "express";
const router = express.Router();
import { orderListPage, loadOrderList } from "../controllers/orderList.controller.js";

router.get("/", orderListPage);
router.get("/all", loadOrderList);

export default router;
