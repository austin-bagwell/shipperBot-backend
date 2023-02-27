import { User } from "../models/User.js";
import { SECRET } from "../env/jwtSecret.js";
import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// TODO
// add routes to CRUD one or multiple consignees, select individual consignees,
// basically, figure out what all options will be available for consignees
// extract all mongoDB queries into discrete functions?
// how to get userId in a better way, more DRY way?

// return all consignees belonging to a user
const consignees_get_all = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;

  const user = await User.findOne({
    _id: userId,
  }).exec();

  const consignees = user.consignees;
  res.send(`consignee_get logged in user consignees: ${consignees}`);
};

// 5pm 2/26 working on getting this functional in some capacity
// spend ~60 min on it
// as written, URL /consignees/<name of consignee> give me access to <name of consignee>
// TODO
// refactor using URL query params? /consignees/?name=<name>
// that feels much more extensible than what I currently have

// this works, but is pretty damn ugly
const consignees_get_one = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;

  const name = req.params.name;
  console.log(`request parameters name: `, name);
  const user = await User.findOne({
    _id: userId,
  }).exec();

  const consignees = user.consignees;

  const filtered = consignees.filter((consig) => consig.name === name);
  console.log(filtered);
  res.json(filtered);
};

// TODO rename this - currently this pushes one new consignee to the user's consignee array
const consignees_post = async (req, res) => {
  const { name, transitTime } = req.body;
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;
  const addConsigneeToUser = await User.updateOne(
    {
      _id: userId,
    },
    { $push: { consignees: { name, transitTime } } }
  );

  res.send(`consignees_post request... worked? ${addConsigneeToUser}`);
};

export { consignees_get_one, consignees_get_all, consignees_post };
