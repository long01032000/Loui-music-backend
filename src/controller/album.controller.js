const AlbumSchema = require("../model/album.model");
const ArtistSchema = require("../model/artist.model");
const userSchema = require("./../model/user.model");
const likeAlbumSchema = require('./../model/likeAlbum.model')
async function CreateAlbum(req, res) {
  try {
    const album = {
      name: req.body.name,
      isLike: false,
      image: req.body.image
    };
    await AlbumSchema(album).save();
    return res.status(200).json(true);
  } catch (error) {}
}
async function getAllAlbum(req, res) {
  try {
    const ar = await AlbumSchema.find();
    return res.status(200).json(ar);
  } catch (error) {}
}
async function likeAlbum(req,res){
  try {
    let music = await AlbumSchema.findOne({
      _id: req.params._id,
    });
    let user = await userSchema.findOne({
      email: req.user.email,
    });

    let likeMS = await likeAlbumSchema.findOne({
      email: req.user.email,
    });

    if (likeMS) {
      const data = likeMS.listLike.filter((e) => e._id == req.params._id);
      if (data[0]) {
        const newData = likeMS.listLike.filter((e) => e._id != req.params._id);
        likeMS.listLike = newData;
        music.isLike = false;
        await likeAlbumSchema(likeMS).save();
        await AlbumSchema(music).save();

        return res.status(200).json(false);
      }
      likeMS.listLike.push(music);
      music.isLike = true;

      await likeAlbumSchema(likeMS).save();
      await AlbumSchema(music).save();
      return res.status(200).json(true);
    }
    const newLikeMS = {
      email: user.email,
      listLike: music,
    };
    music.isLike = true;

    await likeAlbumSchema(newLikeMS).save();
    await AlbumSchema(music).save();

    return res.status(200).json(true);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "can not find music" });
  }
}
async function getAllLikeAlbum(req,res){
  try {
    let likeMS = await likeAlbumSchema.findOne({
      email: req.user.email,
    });
    return res.status(200).json(likeMS)
    
  } catch (error) {
    
  }
}
module.exports = {
  CreateAlbum,
  getAllAlbum,
  likeAlbum,
  getAllLikeAlbum
};
