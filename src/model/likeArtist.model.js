const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeArtist = new Schema({
  email: { type: String },
  listLike: []
  
});

module.exports = mongoose.model("likeArtist", likeArtist);
