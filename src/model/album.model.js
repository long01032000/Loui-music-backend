const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Album = new Schema({
  name: {type: String},
  image: {type: String},
  isLike: {type: Boolean},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Album", Album);
