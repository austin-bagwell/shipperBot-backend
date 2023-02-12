import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js";
import { consigneeRoutes } from "./routes/consigneeRoutes.js";
import { USER, DBPASSWORD } from "./env/db.js";
import { checkUser, requireAuth } from "./middleware/authMiddleware.js";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

const dbURI = `mongodb+srv://${USER}:${DBPASSWORD}@cluster0.cdcnuye.mongodb.net/shipperBot`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// added to surpress deprecation warning idk what it does
mongoose.set("strictQuery", true);

app.get("/", (req, res) => {
  res.send("how do I link this to a React app? TBD");
});
app.get("*", checkUser);
app.use(authRoutes);
app.use(consigneeRoutes);
