import { User } from "../models/User.js";
import { SECRET } from "../env/jwtSecret.js";
import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// TODO
// rename all these methods... why did I use snake case?
// answer: b/c that is what net ninja did
// anyway use camelCase like a good JS bro
// add delete_one

// return all consignees belonging to a user
const getAll = async (req, res) => {
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

// TODO work on error handling
const consignees_get_one = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;
  const name = req.params.name;

  try {
    const user = await User.findOne({
      _id: userId,
    }).exec();

    const consignees = user.consignees;

    const consignee = consignees.filter((consig) => consig.name === name);
    if (consignee.length > 0) {
      res.json(consignee);
    } else {
      throw new Error(`didn't find that consignee`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

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
// unsure if using the mix of params to find consig and req.body to update is good idea
const consignees_update_one = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, SECRET).id;

  try {
    const consigName = req.params.name;

    const updatedName = req.body.name;
    const transitTime = req.body.transitTime;

    const query = { _id: userId, "consignees.name": consigName };

    const updateOneConsignee = {
      $set: {
        "consignees.$.name": updatedName,
        "consignees.$.transitTime": transitTime,
      },
    };

    const result = await User.updateOne(query, updateOneConsignee).exec();
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
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
  getAll,
  consignees_add_one,
  consignees_update_one,
  consignees_delete_all,
};
