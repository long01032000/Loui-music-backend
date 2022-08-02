const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Astist = new Schema({
  image: { type: String },
  name: {type: String},
  isLike: {type: Boolean},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Astist", Astist);
