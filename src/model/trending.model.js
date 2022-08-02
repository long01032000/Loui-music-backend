const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Trending = new Schema({
  music: {type: String},
  album: { type: String },
  artist: {type: String},
  rate: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trending", Trending);
