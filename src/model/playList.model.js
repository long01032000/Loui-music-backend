const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayList = new Schema({
  email: { type: String },
  playList: { type: Array },
  name: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PlayList", PlayList);
