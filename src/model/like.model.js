const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const like = new Schema({
  email: { type: String },
  listLike: []
  
});

module.exports = mongoose.model("like", like);
