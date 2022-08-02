const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String },
  password: { type: String },
  avatar: { type: String },
  verifyToken: { type: String },
  verifyEmail: { type: Boolean },
  isAdmin: { type: Boolean },
  userName: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: { type: String },
  phoneNumber: { type: String },
  isAdmin: { type: Boolean },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("User", User);
