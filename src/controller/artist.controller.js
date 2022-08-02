const ArtistSchema = require("../model/artist.model");
const userSchema = require("./../model/user.model");
const likeArtistSchema = require('./../model/likeArtist.model')
async function CreateArtist(req, res) {
  try {
    const artist = {
      image: req.body.image,
      name: req.body.name,
      isLike: false
    };
    const at = await ArtistSchema(artist).save();
    return res.status(200).json(at);
  } catch (error) {}
}
async function getAllArtist(req, res) {
  try {
    const ar = await ArtistSchema.find();
    return res.status(200).json(ar);
  } catch (error) {}
}
async function likeArtis(req,res){
  try {
    let music = await ArtistSchema.findOne({
      _id: req.params._id,
    });
    let user = await userSchema.findOne({
      email: req.user.email,
    });

    let likeMS = await likeArtistSchema.findOne({
      email: req.user.email,
    });

    if (likeMS) {
      const data = likeMS.listLike.filter((e) => e._id == req.params._id);
      if (data[0]) {
        const newData = likeMS.listLike.filter((e) => e._id != req.params._id);
        likeMS.listLike = newData;
        music.isLike = false;
        await likeArtistSchema(likeMS).save();
        await musicSchema(music).save();

        return res.status(200).json(false);
      }
      likeMS.listLike.push(music);
      music.isLike = true;

      await likeArtistSchema(likeMS).save();
      await ArtistSchema(music).save();
      return res.status(200).json(true);
    }
    const newLikeMS = {
      email: user.email,
      listLike: music,
    };
    music.isLike = true;

    await likeArtistSchema(newLikeMS).save();
    await ArtistSchema(music).save();

    return res.status(200).json(true);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "can not find music" });
  }
}
async function getAllLikeArtist(req,res){
  try {
    let likeMS = await likeArtistSchema.findOne({
      email: req.user.email,
    });
    return res.status(200).json(likeMS)
    
  } catch (error) {
    
  }
}
module.exports = {
  CreateArtist,
  getAllArtist,
  likeArtis,
  getAllLikeArtist
};
