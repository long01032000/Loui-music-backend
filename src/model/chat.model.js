const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatRoom = new Schema({
  roomName: {type: String},
  email: { type: String },
  userName: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  messageChat: {type: Array}
});

module.exports = mongoose.model("ChatRoom", ChatRoom);
