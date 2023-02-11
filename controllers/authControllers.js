import { User } from "../models/User.js";
import { SECRET } from "../env/jwtSecret.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const maxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // handles login error
  // incorrect username
  if (err.message === "Incorrect username") {
    errors.username = "this username is not registered";
  }
  // handles login error
  // incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "password is incorrect";
  }

  if (err.code === 11000) {
    // duplicate username
    errors.username = "username is already taken";
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
      // console.log(errors);
    });
  }

  return errors;
};

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
  // technically can't delete jwt cookie but
  // can replace w/ blank cookie w/ short expiry date
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/");
};

const consignees_get = async (req, res) => {
  const testUser = await User.findOne({
    _id: `63e65171a1d971a24ac51cff`,
  }).exec();

  console.log(testUser);
  res.send(`consignee_get testUser: ${testUser}`);
};

// this works!!!!!!!!
// FIXME
// need way to check user on all HTTP requests (think this middleware is in the node-auth project already)
// should 100% extract the query logic out of this route and call it as a function
const consignees_post = async (req, res) => {
  const { name, transitTime } = req.body;
  const addConsigneeToUser = await User.updateOne(
    {
      _id: `63e65171a1d971a24ac51cff`,
    },
    { $push: { consignees: { name, transitTime } } }
  );

  console.log(addConsigneeToUser);
  res.send(`consignees_post request... worked? ${addConsigneeToUser}`);
};

export {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
  consignees_get,
  consignees_post,
};
