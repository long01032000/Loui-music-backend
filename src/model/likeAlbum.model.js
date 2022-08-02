const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeAlbum = new Schema({
  email: { type: String },
  listLike: []
  
});

module.exports = mongoose.model("likeAlbum", likeAlbum);
