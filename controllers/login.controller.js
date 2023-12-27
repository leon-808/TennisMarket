import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const env = dotenv.config().parsed;
import { getHashedPassword } from "../models/login.model.js";

export const loginPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../view/login.html"));
  } catch (err) {
    res.status(500).send();
  }
};

export const proceedLogin = async (req, res) => {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const hashedPassword = await getHashedPassword(id);
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    if (isPasswordCorrect) {
      const token = jwt.sign({ id: id }, env.SECRET_KEY, { expiresIn: "10m", issuer: "이호성" });
      res.cookie("jwt", token, { path: "/", domain: "localhost", secure: false });
      res.send();
    }
    res.status(403).send("로그인 실패");
  } catch (err) {
    res.status(500).send();
  }
};
