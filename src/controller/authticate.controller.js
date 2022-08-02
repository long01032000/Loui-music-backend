const userSchema = require("../model/user.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

require('dotenv').config()
async function Registers(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedToken = await bcrypt.hash(process.env.SENDGRID_API_KEY, salt);
    const user = {
      email: req.body.email,
      password: hashedPassword,
      userName: req?.body?.userName,
      verifyToken: hashedToken,
      verifyEmail: true,
      contractAdd:  req.body.contractAdd,
      idAdmin: true
    };
    const newUser = userSchema(user);
    
    await newUser.save();
    return res.status(201).json(true);
  } catch(err) {
    console.log(err);
    return res.status(500).json({message:"eoor"})
  } 
}

async function verifyEmail(req, res) {
  try{
    const user = await userSchema.findOne({email: req.query.email});
    if(!user){
      return res.status(401).json({message:'invalid token'})
    }
    user.verifyEmail = true
    await user.save()
    return res.redirect('http://localhost:3000/register')
  }catch{
    return res.status(401).json({message:'error'})
  }
}

module.exports = {
  Registers,
  verifyEmail
};
