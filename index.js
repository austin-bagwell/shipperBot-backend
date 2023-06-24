import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import * as dotenv from "dotenv";
dotenv.config();
const USER = process.env.DBUSER;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT || 3000;

import { authRoutes } from "./routes/authRoutes.js";
import { consigneeRoutes } from "./routes/consigneeRoutes.js";
import { checkUser } from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const dbURI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.cdcnuye.mongodb.net/shipperBot`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));

// // added to surpress deprecation warning idk what it does
// mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("how do I link this to a React app? TBD");
});

app.get("*", checkUser);
app.use(authRoutes);
app.use(consigneeRoutes);
