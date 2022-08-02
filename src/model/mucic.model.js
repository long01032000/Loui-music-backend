const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Music = new Schema({
    album: {type: String},
    artist: {type: String},
    music: {type: String},
    typeMusic: {type: String},
    imgSrc: {type: String},
    isLike: {type: Boolean, default:true},
    musicName: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    
});

module.exports = mongoose.model("Music", Music);
