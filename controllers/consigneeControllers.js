import { User } from "../models/User.js";
import { SECRET } from "../env/jwtSecret.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// TODO
// add routes to CRUD one or multiple consignees, select individual consignees,
// basically, figure out what all options will be available for consignees
// extract all mongoDB queries into discrete functions?
// how to get userId in a better way, more DRY way?

// FIXME
// this is currently only return the full User document
// Need it to return the consignees that belong to that user
const consignees_get = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;

  const user = await User.findOne({
    _id: userId,
  }).exec();

  res.send(`consignee_get logged in user: ${user}`);
};

// TODO rename this - currently this pushes one new consignee to the user's consignee array
const consignees_post = async (req, res) => {
  const { name, transitTime } = req.body;
  const userId = parseJwt(req.cookies.jwt).id;
  const addConsigneeToUser = await User.updateOne(
    {
      _id: userId,
    },
    { $push: { consignees: { name, transitTime } } }
  );

  res.send(`consignees_post request... worked? ${addConsigneeToUser}`);
};

export { consignees_get, consignees_post };
