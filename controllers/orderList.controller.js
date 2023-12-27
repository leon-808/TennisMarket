import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { getOrderLists } from "../models/orderlist.model.js";

export const orderListPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../view/orderlist.html"));
  } catch (err) {
    res.status(500).sendFile(path.join(__dirname, "../view/500.html"));
  }
};

export const loadOrderList = async (req, res) => {
  try {
    const orderLists = await getOrderLists();
    res.json(orderLists);
  } catch (err) {
    res.status(500).sendFile(path.join(__dirname, "../view/500.html"));
  }
};
