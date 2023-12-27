import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).send("인증 정보가 없습니다.");

    const token = authHeader.split(" ")[1];
    jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).send("유효하지 않은 토큰입니다.");
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    res.status(500).send();
  }
};
