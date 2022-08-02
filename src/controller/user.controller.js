const userSchema = require("../model/user.model");

async function updateUser(req, res) {
  try {
      let user = await userSchema
      .findOne({
        email: req.user.email,
      })
      .exec();
      if(req.body.name){
        user.name = req.body.name;
      }
      if(req.body.phoneNumber){
        user.phoneNumber = req.body.phoneNumber
      }
      if(req.body.address){
        user.address = req.body.address
      }
      await userSchema(user).save()
      return res.status(200).json(true)
  } catch (error) {
    return res.status(400).json({
      message: error
    })
  }
}

async function getUser(req,res){
  try {
    let user = await userSchema
    .findOne({
      email: req.user.email,
    })
    .exec();
    return res.status(200).json(user)
} catch (error) {
  return res.status(400).json({
    message: error
  })
}
}

async function deleteUser(req,res){
  try {
    const user = await userSchema
      .findOne({
        email: req.user.email,
      })

      if(user){
        await userSchema.deleteOne({
          _id: user._id
        })
        return res.status(200).json(true)
      }

      return res.status(400).json(false)
  } catch (error) {
    return res.status(400).json({message: 'Error in delete user'})
  }
}

async function getAllUser(req,res){
  try {
    const users = await userSchema.find().exec();
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({message: "Error when get users"})
  }
}


module.exports ={
  updateUser,
  deleteUser
  ,getUser,
  getAllUser
}