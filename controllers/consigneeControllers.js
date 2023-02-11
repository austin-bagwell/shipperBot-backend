import { User } from "../models/User.js";
import { SECRET } from "../env/jwtSecret.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

export { consignees_get, consignees_post };
