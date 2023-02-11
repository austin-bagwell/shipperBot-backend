import { User } from "../models/User.js";
import { checkUser } from "../middleware/authMiddleware.js";
import { SECRET } from "../env/jwtSecret.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// FIXME
// need way to access user on all HTTP requests to consignee routes
// checkUser middleware is being applied in consigneeRoutes
// but I need access to that userID on all of these requests
// do I send that on the req,
// or is there a way to access that via app.locals.user somehow?

const consignees_get = async (req, res) => {
  const testUser = await User.findOne({
    _id: `63e65171a1d971a24ac51cff`,
  }).exec();

  res.send(`consignee_get testUser: ${testUser}`);
};
// TODO
// should 100% extract the query logic out of this route and call it as a function
const consignees_post = async (req, res) => {
  const { name, transitTime } = req.body;
  const addConsigneeToUser = await User.updateOne(
    {
      _id: `63e65171a1d971a24ac51cff`,
    },
    { $push: { consignees: { name, transitTime } } }
  );

  res.send(`consignees_post request... worked? ${addConsigneeToUser}`);
};

export { consignees_get, consignees_post };
