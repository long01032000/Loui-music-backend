const playListSchema = require("../model/playList.model");
const userSchema = require("../model/user.model");
const musicSchema = require("./../model/mucic.model");
async function createPlayList(req, res) {
  try {
    let user = await userSchema.findOne({
      email: req.user.email,
    });

    const neewPlayList = {
      name: req.body.name,
      email: req.user.email,
      playList: [],
    };
    const newData = await playListSchema(neewPlayList).save();
    return res.status(200).json(newData);
  } catch (error) {}
}
async function addToPlayList(req,res){
    try {
        const music = await musicSchema.findOne({
            _id: req.params._id
        })
        let playList  = await playListSchema.findOne({
            _id: req.params._idPlay
        })

        const listPlay = playList.playList.filter(e => e._id == req.params._id )
        if(listPlay[0]){
            return res.status(201).json({
                message: 'music is already in play list'
            })
        }
        playList.playList.push(music)
 
        await playListSchema(playList).save();
        return res.status(200).json(true)

    } catch (error) {
        
    }
}
async function getPlayPlist (req,res){
    try {
        const res1 = await playListSchema.find({
            email: req.user.email,
        })
        return res.status(200).json(res1)
    } catch (error) {
        
    }
}
async function getPlayList(req, res){
  try {
    const res1  = await playListSchema.findOne({
      _id: req.params._id
    })
    return res.status(200).json(res1)
  } catch (con) {
    
  }
}

async function DeletePlaylist(req, res) {
  const id = req?.params?.id
  try {
    const allMusic = await playListSchema
      .findByIdAndRemove(
        id
      )
      .exec();
    return res.status(200).json(allMusic);
  } catch (error) {
    return res.status(400).json({
      message: "Error when delete all the music",
    });
  }
}

module.exports = {
  createPlayList,
  addToPlayList,
  getPlayPlist,
  getPlayList,
  DeletePlaylist
};
