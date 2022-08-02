const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema({
  roomName: {type: String},
  email: { type: String },
  name: {type: String},
  avatar: {type: String},
  message: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", Message);
