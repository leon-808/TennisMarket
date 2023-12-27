import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bcrypt from "bcrypt";
import { addUser } from "../models/signup.model.js";

export const signupPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../view/signup.html"));
  } catch (err) {
    res.status(500).sendFile(path.join(__dirname, "../view/500.html"));
  }
};

export const submitSignup = async (req, res, next) => {
  try {
    const { id, password, name, birth, tel, email, address } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await addUser(id, hashedPassword, name, birth, tel, email, address);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};
