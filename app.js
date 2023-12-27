import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

const env = dotenv.config().parsed;
const app = express();
const port = env.APP_PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:8888",
  })
);
app.options("*", cors());

import mainRoutes from "./routes/main.route.js";
import orderListRoutes from "./routes/orderList.route.js";
import loginRoutes from "./routes/login.route.js";
import signupRoutes from "./routes/signup.route.js";

app.use("/", mainRoutes);
app.use("/orderlist", orderListRoutes);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);

app.listen(port);

export default app;
