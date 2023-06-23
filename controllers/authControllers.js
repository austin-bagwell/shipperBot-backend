import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  if (err.message === "Incorrect username") {
    errors.username = "this username is not registered";
  }
  if (err.message === "Incorrect password") {
    errors.password = "password is incorrect";
  }

  if (err.code === 11000) {
    errors.username = "username is already taken";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
      // console.log(errors);
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, SECRET, {
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
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/");
};

export { signup_get, signup_post, login_get, login_post, logout_get };
