import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/test", (req, res) => {
  res.send("test response");
});

app.listen(PORT, () => {
  console.log(`app is listeing on port ${PORT}`);
});
