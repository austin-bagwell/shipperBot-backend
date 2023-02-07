import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Consignee from "./Consignee";

const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  consignees: [{ id: String, name: String, transitTime: String }],

  // TODO CRUD ops for consignees as static methods on this class/model
  //   User.addConsignee({
  //     this.consignees.push({details of a new consignee})
  // })
  //
});

const User = mongoose.model("User", userSchema);
