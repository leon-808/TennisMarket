import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { getProducts, addItem } from "../models/main.model.js";

export const mainPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../view/main.html"));
  } catch (err) {
    res.status(500).sendFile(path.join(__dirname, "../view/500.html"));
  }
};

export const loadMainPage = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send();
  }
};

export const addOrder = async (req, res) => {
  const productId = req.body.productId;
  try {
    await addItem(productId);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};

export const displayLogin = (req, res) => {
  try {
    res.status(200).send(req.decoded.id);
  } catch (err) {
    res.status(500).send();
  }
};
