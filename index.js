import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

// TODO might be different with es6 instead of commonJS?
// const { connect } = mongoose;
// const dbURI = `mongodb+srv://${USER}:${DBPASSWORD}@cluster0.cdcnuye.mongodb.net/node-auth`;
// mongoose
//   .connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("how do I link this to a React app? TBD");
});

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
