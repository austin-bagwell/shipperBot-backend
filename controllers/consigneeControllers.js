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
  if (consignees.length < 1) {
    res.send(`You don't have any consignees saved yet`);
  } else {
    res.json(consignees);
  }
};

/**
 *
 * @param {name: String} req = name of the consignee you want to return
 * @param {<Consignee> = {}} res { name, transitTime } (not using TS, so it isn't *actually* a type)
 */
// this works, but is pretty damn ugly
const consignees_get_one = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;

  const name = req.params.consigneeName;
  const user = await User.findOne({
    _id: userId,
  }).exec();

  const consignees = user.consignees;

  const filtered = consignees.filter((consig) => consig.name === name);
  console.log(filtered);
  res.json(filtered);
};

// TODO rename this - currently this pushes one new consignee to the user's consignee array
const consignees_add_one = async (req, res) => {
  const { name, transitTime } = req.body;
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;
  const addConsigneeToUser = await User.updateOne(
    {
      _id: userId,
    },
    { $push: { consignees: { name, transitTime } } }
  );

  res.send(`consignees_add_one request... worked? ${addConsigneeToUser}`);
};

// TODO
// only updates transitTime
const consignees_update_one = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;
  // const consigName = req.query.name;
  // const transitTime = req.query.transitTime;
  const consigName = "kroger";
  const updatedName = "kroger";
  const transitTime = "333";

  const query = { _id: userId, "consignees.name": consigName };

  const updateOneConsignee = {
    $set: {
      "consignees.$.name": updatedName,
      "consignees.$.transitTime": transitTime,
    },
  };

  const result = await User.updateOne(query, updateOneConsignee).exec();
  res.json(result);
};

const consignees_delete_all = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;

  const user = { _id: userId };
  const removeAllConsignees = {
    $set: { consignees: [] },
  };

  const result = await User.updateOne(user, removeAllConsignees).exec();
  res.json(result);
};

/*
pulled from the mongoDB tutorial, can adapt here?

// Update the post with a new comment
router.patch("/comment/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $push: { comments: req.body },
  };

  let collection = await db.collection("posts");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("posts");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});
*/
export {
  consignees_get_one,
  consignees_get_all,
  consignees_add_one,
  consignees_update_one,
  consignees_delete_all,
};
