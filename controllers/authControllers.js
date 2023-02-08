import { User } from "../models/User";
import jwt from "jsonwebtoken";

const SECRET = "my special secret code";
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  jwt.sign({ id }, SECRET, {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  res.send("signup get request");
};

const login_get = (req, res) => {
  res.send("login get request");
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  // technically can't delete jwt cookie but
  // can replace w/ blank cookie w/ short expiry date
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/");
};

export { signup_get, signup_post, login_get, login_post, logout_get };
