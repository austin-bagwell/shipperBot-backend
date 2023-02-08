import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  consignees: [{ id: String, name: String, transitTime: String }],
});

// TODO CRUD ops for consignees as static methods on this class/model
//   User.addConsignee({
//     this.consignees.push({details of a new consignee})
// })
//

// mongoose hooks

// will use the pre hook to hash new users password before saving it to the db
// fire function before a doc saved to db
userSchema.pre("save", async function (next) {
  console.log(`user about to be created and saved`, this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// fire a function after a new user has been saved to database
userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

// static method to login the user
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    // compare password
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }

  throw Error("Incorrect username");
};

const User = mongoose.model("User", userSchema);

export { User };
