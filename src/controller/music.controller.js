const musicSchema = require("./../model/mucic.model");
const likeMusicSchema = require("./../model/like.model");
const userSchema = require("./../model/user.model");
async function CreateMusic(req, res) {
  try {
    const newMusic = {
      album: req?.body?.album,
      artist: req?.body?.artist,
      music: req?.body?.music,
      typeMusic: req?.body?.typeMusic,
      musicName: req?.body?.musicName,
      imgSrc: req?.body?.imgSrc,
      isLike: false
    };
    console.log(newMusic)
    const data = await musicSchema(newMusic).save();
    return res?.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res?.status(200).json({ message: error });
  }
}
async function GetAllMusic(req, res) {
  try {
    const allMusic = await musicSchema.find().exec();
    return res.status(200).json(allMusic);
  } catch (error) {
    return res.status(400).json({
      message: "Eror when get all the music",
    });
  }
}
async function DeleteMucic(req, res) {
  try {
    const allMusic = await musicSchema
      .deleteOne({
        _id: req?.params?._id,
      })
      .exec();
    return res.status(200).json(allMusic);
  } catch (error) {
    return res.status(400).json({
      message: "Eror when delete all the music",
    });
  }
}

async function searchMuic(req, res) {
  try {
    const user = await userSchema.findOne({
      email: req.user.email,
    });
    const music = await musicSchema.find({
      musicName: { $regex: req.body.searchs },
    });
    return res.status(200).json(music);
  } catch (error) {}
}
async function getMusic(req, res) {
  try {
    const music = await musicSchema.find({
      _id: req.params._id,
    });

    return res.status(200).json(music);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "can not find music" });
  }
}
async function likeMusic(req, res) {
  try {
    let music = await musicSchema.findOne({
      _id: req.params._id,
    });
    let user = await userSchema.findOne({
      email: req.user.email,
    });

    let likeMS = await likeMusicSchema.findOne({
      email: req.user.email,
    });

    if (likeMS) {
      const data = likeMS.listLike.filter((e) => e._id == req.params._id);
      if (data[0]) {
        const newData = likeMS.listLike.filter((e) => e._id != req.params._id);
        likeMS.listLike = newData;
        music.isLike = false;
        await likeMusicSchema(likeMS).save();
        await musicSchema(music).save();

        return res.status(200).json(false);
      }
      likeMS.listLike.push(music);
      music.isLike = true;

      await likeMusicSchema(likeMS).save();
      await musicSchema(music).save();
      return res.status(200).json(true);
    }
    const newLikeMS = {
      email: user.email,
      listLike: music,
    };
    music.isLike = true;

    await likeMusicSchema(newLikeMS).save();
    await musicSchema(music).save();

    return res.status(200).json(true);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "can not find music" });
  }
}

async function getLikeMusic(req, res) {
  try {
    let likeMS = await likeMusicSchema.findOne({
      email: req.user.email,
    });
    return res.status(200).json(likeMS);
  } catch (error) {
    return res.status(200).json({ message: "can not find music" });
  }
}

module.exports = {
  CreateMusic,
  GetAllMusic,
  DeleteMucic,
  searchMuic,
  getMusic,
  likeMusic,
  getLikeMusic,
};
