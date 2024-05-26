import express, { Request, Response } from "express";
import connectDB from "./utils/mongoose";
import bodyParser from "body-parser";
import moivesRouter from "./routes/moives";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import { authenticationMiddleware } from "./middlewares/authMiddleware";
import "dotenv/config";

var cors = require("cors");
const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/movies", authenticationMiddleware, moivesRouter);
app.use("/users", authenticationMiddleware, usersRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: Function) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
